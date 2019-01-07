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

    //this.deleteAnInstitution = this.deleteAnInstitution.bind(this)
  }

  deleteAnInstitution(key) {
    let newInstitutions = this.state.institutions.filter(
      (institution, i) => i !== key
    )
    if (newInstitutions.length === 0) newInstitutions = null
    this.setState({ institutions: newInstitutions })
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
