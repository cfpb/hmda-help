import React, { Component } from 'react'

import InputSubmit from '../InputSubmit'

import './Form.css'

class Form extends Component {
  constructor(props) {
    super(props)

    this.state = {
      LEI: '',
      taxId: '',
      respondentName: '',
      emailDomains: '',
      error: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({ error: false, [event.target.name]: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()

    fetch(`http://192.168.99.100:8081/institutions/${this.state.LEI}`)
      .then(response => {
        if (response.status > 400) return null
        if (response.status < 300) return response.json()
      })
      .then(json => {
        if (json) {
          this.props.updateInstitutions(json)
        } else {
          this.props.updateError({ message: 'No results found!' }, this.state)
        }
      })
      .catch(error => {
        this.props.updateError(
          { message: 'The requested resource could not be found.' },
          null
        )
      })
  }

  render() {
    return (
      <form className="SearchForm" onSubmit={event => this.handleSubmit(event)}>
        <label>LEI</label>
        <input
          id="LEI"
          name="LEI"
          onChange={this.handleChange}
          placeholder="e.g., 987875HAG543RFDAHG54"
          type="text"
          value={this.state.LEI}
        />
        <label>Respondent Name</label>
        <input
          id="respondentName"
          name="respondentName"
          onChange={this.handleChange}
          placeholder="e.g., Bank of HMDA"
          type="text"
          value={this.state.respondentName}
        />
        <label>Email Domains</label>
        <input
          id="emailDomains"
          name="emailDomains"
          onChange={this.handleChange}
          placeholder="e.g., institution.com"
          type="text"
          value={this.state.emailDomains}
        />
        <label>Tax Id</label>
        <input
          id="taxId"
          name="taxId"
          onChange={this.handleChange}
          placeholder="e.g., 88-00000000"
          type="text"
          value={this.state.taxId}
        />
        <InputSubmit actionType="search" />
      </form>
    )
  }
}

export default Form
