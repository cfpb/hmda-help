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
      institutions: [],
      isSubmitted: false,
      error: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({ error: false, [event.target.name]: event.target.value })
  }

  handleSubmit(searchData) {
    // not found
    //*

    fetch(`http://192.168.99.100:8081/institutions/${this.state.LEI}`)
      .then(response => {
        if (response.status === 400) return null
        if (response.status === 200) return response.json()
      })
      .then(json => {
        if (json) {
          this.setState({
            institutions: [json],
            isSubmitted: true
          })
        } else {
          this.setState({
            institutions: [],
            isSubmitted: true
          })
        }
      })
      .catch(error => {
        this.setState({ error: true })
      })

    //*/

    // API call
    /*
    fetch(`http://192.168.99.100:8081/institutions/${this.state.LEI}`)
      .then(response => {
        return response.json()
      })
      .then(json => {
        this.setState({
          institutions: [...this.state.institutions, json]
        })
      })
    //*/

    // 2018 found
    /*
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
        {this.state.isSubmitted ? <SearchResults data={this.state} /> : null}
        {this.state.error ? <h1>Oh no</h1> : null}
      </React.Fragment>
    )
  }
}

export default SearchForm
