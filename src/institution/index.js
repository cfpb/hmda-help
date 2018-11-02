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

    let institution = null
    if (props.location.state && props.location.state.institution) {
      institution = props.location.state.institution
    }

    this.state = {
      isSubmitted:
        (props.location.state && props.location.state.isSubmitted) || false,
      httpError: null,
      showOtherFields: false,
      activityYear: institution ? institution.activityYear : '',
      LEI: institution ? institution.LEI : '',
      agency: institution ? institution.agency : '',
      institutionType: institution ? institution.institutionType : '',
      institutionId2017: institution ? institution.institutionId2017 : '',
      taxId: institution ? institution.taxId : '',
      rssd: institution ? institution.rssd : '',
      emailDomains: institution ? institution.emailDomains : '',
      respondentName: institution ? institution.respondentName : '',
      respondentState: institution ? institution.respondentState : '',
      respondentCity: institution ? institution.respondentCity : '',
      parentIdRssd: institution ? institution.parentIdRssd : '',
      parentName: institution ? institution.parentName : '',
      assets: institution ? institution.assets : '',
      otherLenderCode: institution ? institution.otherLenderCode : '',
      topHolderIdRssd: institution ? institution.topHolderIdRssd : '',
      topHolderName: institution ? institution.topHolderName : ''
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

  handleSubmit(event, pathname, token) {
    event.preventDefault()

    const institution = nestStateForApi(this.state)

    const method = this.props.location.pathname === '/add' ? 'POST' : 'PUT'

    fetch(`/v2/admin/institutions`, {
      method: method,
      body: JSON.stringify(institution),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          console.log(response)
          throw new Error(response.status)
        }
      })
      .then(json => {
        // set the rest of the state here to be the json response
        // just in case something goes wrong
        // we then have the what the back-end has
        this.setState({ isSubmitted: true, ...flattenApiForState(json) })
      })
      .catch(error => {
        console.log('error = ', error.name, error.message)
        this.setState({ httpError: error.message })
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

    if (pathname === '/update' && !state) this.props.history.push('/')

    return this.state.isSubmitted ? (
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
          onSubmit={event =>
            this.handleSubmit(event, pathname, this.props.token)}
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
          {/* TODO: better error message, using an <Alert/>*/}
          {this.state.httpError ? (
            <Alert
              type="error"
              heading="Access Denied"
              text="Sorry, it doesn't look like you have the correct permissions to
                perform this action."
              smallWidth={true}
            />
          ) : null}
        </form>
      </React.Fragment>
    )
  }
}

export default Institution
