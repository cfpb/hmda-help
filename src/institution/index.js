import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { searchInputs, requiredInputs, otherInputs } from '../constants/inputs'
import {
  nestInstitutionStateForAPI,
  flattenApiForInstitutionState
} from '../utils/convert'

import OtherFields from './OtherFields'
import InputText from '../InputText'
import InputSubmit from '../InputSubmit'
import Alert from '../Alert'
import Loading from '../Loading.jsx'

import './Form.css'
import '../Loading.css'

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
      showOtherFields: false,
      fetching: false,
      ...defaultInstitutionState
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.getErrorHeading = this.getErrorHeading.bind(this)
    this.getErrorText = this.getErrorText.bind(this)
    this.onInputChange = this.onInputChange.bind(this)
    this.toggleShowOtherFields = this.toggleShowOtherFields.bind(this)
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

  toggleShowOtherFields() {
    this.setState(prevState => ({
      showOtherFields: !prevState.showOtherFields
    }))
  }

  onInputChange(event) {
    this.setState({ [event.target.id]: event.target.value })
  }

  handleSubmit(event, token) {
    event.preventDefault()

    this.setState({fetching: true})

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
          wasAddition: false,
          fetching: false
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
        this.setState({ error: error.message, fetching: false })
      })
  }

  getErrorHeading() {
    let errorHeading = null
    if (this.state.error === '400') {
      errorHeading = 'Duplicate LEI'
    }
    if (this.state.error === '403') {
      errorHeading = 'Access Denied'
    }
    if (this.state.error === '404') {
      errorHeading = 'Not Found'
    }

    return errorHeading
  }

  getErrorText() {
    let errorText = null
    if (this.state.error === '400') {
      errorText =
        'Sorry, that LEI already exists. You can verify that by using the search.'
    }
    if (this.state.error === '403') {
      errorText =
        "Sorry, you don't have the correct permissions. Please contact a HMDA Help administrator."
    }
    if (this.state.error === '404') {
      errorText =
        "Something went wrong. It doesn't look like this institution can be added. Please check your data and try again."
    }

    return errorText
  }

  render() {
    const { pathname, state } = this.props.location
    const successAlert = this.state.isSubmitted ? (
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
    ) : null

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
        {successAlert}
        <form
          className="InstitutionForm"
          onSubmit={event => this.handleSubmit(event, this.props.token)}
        >
          {searchInputs.concat(requiredInputs).map(textInput => {
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

          <button
            className="toggleButton"
            type="button"
            onClick={this.toggleShowOtherFields}
          >
            {this.state.showOtherFields ? 'Hide' : 'Show'} other fields
          </button>

          {this.state.showOtherFields ? (
            <OtherFields
              institution={
                state && state.institution ? state.institution : null
              }
              onInputChange={this.onInputChange}
            />
          ) : null}

          <InputSubmit actionType={pathname === '/add' ? 'add' : 'update'} />

          {this.state.fetching ? <Loading className="LoadingInline"/> : null}

          {this.state.error ? (
            <Alert
              type="error"
              heading={this.getErrorHeading()}
              message={this.getErrorText()}
            />
          ) : null}
        </form>
        {successAlert}
      </React.Fragment>
    )
  }
}

export default Institution
