import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { searchInputs, requiredInputs, otherInputs } from '../constants/inputs'
import {
  nestInstitutionStateForAPI,
  flattenApiForInstitutionState
} from '../utils/convert'

import InputText from '../InputText'
import InputSubmit from '../InputSubmit'
import Alert from '../Alert'

import './Form.css'

let defaultInstitutionState = {}
searchInputs
  .concat(requiredInputs, otherInputs)
  .forEach(
    textInput =>
      (defaultInstitutionState[textInput.id] = textInput.defaultValue)
  )

class Institution extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isSubmitted: false,
      error: null,
      wasAddition: false,
      ...defaultInstitutionState
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.getErrorHeading = this.getErrorHeading.bind(this)
    this.getErrorText = this.getErrorText.bind(this)
    this.onInputChange = this.onInputChange.bind(this)
  }

  componentDidMount() {
    const { state, pathname } = this.props.location

    if (pathname === '/update' && !state) this.props.history.push('/add')

    if (state && state.institution) {
      this.setState({ ...state.institution })
    }

    if (state && state.wasAddition) {
      this.setState({ wasAddition: state.wasAddition })
    }
  }

  onInputChange(event) {
    this.setState({ [event.target.id]: event.target.value })
  }

  handleSubmit(event, token) {
    event.preventDefault()

    const method = this.props.location.pathname === '/add' ? 'POST' : 'PUT'

    fetch(`/v2/admin/institutions`, {
      method: method,
      body: JSON.stringify(nestInstitutionStateForAPI(this.state)),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error(response.status)
        }
      })
      .then(json => {
        // set the rest of the state here to be the json response
        // just in case something goes wrong
        // we then have the what the back-end has
        this.setState({
          isSubmitted: true,
          institution: flattenApiForInstitutionState(json),
          wasAddition: false
        })
      })
      .then(() => {
        this.props.history.push({
          pathname: '/update',
          state: {
            institution: this.state,
            wasAddition: this.props.location.pathname === '/add'
          }
        })
      })
      .catch(error => {
        this.setState({ error: error.message })
      })
  }

  getErrorHeading() {
    let errorHeading = null
    if (this.state.error === '400') {
      errorHeading = 'Not Found'
    }
    if (this.state.error === '403') {
      errorHeading = 'Access Denied'
    }

    return errorHeading
  }

  getErrorText() {
    let errorText = null
    if (this.state.error === '400') {
      errorText =
        "Something went wrong. It doesn't look like this institution can be added. Please check your data and try again."
    }
    if (this.state.error === '403') {
      errorText =
        "Sorry, you don't have the correct permissions. Please contact a HMDA Help administrator."
    }

    return errorText
  }

  render() {
    const { pathname, state } = this.props.location

    return (
      <React.Fragment>
        <h3>
          {pathname === '/add'
            ? 'Add an institution record'
            : 'Update an institution record'}
        </h3>
        <Alert
          type="error"
          heading="Are you Tier 2 support?"
          message={
            pathname === '/add'
              ? 'New institutions should be submitted by Tier 2. Please escalate the case to Tier 2 for further support.'
              : 'If any data fields other than Respondent Name or Email Domain need to be updated, please escalate the case to Tier 2 for further support.'
          }
        />
        {this.state.isSubmitted ? (
          <Alert
            type="success"
            heading="Success!"
            message={
              this.state.wasAddition
                ? `The institution, ${this.state.lei}, has been added!`
                : `The institution, ${this.state.lei}, has been updated.`
            }
          >
            <p>
              You can update this institution by using the form below,{' '}
              <Link to="/">search for an institution</Link>, or{' '}
              <Link to="/add">add a new institution.</Link>
            </p>
          </Alert>
        ) : null}
        <form
          className="InstitutionForm"
          onSubmit={event => this.handleSubmit(event, this.props.token)}
        >
          {searchInputs.concat(requiredInputs, otherInputs).map(textInput => {
            return (
              <InputText
                key={textInput.id}
                label={textInput.label}
                inputId={textInput.id}
                placeholder={textInput.placeholder}
                value={
                  state && state.institution
                    ? state.institution[textInput.id]
                    : textInput.defaultValue
                }
                disabled={
                  pathname === '/update' && textInput.id === 'lei'
                    ? true
                    : false
                }
                onChange={this.onInputChange}
              />
            )
          })}

          <InputSubmit actionType={pathname === '/add' ? 'add' : 'update'} />

          {this.state.error ? (
            <Alert
              type="error"
              heading={this.getErrorHeading()}
              message={this.getErrorText()}
            />
          ) : null}
        </form>
        {this.state.isSubmitted ? (
          <Alert
            type="success"
            heading="Success!"
            message={
              this.state.wasAddition
                ? `The institution, ${this.state.lei}, has been added!`
                : `The institution, ${this.state.lei}, has been updated.`
            }
          >
            <p>
              You can update this institution by using the form above,{' '}
              <Link to="/">search for an institution</Link>, or{' '}
              <Link to="/add">add a new institution.</Link>
            </p>
          </Alert>
        ) : null}
      </React.Fragment>
    )
  }
}

export default Institution
