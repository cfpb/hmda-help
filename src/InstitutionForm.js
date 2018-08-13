import React, { Component } from 'react'

import InputSubmit from './InputSubmit.js'

class InstitutionForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isSubmitted: false,
      showOtherFields: false,
      institution: {
        activityYear: null,
        lei: '',
        agencyCode: null,
        institutionType: null,
        institutionId2017: '',
        taxId: '',
        RSSD: '',
        emailDomains: [],
        respondentName: '',
        respondentState: '',
        respondentCity: '',
        parentIdRSSD: null,
        parentName: '',
        assets: null,
        otherLenderCode: null,
        topHolderIdRSSD: null,
        topHolderName: ''
      }
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.renderOtherFields = this.renderOtherFields.bind(this)
  }

  componentWillMount() {
    if (this.props.location.state) {
      const { institution } = this.props.location.state

      this.setState({
        institution: {
          activityYear: institution.activityYear,
          lei: institution.lei,
          agencyCode: institution.agencyCode,
          institutionType: institution.institutionType,
          institutionId2017: institution.institutionId2017,
          taxId: institution.taxId,
          RSSD: institution.RSSD,
          emailDomains: institution.emailDomains,
          respondentName: institution.respondentName,
          respondentState: institution.respondentState,
          respondentCity: institution.respondentCity,
          parentIdRSSD: institution.parentIdRSSD,
          parentName: institution.parentName,
          assets: institution.assets,
          otherLenderCode: institution.otherLenderCode,
          topHolderIdRSSD: institution.topHolderIdRSSD,
          topHolderName: institution.topHolderName
        }
      })
    }
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit(event, pathname) {
    event.preventDefault()

    this.setState({ isSubmitted: true })
  }

  renderToggleButton() {
    const buttonText = this.state.showOtherFields ? 'Hide' : 'Show'
    return (
      <button
        type="button"
        onClick={() => {
          this.setState((prevState, props) => ({
            showOtherFields: !prevState.showOtherFields
          }))
        }}
      >
        {buttonText} other fields
      </button>
    )
  }

  renderOtherFields() {
    if (this.state.showOtherFields) {
      return <h4>Other fields</h4>
    }

    return null
  }

  render() {
    const { pathname, state } = this.props.location
    const submittedAction = pathname === '/add' ? 'Addition' : 'Update'
    const actionType = pathname === '/add' ? 'add' : 'update'

    if (pathname === '/update' && !state) return <h1>NOOOOO!</h1>

    return (
      <React.Fragment>
        <form onSubmit={event => this.handleSubmit(event, pathname)}>
          <label>LEI</label>
          <input
            type="text"
            name="lei"
            id="lei"
            value={this.state.institution.lei}
            onChange={this.handleChange}
          />
          <label>Tax Id</label>
          <input
            type="text"
            name="taxId"
            id="taxId"
            value={this.state.institution.taxId}
            onChange={this.handleChange}
          />
          <label>Respondent Name</label>
          <input
            type="text"
            name="respondentName"
            id="respondentName"
            value={this.state.institution.respondentName}
            onChange={this.handleChange}
          />
          <label>Agency Code</label>
          <input
            type="text"
            name="agencyCode"
            id="agencyCode"
            value={this.state.institution.agencyCode.toString()}
            onChange={this.handleChange}
          />
          <label>Email Domains</label>
          <input
            type="text"
            name="emailDomains"
            id="emailDomains"
            value={this.state.institution.emailDomains.toString()}
            onChange={this.handleChange}
          />
          {this.renderToggleButton()}
          {this.renderOtherFields()}
          <InputSubmit actionType={actionType} />
        </form>
        {this.state.isSubmitted ? (
          <h3>
            {submittedAction} Submitted for {this.state.institution.lei}
          </h3>
        ) : null}
      </React.Fragment>
    )
  }
}

export default InstitutionForm
