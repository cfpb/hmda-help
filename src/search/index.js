import React, { Component } from 'react'

import Form from './Form'

class Search extends Component {
  constructor(props) {
    super(props)

    this.state = {
      institutions: null,
      error: null,
      lei: ''
      /*
      taxId: '',
      respondentName: '',
      emailDomains: ''
      */
    }
  }

  render() {
    return (
      <React.Fragment>
        <h3>Search for institution records</h3>
        <Form token={this.props.token} />
      </React.Fragment>
    )
  }
}

export default Search
