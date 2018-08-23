import React, { Component } from 'react'
import { Link } from 'react-router-dom'

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

    this.updateInstitutions = this.updateInstitutions.bind(this)
    this.updateError = this.updateError.bind(this)
  }

  updateInstitutions(response) {
    this.setState({ institutions: [response], error: null })
  }

  updateError(error, formData) {
    this.setState({
      error: error,
      LEI: formData.LEI,
      taxId: formData.taxId,
      respondentName: formData.respondentName,
      institutions: null
    })
  }

  render() {
    return (
      <React.Fragment>
        <Form
          updateInstitutions={this.updateInstitutions}
          updateError={this.updateError}
        />

        <Results
          institutions={this.state.institutions}
          LEI={this.state.LEI}
          taxId={this.state.taxId}
          respondentName={this.state.respondentName}
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
