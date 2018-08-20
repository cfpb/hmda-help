import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './SearchResults.css'

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
      button.innerHTML = 'View all data'
    } else {
      button.innerHTML = 'Hide data'
    }
  }

  renderSearchHeading(numOfResults) {
    let results = numOfResults === 1 ? 'result' : 'results'

    if (numOfResults === 0) return <h2>Sorry, no results were found.</h2>

    return (
      <h2>
        {numOfResults} {results} found
      </h2>
    )
  }

  renderViewMore(key) {
    return (
      <button
        onClick={event => this.handleClick(event, key)}
        ref={element => this.buttons.set(key, element)}
      >
        View all data
      </button>
    )
  }

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
    const { institutions, LEI, taxId, respondentName } = this.props.data
    if (!institutions) return null

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
                    respondent: {
                      name: respondentName
                    }
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
                        {institution.respondent.name}
                        <br />
                        <span>{institution.LEI}</span>
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
                                {institution.respondent.city},{' '}
                                {institution.respondent.state}
                              </td>
                              <td>
                                {institution.parent.name}
                                <br />
                                <span>{institution.parent.idRssd}</span>
                              </td>
                              <td>{institution.assets}</td>
                              <td>{institution.otherLenderCode}</td>
                              <td>
                                {institution.topHolder.name}
                                <br />
                                <span>{institution.topHolder.idRssd}</span>
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
