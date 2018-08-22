import React, { Component } from 'react'

import OtherFieldsToggleButton from './OtherFieldsToggleButton'
import OtherFields from './OtherFields'
import InputSubmit from './InputSubmit'

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
      LEI: institution.LEI || '',
      agency: institution.agency || '',
      institutionType: institution.institutionType || '',
      institutionId2017: institution.institutionId2017 || '',
      taxId: institution.taxId || '',
      rssd: institution.rssd || '',
      emailDomains: institution.emailDomains || '',
      respondentName: institution.respondent.name || '',
      respondentState: institution.respondent.state || '',
      respondentCity: institution.respondent.city || '',
      parentIdRssd: (institution.parent && institution.parent.idRssd) || '',
      parentName: (institution.parent && institution.parent.name) || '',
      assets: institution.assets || '',
      otherLenderCode: institution.otherLenderCode || '',
      topHolderIdRssd:
        (institution.topHolder && institution.topHolder.idRssd) || '',
      topHolderName: (institution.topHolder && institution.topHolder.name) || ''
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

    const institution = {
      activityYear: this.state.activityYear,
      LEI: this.state.LEI,
      agency: this.state.agency,
      institutionType: this.state.institutionType,
      institutionId2017: this.state.institutionId2017,
      taxId: this.state.taxId,
      rssd: this.state.rssd,
      emailDomains: [this.state.emailDomains],
      respondent: {
        name: this.state.respondentName,
        state: this.state.respondentState,
        city: this.state.respondentCity
      },
      parent: {
        idRssd: this.state.parentIdRssd,
        name: this.state.parentName
      },
      assets: this.state.assets,
      otherLenderCode: this.state.otherLenderCode,
      topHolder: {
        idRssd: this.state.topHolderIdRssd,
        name: this.state.topHolderName
      },
      hmdaFiler: true
    }

    fetch('http://192.168.99.100:8081/institutions', {
      method: 'PUT',
      body: JSON.stringify(institution),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => {
        if (response.status === 400) return null
        if (response.status === 200) return response.json()
      })
      .then(json => {
        console.log(json)
      })
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
            name="LEI"
            id="LEI"
            value={this.state.LEI}
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
            name="agency"
            id="agency"
            value={this.state.agency}
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
            {submittedAction} Submitted for {this.state.LEI}
          </h3>
        ) : null}
      </React.Fragment>
    )
  }
}

export default InstitutionForm
