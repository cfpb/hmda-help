import React, { Component } from 'react'

import { flattenApiForState } from '../utils/convert'

import Form from './Form'
import Results from './Results'
import Alert from './Alert'

import './Form.css'

class Search extends Component {
  constructor(props) {
    super(props)

    this.state = {
      institutions: null,
      error: null,
      LEI: '',
      taxId: '',
      respondentName: ''
    }

    this.deleteAnInstitution = this.deleteAnInstitution.bind(this)
    this.updateInstitutions = this.updateInstitutions.bind(this)
    this.updateError = this.updateError.bind(this)
  }

  deleteAnInstitution(key) {
    let newInstitutions = this.state.institutions.filter(
      (institution, i) => i !== key
    )
    if (newInstitutions.length === 0) newInstitutions = null
    this.setState({ institutions: newInstitutions })
  }

  updateInstitutions(response) {
    this.setState({ institutions: [flattenApiForState(response)], error: null })
  }

  updateError(error, formData) {
    if (formData) {
      this.setState({
        error: error,
        LEI: formData.LEI,
        taxId: formData.taxId,
        respondentName: formData.respondentName,
        institutions: null
      })
    } else {
      this.setState({
        error: error,
        LEI: '',
        taxId: '',
        respondentName: '',
        institutions: null
      })
    }
  }

  render() {
    return (
      <React.Fragment>
        <h3>Search for institution records</h3>
        <Form
          updateInstitutions={this.updateInstitutions}
          updateError={this.updateError}
        />

        <Results
          institutions={this.state.institutions}
          deleteAnInstitution={this.deleteAnInstitution}
        />

        {this.state.error ? (
          <Alert
            LEI={this.state.LEI}
            taxId={this.state.taxId}
            respondentName={this.state.respondentName}
            heading="Oh no!"
            message={this.state.error.message}
          />
        ) : null}
      </React.Fragment>
    )
  }
}

export default Search
