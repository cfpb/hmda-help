import React, { Component } from 'react'

import OtherFieldsToggleButton from './OtherFieldsToggleButton'
import OtherFields from './OtherFields'
import InputSubmit from './InputSubmit'

import './InstitutionForm.css'

class InstitutionForm extends Component {
  constructor(props) {
    super(props)

    let institution
    if (props.location.state.institution) {
      institution = props.location.state.institution
    }

    this.state = {
      isSubmitted: false,
      showOtherFields: false,
      activityYear: institution.activityYear || '',
      lei: institution.lei || '',
      agencyCode: institution.agencyCode || '',
      institutionType: institution.institutionType || '',
      institutionId2017: institution.institutionId2017 || '',
      taxId: institution.taxId || '',
      RSSD: institution.RSSD || '',
      emailDomains: institution.emailDomains || '',
      respondentName: institution.respondentName || '',
      respondentState: institution.respondentState || '',
      respondentCity: institution.respondentCity || '',
      parentIdRSSD: institution.parentIdRSSD || '',
      parentName: institution.parentName || '',
      assets: institution.assets || '',
      otherLenderCode: institution.otherLenderCode || '',
      topHolderIdRSSD: institution.topHolderIdRSSD || '',
      topHolderName: institution.topHolderName || ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.toggleShowOtherFields = this.toggleShowOtherFields.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      isSubmitted: false
    })
  }

  handleSubmit(event, pathname) {
    event.preventDefault()

    this.setState({ isSubmitted: true })
  }

  toggleShowOtherFields() {
    this.setState(prevState => ({
      showOtherFields: !prevState.showOtherFields
    }))
  }

  render() {
    const { pathname, state } = this.props.location
    const submittedAction = pathname === '/add' ? 'Addition' : 'Update'
    const actionType = pathname === '/add' ? 'add' : 'update'

    if (pathname === '/update' && !state) return <h1>NOOOOO!</h1>

    return (
      <React.Fragment>
        <form
          className="InstitutionForm"
          onSubmit={event => this.handleSubmit(event, pathname)}
        >
          <label>LEI</label>
          <input
            type="text"
            name="lei"
            id="lei"
            value={this.state.lei}
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
          <label>Respondent Name</label>
          <input
            type="text"
            name="respondentName"
            id="respondentName"
            value={this.state.respondentName}
            onChange={this.handleChange}
          />
          <label>Agency Code</label>
          <input
            type="text"
            name="agencyCode"
            id="agencyCode"
            value={this.state.agencyCode}
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

          <InputSubmit actionType={actionType} />
        </form>

        {this.state.isSubmitted ? (
          <h3>
            {submittedAction} Submitted for {this.state.lei}
          </h3>
        ) : null}
      </React.Fragment>
    )
  }
}

export default InstitutionForm
