import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { nestStateForApi, flattenApiForState } from '../utils/convert'

import OtherFieldsToggleButton from './OtherFieldsToggleButton'
import OtherFields from './OtherFields'
import Success from './Success'
import InputSubmit from '../InputSubmit'
import Alert from '../Alert'

import './Form.css'

class Institution extends Component {
  constructor(props) {
    super(props)

    let institution
    if (props.location.state && props.location.state.institution) {
      institution = props.location.state.institution
    }

    this.state = {
      isSubmitted:
        (props.location.state && props.location.state.isSubmitted) || false,
      showOtherFields: false,
      activityYear: institution.activityYear || '',
      LEI: institution.LEI || '',
      agency: institution.agency || '',
      institutionType: institution.institutionType || '',
      institutionId2017: institution.institutionId2017 || '',
      taxId: institution.taxId || '',
      rssd: institution.rssd || '',
      emailDomains: institution.emailDomains || '',
      respondentName: institution.respondentName || '',
      respondentState: institution.respondentState || '',
      respondentCity: institution.respondentCity || '',
      parentIdRssd: institution.parentIdRssd || '',
      parentName: institution.parentName || '',
      assets: institution.assets || '',
      otherLenderCode: institution.otherLenderCode || '',
      topHolderIdRssd: institution.topHolderIdRssd || '',
      topHolderName: institution.topHolderName || ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.toggleShowOtherFields = this.toggleShowOtherFields.bind(this)
    this.backToUpdate = this.backToUpdate.bind(this)
  }

  backToUpdate(event) {
    event.preventDefault()

    // if at /add we need to link, not just update state
    // we have to go to /update, but keep the state
    // so we use history.push(pathname: pathname, state: {})
    if (this.props.location.pathname === '/add') {
      this.props.history.push({
        pathname: '/update',
        state: { institution: this.state }
      })
    }

    // this works if we're at /update
    this.setState({
      isSubmitted: false
    })
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      isSubmitted: false
    })
  }

  handleSubmit(event, pathname) {
    event.preventDefault()

    const institution = nestStateForApi(this.state)

    const method = this.props.location.pathname === '/add' ? 'POST' : 'PUT'

    fetch(`${process.env.REACT_APP_V2_API}/institutions`, {
      method: method,
      body: JSON.stringify(institution),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => {
        if (response.status > 400) return null
        if (response.status < 300) return response.json()
      })
      .then(json => {
        // set the rest of the state here to be the json response
        // just in case something goes wrong
        // we then have the what the back-end has
        this.setState({ isSubmitted: true, ...flattenApiForState(json) })
      })
  }

  toggleShowOtherFields() {
    this.setState(prevState => ({
      showOtherFields: !prevState.showOtherFields
    }))
  }

  render() {
    const { pathname, state } = this.props.location
    const action = {
      submitted: pathname === '/add' ? 'added' : 'updated',
      type: pathname === '/add' ? 'add' : 'update',
      heading:
        pathname === '/add'
          ? 'Add an institution record'
          : 'Update an institution record',
      warning:
        pathname === '/add'
          ? 'New institutions should be submitted by Tier 2. Please escalate the case to Tier 2 for further support.'
          : 'If any data fields other than Respondent Name or Email Domain need to be updated, please escalate the case to Tier 2 for further support.'
    }

    if (pathname === '/update' && !state) return <h1>NOOOOO!</h1>

    return (
      <React.Fragment>
        {this.state.isSubmitted ? (
          <React.Fragment>
            <Success institution={this.state} action={action.submitted} />
            <p>
              <button
                className="backToUpdate"
                onClick={event => this.backToUpdate(event)}
              >
                Update this institution
              </button>
            </p>
            <p>
              <Link to="/">Search for a new institution</Link>
            </p>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <h3>{action.heading}</h3>
            <Alert
              type="error"
              heading="Are you Tier 2 support?"
              text={action.warning}
              smallWidth={true}
            />
            <form
              className="InstitutionForm"
              onSubmit={event => this.handleSubmit(event, pathname)}
            >
              <label>LEI</label>
              <input
                type="text"
                name="LEI"
                id="LEI"
                value={this.state.LEI}
                onChange={this.handleChange}
                disabled={pathname === '/add' ? false : true}
              />
              <label>Respondent Name</label>
              <input
                type="text"
                name="respondentName"
                id="respondentName"
                value={this.state.respondentName}
                onChange={this.handleChange}
              />
              <label>Email Domains</label>
              <input
                type="text"
                name="emailDomains"
                id="emailDomains"
                value={this.state.emailDomains}
                onChange={this.handleChange}
              />
              <label>Tax Id</label>
              <input
                type="text"
                name="taxId"
                id="taxId"
                value={this.state.taxId}
                onChange={this.handleChange}
              />
              <label>Agency Code</label>
              <input
                type="text"
                name="agency"
                id="agency"
                value={this.state.agency}
                onChange={this.handleChange}
              />

              <OtherFieldsToggleButton
                showOtherFields={this.state.showOtherFields}
                toggleShowOtherFields={this.toggleShowOtherFields}
              />

              {this.state.showOtherFields ? (
                <OtherFields
                  formData={this.state}
                  handleChange={this.handleChange}
                />
              ) : null}

              <InputSubmit actionType={action.type} />
            </form>
          </React.Fragment>
        )}
      </React.Fragment>
    )
  }
}

export default Institution
