import React, { Component } from 'react'

import InputText from './InputText.js'
import InputSubmit from './InputSubmit.js'

class SearchForm extends Component {
  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    console.log('search submitted')
    // TODO: make api call for institutions
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <InputText label="LEI" id="lei" />
        <InputText label="Tax ID" id="taxId" />
        <InputText label="Name" id="name" />
        <InputSubmit actionType="search" />
      </form>
    )
  }
}

export default SearchForm
