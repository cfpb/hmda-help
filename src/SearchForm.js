import React, { Component } from 'react'

import InputSubmit from './InputSubmit'
import SearchResults from './SearchResults'

class SearchForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      lei: '',
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
    // TODO: make api call for institutions

    // not found
    /*
    fetch(process.env.PUBLIC_URL + 'none.json')
      .then(response => {
        //console.log(response.body)
        return response.json()
      })
      .then(json => {
        console.log(json)
      })
    this.setState({ institutions: [] })
    //*/

    // 2018 found
    /*
    fetch(process.env.PUBLIC_URL + '2018.json')
      .then(response => {
        return response.json()
      })
      .then(json => {
        console.log(json)
        this.setState({ institutions: json.institutions })
      })

    //*/

    // 2017 found (not found for 2018)
    //*
    fetch(process.env.PUBLIC_URL + '2017.json')
      .then(response => {
        return response.json()
      })
      .then(json => {
        console.log(json)
        this.setState({ institutions: json.institutions })
      })
    //*/
  }

  render() {
    return (
      <React.Fragment>
        <form
          onSubmit={event => {
            event.preventDefault()
            this.handleSubmit(this.state)
          }}
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
          <InputSubmit actionType="search" />
        </form>
        <SearchResults data={this.state} />
      </React.Fragment>
    )
  }
}

export default SearchForm
