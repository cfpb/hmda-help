import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './Form.css'

import { flattenApiForState, nestStateForApi } from '../utils/convert'

import Results from './Results'
import InputSubmit from '../InputSubmit'
import InputText from '../InputText'
import Alert from '../Alert'

// available inputs to search on
// for now, only LEI is working
const textInputs = [
  {
    label: 'LEI',
    id: 'lei',
    name: 'lei',
    defaultValue: '',
    placeholder: '987875HAG543RFDAHG54'
  }
  /*{
    label: 'Respondent Name',
    id: 'respondentName',
    name: 'respondentName',
    value: '',
    placeholder: 'Bank of HMDA'
  },
  {
    label: 'Email Domains',
    id: 'emailDomains',
    name: 'emailDomains',
    value: '',
    placeholder: 'hmda.com'
  },
  {
    label: 'Tax Id',
    id: 'taxId',
    name: 'taxId',
    value: '',
    placeholder: '88-00000000'
  }*/
]

const defaultState = {
  error: null,
  institutions: null
}

class Form extends Component {
  constructor(props) {
    super(props)

    this.state = defaultState

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDeleteClick = this.handleDeleteClick.bind(this)
  }

  handleDeleteClick(institution, key) {
    fetch('/v2/admin/institutions', {
      method: 'DELETE',
      body: JSON.stringify(nestStateForApi(institution)),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.props.token
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
        // need to remove the institution from the state
        this.removeAnInstitutionFromState(key)
      })
      .catch(error => {
        console.log('error', error)
        this.setState({ error: error.message })
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
            institutions: [flattenApiForState(json)],
            error: null
          })
        } else {
          if (json === 404) {
            this.setState({
              error: {
                heading: 'Institution not found',
                message:
                  "That institution doesn't exist. Would you like to add it?"
              },
              institutions: null
            })
          }
        }
      })
      .catch(error => {
        console.log('error', error)
        this.setState({
          error: { message: 'The requested resource could not be found.' },
          institutions: null
        })
      })
  }

  render() {
    return (
      <React.Fragment>
        <form
          className="SearchForm"
          onSubmit={event => this.handleSubmit(event)}
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
                value={textInput.defaultValue}
              />
            )
          })}
          <InputSubmit actionType="search" />
        </form>

        {this.state.institutions ? (
          <Results
            institutions={this.state.institutions}
            deleteAnInstitution={this.deleteAnInstitution}
            token={this.props.token}
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
