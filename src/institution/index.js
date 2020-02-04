import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { searchInputs, requiredInputs, otherInputs } from '../constants/inputs'
import {
  nestInstitutionStateForAPI,
  flattenApiForInstitutionState
} from '../utils/convert'
import { validateAll } from '../utils/validate'

import OtherFields from './OtherFields'
import InputText from '../InputText'
import InputRadio from '../InputRadio'
import InputSelect from '../InputSelect'
import InputSubmit from '../InputSubmit'
import Alert from '../Alert'
import Loading from '../Loading.jsx'

import './Form.css'
import '../Loading.css'

let defaultInstitutionState = {}
searchInputs
  .concat(requiredInputs, otherInputs)
  .forEach(
    textInput => (defaultInstitutionState[textInput.id] = textInput.value)
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
      disabledSubmit: true,
      ...defaultInstitutionState
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.getErrorHeading = this.getErrorHeading.bind(this)
    this.getErrorText = this.getErrorText.bind(this)
    this.onInputChange = this.onInputChange.bind(this)
    this.onInputBlur = this.onInputBlur.bind(this)
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
    if (['radio', 'select-one'].includes(event.target.type)) {
      this.setState({ [event.target.name]: event.target.value }, () => {
        this.onInputBlur()
      })
    } else {
      let value = event.target.value
      if (event.target.name === 'lei') value = value.toUpperCase()
      this.setState({ [event.target.name]: value })
    }
  }

  onInputBlur() {
    this.setState({
      disabledSubmit: validateAll(
        searchInputs.concat(requiredInputs),
        this.state
      )
    })
  }

  handleSubmit(event, token) {
    event.preventDefault()
    this.setState({ fetching: true, error: null })

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
        if (response.ok) return response.json()
        if ([403, 404].indexOf(response.status) > -1) 
          return Promise.reject(
            new Promise(resolve => resolve({ httpStatus: response.status }))
          )
        return Promise.reject(response.json())
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
        error.then(json => {
          const status = this.getResponseStatus(json)
          this.setState({ error: status, fetching: false })
        })
      })
  }

  getResponseStatus(json) {
    if (json === 'Incorrect lei format') return '601'
    return `${json.httpStatus}`
  }

  getErrorHeading() {
    switch(this.state.error){
      case '400': return 'Duplicate LEI'
      case '403': return 'Access Denied'
      case '404': return 'Not Found'
      case '601': return 'Invalid LEI format'
      default: return ''
    }
  }

  getErrorText() {
    switch(this.state.error){
      case '400': return "Sorry, that LEI already exists. You can verify that by using the search."
      case '403': return "Sorry, you don't have the correct permissions. Please contact a HMDA Help administrator."
      case '404': return "Something went wrong. It doesn't look like this institution can be added. Please check your data and try again."
      case '601': return "Please verify the format of the LEI and try again."
      default: return ''
    }
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
          You can update this institution by using the form on this page,{' '}
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
          {searchInputs.concat(requiredInputs).map(searchInput => {
            if (searchInput.type === 'select') {
              return (
                <InputSelect
                  key={searchInput.id}
                  {...searchInput}
                  onChange={this.onInputChange}
                  onBlur={this.onInputBlur}
                  value={
                    state && state.institution
                      ? state.institution[searchInput.id]
                      : searchInput.value
                  }
                />
              )
            }
            if (searchInput.type === 'radio') {
              return (
                <InputRadio
                  key={searchInput.id}
                  {...searchInput}
                  onChange={this.onInputChange}
                  value={
                    state && state.institution
                      ? state.institution[searchInput.id]
                      : searchInput.value
                  }
                />
              )
            }
            return (
              <InputText
                key={searchInput.id}
                {...searchInput}
                value={
                  state && state.institution
                    ? state.institution[searchInput.id]
                    : searchInput.value
                }
                disabled={
                  pathname === '/update' && searchInput.id === 'lei'
                    ? true
                    : false
                }
                onChange={this.onInputChange}
                onBlur={this.onInputBlur}
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

          <InputSubmit
            actionType={pathname === '/add' ? 'add' : 'update'}
            disabled={this.state.disabledSubmit}
          />

          {this.state.fetching ? <Loading className="LoadingInline" /> : null}

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
