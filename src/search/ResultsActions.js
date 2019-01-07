import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { nestStateForApi } from '../utils/convert'

import Alert from '../Alert'

import './Results.css'

class ResultsActions extends Component {
  constructor(props) {
    super(props)

    this.buttons = new Map()

    this.handleViewMoreClick = this.handleViewMoreClick.bind(this)
    this.toggleAreYouSure = this.toggleAreYouSure.bind(this)
  }

  toggleAreYouSure(key) {
    document.getElementById(`initialActions${key}`).classList.toggle('hidden')
    document.getElementById(`areYouSure${key}`).classList.toggle('hidden')
  }

  handleViewMoreClick(i) {
    const table = this.props.tables.get(i)
    const button = this.buttons.get(i)

    table.classList.toggle('hidden')
    if (table.classList.contains('hidden')) {
      button.innerHTML = 'Show other fields'
    } else {
      button.innerHTML = 'Hide other fields'
    }
  }

  render() {
    console.log('actions', this.props)
    const { institution, i, error } = this.props

    return (
      <td className="action">
        <div className="initialActions" id={`initialActions${i}`}>
          <button
            onClick={event => this.handleViewMoreClick(i)}
            ref={element => this.buttons.set(i, element)}
            className="showOtherFields"
          >
            Show other fields
          </button>
          <Link
            to={{
              pathname: '/add',
              state: { institution: institution }
            }}
          >
            Add
          </Link>
          <button
            className="delete"
            onClick={event => this.toggleAreYouSure(i)}
          >
            Delete
          </button>
        </div>
        <div className="areYouSure hidden" id={`areYouSure${i}`}>
          <span>Are you sure?</span>{' '}
          <button
            className="delete"
            onClick={event =>
              this.props.handleDeleteClick(institution, i, this.props.token)
            }
          >
            Yes
          </button>
          <button onClick={event => this.toggleAreYouSure(i)}>No</button>
        </div>
        {error ? (
          <Alert
            type="error"
            heading="Access Denied"
            text="Sorry, it doesn't look like you have the correct permissions to
                perform this action."
          />
        ) : null}
      </td>
    )
  }
}
export default ResultsActions
