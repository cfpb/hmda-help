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
        <SearchForm handleSubmit={this.handleSubmit} />
        <SearchResults institutions={this.state.institutions} />
      </React.Fragment>
    )
  }
}

export default Search
