import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { nestStateForApi, flattenApiForState } from '../utils/convert'

import InputText from '../InputText'
import OtherFieldsToggleButton from './OtherFieldsToggleButton'
import OtherFields from './OtherFields'
import Success from './Success'
import InputSubmit from '../InputSubmit'
import Alert from '../Alert'

import './Form.css'

const textInputs = [
  {
    label: 'LEI',
    id: 'lei',
    name: 'lei',
    defaultValue: '',
    placeholder: ''
  },
  {
    label: 'Respondent Name',
    id: 'respondentName',
    name: 'respondentName',
    defaultValue: '',
    placeholder: ''
  },
  {
    label: 'Email Domains',
    id: 'emailDomains',
    name: 'emailDomains',
    defaultValue: '',
    placeholder: ''
  },
  {
    label: 'Tax Id',
    id: 'taxId',
    name: 'taxId',
    defaultValue: '',
    placeholder: ''
  },
  {
    label: 'Agency Code',
    id: 'agency',
    name: 'agency',
    defaultValue: '',
    placeholder: ''
  }
]

class Institution extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isSubmitted: false,
      error: null,
      showOtherFields: false
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.toggleShowOtherFields = this.toggleShowOtherFields.bind(this)
    this.getErrorHeading = this.getErrorHeading.bind(this)
    this.getErrorText = this.getErrorText.bind(this)
    this.backToUpdate = this.backToUpdate.bind(this)
  }

  backToUpdate(event) {
    event.preventDefault()

    // if at /add we need to link, not just update state
    // we have to go to /update, but keep the state
    // so we use history.push(pathname: pathname, state: {})
    if (this.props.location.pathname === '/add') {
      this.props.history.push({
        pathname: '/update',
        state: { institution: this.state }
      })
    }

    // this works if we're at /update
    this.setState({
      isSubmitted: false
    })
  }

  handleSubmit(event, pathname, token) {
    event.preventDefault()

    const institution = nestStateForApi(this.state)

    const method = this.props.location.pathname === '/add' ? 'POST' : 'PUT'

    fetch(`/v2/admin/institutions`, {
      method: method,
      body: JSON.stringify(institution),
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
        this.setState({ isSubmitted: true, ...flattenApiForState(json) })
      })
      .catch(error => {
        this.setState({ error: error.message })
      })
  }

  toggleShowOtherFields() {
    this.setState(prevState => ({
      showOtherFields: !prevState.showOtherFields
    }))
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
    const action = {
      submitted: pathname === '/add' ? 'added' : 'updated',
      type: pathname === '/add' ? 'add' : 'update',
      heading:
        pathname === '/add'
          ? 'Add an institution record'
          : 'Update an institution record',
      warning:
        pathname === '/add'
          ? 'New institutions should be submitted by Tier 2. Please escalate the case to Tier 2 for further support.'
          : 'If any data fields other than Respondent Name or Email Domain need to be updated, please escalate the case to Tier 2 for further support.'
    }

    if (pathname === '/update' && !state) this.props.history.push('/')

    return this.state.isSubmitted ? (
      <React.Fragment>
        <Success institution={this.state} action={action.submitted} />
        <p>
          <button
            className="backToUpdate"
            onClick={event => this.backToUpdate(event)}
          >
            Update this institution
          </button>
        </p>
        <p>
          <Link to="/">Search for a new institution</Link>
        </p>
      </React.Fragment>
    ) : (
      <React.Fragment>
        <h3>{action.heading}</h3>
        <Alert
          type="error"
          heading="Are you Tier 2 support?"
          text={action.warning}
        />
        <form
          className="InstitutionForm"
          onSubmit={event =>
            this.handleSubmit(event, pathname, this.props.token)
          }
        >
          {textInputs.map(textInput => {
            return (
              <InputText
                key={textInput.id}
                ref={input => {
                  this[textInput.id] = input
                }}
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
              />
            )
          })}

          {/*<OtherFieldsToggleButton
            showOtherFields={this.state.showOtherFields}
            toggleShowOtherFields={this.toggleShowOtherFields}
          />

          {this.state.showOtherFields
            ? null
            : <OtherFields
              formData={this.state}
              handleChange={this.handleChange}
            />
            }
          */}
          <InputSubmit actionType={action.type} />

          {this.state.error ? (
            <Alert
              type="error"
              heading={this.getErrorHeading()}
              text={this.getErrorText()}
            />
          ) : null}
        </form>
      </React.Fragment>
    )
  }
}

export default Institution
