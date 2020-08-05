import React, { Component } from 'react'
import PropTypes from 'prop-types'

import '../Loading.css'

import { searchInputs } from '../constants/inputs.js'
import { nestInstitutionStateForAPI } from '../utils/convert'

import Results from './Results'
import InputSubmit from '../InputSubmit'
import InputText from '../InputText'
import Loading from '../Loading.jsx'
import InstitutionNotFound from './InstitutionNotFound'
import ServerErrors from './ServerErrors'
import { fetchInstitution } from './fetchInstitution'

const defaultState = {
  errors: [],
  errorDelete: null,
  institutions: null,
  year: null,
  notFound: [],
  lei: ''
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
    this.setState = this.setState.bind(this)
    this.onInputTextChange = this.onInputTextChange.bind(this)
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

    this.setState({
      fetching: true,
      institutions: [],
      notFound: [],
      errors: []
    })

    Promise.all(fetchInstitution(this.state.lei, this.setState))
      .then(() => this.setState({ fetching: false }))
      .catch(error =>
        this.setState(state => ({
          errors: [...state.errors, error.message],
          fetching: false
        }))
      )
  }

  onInputTextChange = event => {
    let {id, value} = event.target
    if(id === 'lei') value = value.toUpperCase()
    this.setState({ [id]: value })
  }

  render() {
    const isFetching = this.state.fetching
    return (
      <React.Fragment>
          <div >
            <h3>Search for institution records</h3>
            <form
              className="SearchForm"
              onSubmit={event => this.handleSubmit(event)}
            >
              {searchInputs.map(textInput => {
                delete textInput.validation
                return (
                  <InputText
                    key={textInput.id}
                    ref={input => {
                      this[textInput.id] = input
                    }}
                    {...textInput}
                    onChange={this.onInputTextChange}
                    value={this.state[textInput.id]}
                  />
                )
              })}
              <InputSubmit actionType="search" />
              {isFetching && <Loading className="LoadingInline" />}
            </form>
          </div>

        {!isFetching && <ServerErrors errors={this.state.errors} />}
        {!isFetching && <InstitutionNotFound yearList={this.state.notFound} />}

        {!isFetching && this.state.institutions && (
          <Results
            institutions={this.state.institutions}
            handleDeleteClick={this.handleDeleteClick}
            error={this.state.errorDelete}
          />
        )}
      </React.Fragment>
    )
  }
}

Form.propTypes = {
  token: PropTypes.string.isRequired
}

export default Form
