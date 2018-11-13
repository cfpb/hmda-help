import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { nestStateForApi } from '../utils/convert'

import Alert from '../Alert'

import './Results.css'

class SearchResults extends Component {
  constructor(props) {
    super(props)

    this.state = {
      httpError: null
    }

    this.tables = new Map()
    this.buttons = new Map()

    this.handleViewMoreClick = this.handleViewMoreClick.bind(this)
    this.handleDeleteClick = this.handleDeleteClick.bind(this)
    this.toggleAreYouSure = this.toggleAreYouSure.bind(this)
  }

  toggleAreYouSure(key) {
    this.setState({ httpError: null })
    document.getElementById(`initialActions${key}`).classList.toggle('hidden')
    document.getElementById(`areYouSure${key}`).classList.toggle('hidden')
  }

  handleDeleteClick(institution, key, token) {
    fetch('/v2/admin/institutions', {
      method: 'DELETE',
      body: JSON.stringify(nestStateForApi(institution)),
      headers: {
        Accept: 'application/json',
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
        // need to remove the institution from the state
        this.props.deleteAnInstitution(key)
      })
      .catch(error => {
        this.setState({ httpError: error.message })
      })
  }

  handleViewMoreClick(i) {
    const table = this.tables.get(i)
    const button = this.buttons.get(i)

    table.classList.toggle('hidden')
    if (table.classList.contains('hidden')) {
      button.innerHTML = 'Show other fields'
    } else {
      button.innerHTML = 'Hide other fields'
    }
  }

  // TODO: make this a component
  renderSearchHeading(numOfResults) {
    if (numOfResults === 0) return <h2>Sorry, no results were found.</h2>

    let resultsText = numOfResults === 1 ? 'result' : 'results'
    return (
      <h2>
        {numOfResults} {resultsText} found
      </h2>
    )
  }

  renderAction(institution) {
    let link = {
      pathname: '/update',
      text: 'Update',
      type: 'update'
    }

    if (institution.activityYear === 2017) {
      link = {
        pathname: '/add',
        text: 'Add',
        type: 'addition'
      }
    }

    return (
      <React.Fragment>
        <Link
          to={{ pathname: link.pathname, state: { institution: institution } }}
        >
          {link.text}
        </Link>
      </React.Fragment>
    )
  }

  render() {
    if (!this.props.institutions) return null

    const { institutions } = this.props

    return (
      <div className="SearchResults">
        {this.renderSearchHeading(institutions.length)}

        <table className="institutions">
          <thead>
            <tr>
              <th width="15%">LEI</th>
              <th width="15%">Name</th>
              <th width="15%">Email Domain</th>
              <th width="15%">Tax ID</th>
              <th width="40%" />
            </tr>
          </thead>
          <tbody>
            {institutions.map((institution, i) => {
              return (
                <React.Fragment key={i}>
                  <tr>
                    <td>{institution.lei}</td>
                    <td>{institution.respondentName}</td>
                    <td>{institution.emailDomains}</td>
                    <td>{institution.taxId}</td>

                    <td className="action">
                      <div className="initialActions" id={`initialActions${i}`}>
                        <button
                          onClick={event => this.handleViewMoreClick(i)}
                          ref={element => this.buttons.set(i, element)}
                          className="showOtherFields"
                        >
                          Show other fields
                        </button>
                        {this.renderAction(institution)}
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
                            this.handleDeleteClick(
                              institution,
                              i,
                              this.props.token
                            )}
                        >
                          Yes
                        </button>
                        <button onClick={event => this.toggleAreYouSure(i)}>
                          No
                        </button>
                      </div>
                      {this.state.httpError ? (
                        <Alert
                          type="error"
                          heading="Access Denied"
                          text="Sorry, it doesn't look like you have the correct permissions to
                perform this action."
                          smallWidth={true}
                        />
                      ) : null}
                    </td>
                  </tr>
                  <tr
                    className="otherData hidden"
                    ref={element => this.tables.set(i, element)}
                  >
                    <td colSpan={5}>
                      <table>
                        <thead>
                          <tr>
                            <th>Type</th>
                            <th>2017 ID</th>
                            <th>RSSD</th>
                            <th>Location</th>
                            <th>Parent</th>
                            <th>Assets</th>
                            <th>Other Lender Code</th>
                            <th>Top Holder</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{institution.institutionType}</td>
                            <td>{institution.institutionId2017}</td>
                            <td>{institution.rssd}</td>
                            <td>
                              {institution.respondentCity},{' '}
                              {institution.respondentState}
                            </td>
                            <td>
                              {institution.parentName}
                              <br />
                              <span>{institution.parentIdRssd}</span>
                            </td>
                            <td>{institution.assets}</td>
                            <td>{institution.otherLenderCode}</td>
                            <td>
                              {institution.topHolderName}
                              <br />
                              <span>{institution.topHolderIdRssd}</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </React.Fragment>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

export default SearchResults
