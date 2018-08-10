import React, { Component } from 'react'

import InputSubmit from './InputSubmit.js'

class InstitutionForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isSubmitted: false,
      lei: '',
      taxId: '',
      name: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    if (this.props.location.state) {
      const { institution } = this.props.location.state
      this.setState({
        lei: institution.lei,
        taxId: institution.taxId,
        name: institution.name
      })
    }
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit(event, pathname) {
    event.preventDefault()

    this.setState({ isSubmitted: true })
  }

  render() {
    const { pathname, state } = this.props.location
    const submittedAction = pathname === '/add' ? 'Addition' : 'Update'
    const actionType = pathname === '/add' ? 'add' : 'update'

    //console.log(this.props)
    //if (!this.props.location.state) return null

    if (pathname === '/update' && !state) return <h1>NOOOOO!</h1>

    return (
      <React.Fragment>
        <form onSubmit={event => this.handleSubmit(event, pathname)}>
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
          <InputSubmit actionType={actionType} />
        </form>
        {this.state.isSubmitted ? (
          <h3>
            {submittedAction} Submitted for {this.state.lei}
          </h3>
        ) : null}
      </React.Fragment>
    )
  }
}

export default InstitutionForm
