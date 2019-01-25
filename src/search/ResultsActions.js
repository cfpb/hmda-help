import React, { Component, lazy } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import './Results.css'

const Alert = lazy(() => import('../Alert'))
const Loading = lazy(() => import('../Loading.jsx'))

class ResultsActions extends Component {
  constructor(props) {
    super(props)

    this.state = { deleting: false }
    this.buttons = new Map()

    this.handleViewMoreClick = this.handleViewMoreClick.bind(this)
    this.toggleAreYouSure = this.toggleAreYouSure.bind(this)
  }

  toggleAreYouSure(index) {
    document.getElementById(`initialActions${index}`).classList.toggle('hidden')
    document.getElementById(`areYouSure${index}`).classList.toggle('hidden')
  }

  handleViewMoreClick(index) {
    const table = this.props.tables.get(index)
    const button = this.buttons.get(index)

    table.classList.toggle('hidden')
    if (table.classList.contains('hidden')) {
      button.innerHTML = 'Show other fields'
    } else {
      button.innerHTML = 'Hide other fields'
    }
  }

  render() {
    const { institution, index, error, handleDeleteClick } = this.props

    return this.state.deleting ? (
      <Loading className="LoadingInline" />
    ) : (
      <td className="action">
        <div className="initialActions" id={`initialActions${index}`}>
          <Link
            to={{ pathname: '/update', state: { institution: institution } }}
          >
            Update
          </Link>
          <button
            className="delete"
            onClick={event => this.toggleAreYouSure(index)}
          >
            Delete
          </button>
          <button
            onClick={event => this.handleViewMoreClick(index)}
            ref={element => this.buttons.set(index, element)}
            className="showOtherFields"
          >
            Show other fields
          </button>
        </div>
        <div className="areYouSure hidden" id={`areYouSure${index}`}>
          <span>Are you sure?</span>{' '}
          <button
            className="delete"
            onClick={event => {
              this.setState({ deleting: true })
              handleDeleteClick(institution, index, this.props.token)
            }}
          >
            Yes
          </button>
          <button onClick={event => this.toggleAreYouSure(index)}>No</button>
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

ResultsActions.propTypes = {
  institution: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  error: PropTypes.string,
  handleDeleteClick: PropTypes.func.isRequired,
  tables: PropTypes.object.isRequired
  //onInputChange: PropTypes.func.isRequired
}

export default ResultsActions
