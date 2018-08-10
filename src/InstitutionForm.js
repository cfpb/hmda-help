import React, { Component } from 'react'

import InputText from './InputText.js'
import InputSubmit from './InputSubmit.js'

class InstitutionForm extends Component {
  constructor(props) {
    super(props)

    this.state = { isSubmitted: false }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event, pathname) {
    event.preventDefault()

    this.setState({ isSubmitted: true })

    console.log(`${pathname} submitted`)
    // TODO: make api call for institutions
  }

  render() {
    const { state, pathname } = this.props.location
    console.log(this.props)
    return (
      <React.Fragment>
        <form onSubmit={event => this.handleSubmit(event, pathname)}>
          <InputText
            label="LEI"
            id="lei"
            defaultValue={state.institution.lei}
          />
          <InputText
            label="Tax ID"
            id="taxId"
            defaultValue={state.institution.taxId}
          />
          <InputText
            label="Name"
            id="name"
            defaultValue={state.institution.name}
          />
          <InputSubmit actionType="add" />
        </form>
        {this.state.isSubmitted ? <h3>Submitted</h3> : null}
      </React.Fragment>
    )
  }
}

export default InstitutionForm
