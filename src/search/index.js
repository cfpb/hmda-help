import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Form from './Form'
import Results from './Results'

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

        {/*
          TODO: make this a component
        */}
        {this.state.error ? (
          <div className="alert">
            <h3>Oh no!</h3>
            <p>{this.state.error.message}</p>
            <Link
              to={{
                pathname: '/add',
                state: {
                  institution: {
                    LEI: this.state.LEI,
                    taxId: this.state.taxId,
                    respondent: { name: this.state.respondentName }
                  }
                }
              }}
            >
              Add a new one
            </Link>
          </div>
        ) : null}
      </React.Fragment>
    )
  }
}

export default Search
