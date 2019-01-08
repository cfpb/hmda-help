import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './Form.css'

import { searchInputs } from '../constants/inputs.js'
import {
  flattenApiForInstitutionState,
  nestInstitutionStateForAPI
} from '../utils/convert'

import Results from './Results'
import InputSubmit from '../InputSubmit'
import InputText from '../InputText'
import Alert from '../Alert'

const defaultState = {
  error: null,
  errorDelete: null,
  institutions: null
}

class Form extends Component {
  constructor(props) {
    super(props)

    this.state = defaultState

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDeleteClick = this.handleDeleteClick.bind(this)
    this.removeAnInstitutionFromState = this.removeAnInstitutionFromState.bind(
      this
    )
  }

  removeAnInstitutionFromState(key) {
    let newInstitutions = this.state.institutions.filter(
      (institution, i) => i !== key
    )
    if (newInstitutions.length === 0) {
      this.setState({ institutions: defaultState.institutions })
    } else {
      this.setState({ institutions: newInstitutions })
    }
  }

  handleDeleteClick(institution, key) {
    fetch('/v2/admin/institutions', {
      method: 'DELETE',
      body: JSON.stringify(nestInstitutionStateForAPI(institution)),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.props.token
      }
    })
      .then(response => {
        if (response.ok) {
          this.setState({ errorDelete: defaultState.errorDelete })
          return response.json()
        } else {
          throw new Error(response.status)
        }
      })
      .then(json => {
        // need to remove the institution from the state
        this.removeAnInstitutionFromState(key)
      })
      .catch(error => {
        this.setState({ errorDelete: error.message })
      })
  }

  handleSubmit(event) {
    event.preventDefault()

    fetch(`/v2/admin/institutions/${this.lei.value}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.status > 400) return response.status
        if (response.status < 300) return response.json()
      })
      .then(json => {
        if (typeof json === 'object') {
          this.setState({
            institutions: [flattenApiForInstitutionState(json)],
            error: defaultState.error
          })
        } else {
          if (json === 404) {
            this.setState({
              error: {
                heading: 'Institution not found',
                message:
                  "That institution doesn't exist. Would you like to add it?"
              },
              institutions: defaultState.institutions
            })
          }
        }
      })
      .catch(error => {
        this.setState({
          error: { message: 'The requested resource could not be found.' },
          institutions: defaultState.institutions
        })
      })
  }

  render() {
    return (
      <React.Fragment>
        <h3>Search for institution records</h3>
        <form
          className="SearchForm"
          onSubmit={event => this.handleSubmit(event)}
        >
          {searchInputs.map(textInput => {
            return (
              <InputText
                key={textInput.id}
                ref={input => {
                  this[textInput.id] = input
                }}
                label={textInput.label}
                inputId={textInput.id}
                placeholder={textInput.placeholder}
                value={textInput.defaultValue}
              />
            )
          })}
          <InputSubmit actionType="search" />
        </form>

        {this.state.institutions ? (
          <Results
            institutions={this.state.institutions}
            handleDeleteClick={this.handleDeleteClick}
            error={this.state.errorDelete}
          />
        ) : null}

        {this.state.error ? (
          <Alert
            heading={this.state.error.heading}
            message={this.state.error.message}
            type="error"
          >
            <p>
              <Link
                to={{
                  pathname: '/add',
                  state: {
                    institution: {
                      lei: this.lei.value
                    }
                  }
                }}
              >
                Add {this.lei.value}
              </Link>
            </p>
          </Alert>
        ) : null}
      </React.Fragment>
    )
  }
}

export default Form
