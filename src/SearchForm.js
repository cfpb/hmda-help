import React, { Component } from 'react'

import InputSubmit from './InputSubmit'
import SearchResults from './SearchResults'

import './SearchForm.css'

class SearchForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      LEI: '',
      taxId: '',
      respondentName: '',
      institutions: null
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit(searchData) {
    // not found
    /*
    fetch(process.env.PUBLIC_URL + 'none.json')
      .then(response => {
        return response.json()
      })
      .then(json => {
        this.setState({ institutions: [] })
      })
    //*/

    // 2018 found
    //*
    fetch(process.env.PUBLIC_URL + '2018.json')
      .then(response => {
        return response.json()
      })
      .then(json => {
        this.setState({ institutions: json.institutions })
      })

    //*/

    // 2017 found (not found for 2018)
    /*
    fetch(process.env.PUBLIC_URL + '2017.json')
      .then(response => {
        return response.json()
      })
      .then(json => {
        this.setState({ institutions: json.institutions })
      })
    //*/
  }

  render() {
    return (
      <React.Fragment>
        <form
          className="SearchForm"
          onSubmit={event => {
            event.preventDefault()
            this.handleSubmit(this.state)
          }}
        >
          <label>LEI</label>
          <input
            id="LEI"
            name="LEI"
            onChange={this.handleChange}
            placeholder="e.g., 987875HAG543RFDAHG54"
            type="text"
            value={this.state.LEI}
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
          <label>Respondent Name</label>
          <input
            id="respondentName"
            name="respondentName"
            onChange={this.handleChange}
            placeholder="e.g., Bank of HMDA"
            type="text"
            value={this.state.respondentName}
          />
          <InputSubmit actionType="search" />
        </form>
        <SearchResults data={this.state} />
      </React.Fragment>
    )
  }
}

export default SearchForm
