import React, { Component } from 'react'

import SearchForm from './SearchForm'
import SearchResults from './SearchResults'

class Search extends Component {
  constructor(props) {
    super(props)

    this.state = {
      institutions: null
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    this.setState({
      institutions: [{ name: 'test', lei: '12345', taxId: '54321' }]
    })
    // TODO: make api call for institutions
  }

  render() {
    return (
      <React.Fragment>
        <SearchForm handleSubmit={this.handleSubmit} />
        <SearchResults institutions={this.state.institutions} />
      </React.Fragment>
    )
  }
}

export default Search
