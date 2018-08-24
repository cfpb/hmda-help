import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { nestStateForApi } from '../utils/convert'

import './Results.css'

class SearchResults extends Component {
  constructor(props) {
    super(props)

    this.tables = new Map()
    this.buttons = new Map()

    this.handleViewMoreClick = this.handleViewMoreClick.bind(this)
    this.handleDeleteClick = this.handleDeleteClick.bind(this)
  }

  handleDeleteClick(institution, key) {
    fetch('http://192.168.99.100:8081/institutions', {
      method: 'DELETE',
      body: JSON.stringify(nestStateForApi(institution)),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => {
        if (response.status > 400) return null
        if (response.status < 300) return response.json()
      })
      .then(json => {
        // need to remove the institution from the state
        this.props.deleteAnInstitution(key)
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

    const { institutions, LEI, taxId, respondentName } = this.props

    return (
      <div className="SearchResults">
        {this.renderSearchHeading(institutions.length)}
        {institutions.length === 0 ? (
          <p>
            But you can{' '}
            <Link
              to={{
                pathname: '/add',
                state: {
                  institution: {
                    LEI: LEI,
                    taxId: taxId,
                    respondentName: respondentName
                  }
                }
              }}
            >
              add a new institution
            </Link>{' '}
            based on your search term(s).
          </p>
        ) : (
          <table className="institutions">
            <thead>
              <tr>
                <th>Name and LEI</th>
                <th>Tax ID</th>
                <th>Email Domain</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {institutions.map((institution, i) => {
                return (
                  <React.Fragment key={i}>
                    <tr>
                      <td>
                        <span className="name">
                          {institution.respondentName}
                        </span>
                        <br />
                        <span className="lei">{institution.LEI}</span>
                      </td>

                      <td>{institution.taxId}</td>

                      <td>{institution.emailDomains}</td>

                      <td className="action">
                        <button
                          onClick={event => this.handleViewMoreClick(i)}
                          ref={element => this.buttons.set(i, element)}
                        >
                          Show other fields
                        </button>
                        {this.renderAction(institution)}
                        <button
                          className="delete"
                          onClick={event =>
                            this.handleDeleteClick(institution, i)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                    <tr
                      className="otherData hidden"
                      ref={element => this.tables.set(i, element)}
                    >
                      <td colSpan={4}>
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
        )}
      </div>
    )
  }
}

export default SearchResults
