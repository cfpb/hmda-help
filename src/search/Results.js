import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './Results.css'

class SearchResults extends Component {
  constructor(props) {
    super(props)

    this.tables = new Map()
    this.buttons = new Map()

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(element, i) {
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

  // TODO: make this a component
  renderViewMore(key) {
    return (
      <button
        onClick={event => this.handleClick(event, key)}
        ref={element => this.buttons.set(key, element)}
      >
        Show other fields
      </button>
    )
  }

  // TODO: make this a component
  renderActions(institution) {
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

        {/*
          TODO: make this a component
        */}
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
                        {this.renderViewMore(i)}
                        {this.renderActions(institution)}
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
