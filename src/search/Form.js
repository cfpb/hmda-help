import React, { Component } from 'react'

import InputSubmit from '../InputSubmit'
import TextInput from './TextInput'
import './Form.css'

// available inputs to search on
// for now, only LEI is working
const textInputs = [
  {
    label: 'LEI',
    id: 'lei',
    name: 'lei',
    value: 'test',
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
  error: false
}

class Form extends Component {
  constructor(props) {
    super(props)

    this.state = defaultState

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()

    //console.log(this.lei.value)

    fetch(`/v2/admin/institutions/${this.lei.value}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.status > 400) return null
        if (response.status < 300) return response.json()
      })
      .then(json => {
        if (json) {
          this.props.updateInstitutions(json)
        } else {
          this.props.updateError({ message: 'No results found!' }, this.state)
        }
      })
      .catch(error => {
        this.props.updateError(
          { message: 'The requested resource could not be found.' },
          null
        )
      })
  }

  render() {
    return (
      <form className="SearchForm" onSubmit={event => this.handleSubmit(event)}>
        {textInputs.map(textInput => {
          return (
            <TextInput
              key={textInput.id}
              ref={input => {
                this[textInput.id] = input
              }}
              label={textInput.label}
              inputId={textInput.id}
              placeholder={textInput.placeholder}
              value={textInput.value}
            />
          )
        })}
        <InputSubmit actionType="search" />
      </form>
    )
  }
}

export default Form
