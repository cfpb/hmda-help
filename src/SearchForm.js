import React, { Component } from 'react'

import InputSubmit from './InputSubmit'
import SearchResults from './SearchResults'

class SearchForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      lei: '',
      taxId: '',
      name: '',
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

    this.setState({ institutions: [] })

    /*this.setState({
      institutions: [
        { name: 'test', lei: '12345', taxId: '54321', year: '2018' },
        { name: 'test2', lei: '09876', taxId: '67890', year: '2017' }
      ]
    })*/
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
          <label>Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <InputSubmit actionType="search" />
        </form>
        <SearchResults results={this.state} />
      </React.Fragment>
    )
  }
}

export default SearchForm
