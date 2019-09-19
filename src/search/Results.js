import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ResultsHeading from './ResultsHeading'
import ResultsActions from './ResultsActions'

import './Results.css'

class SearchResults extends Component {
  constructor(props) {
    super(props)

    this.tables = new Map()
  }

  render() {
    if (!this.props.institutions) return null

    const { institutions, handleDeleteClick, error } = this.props
    institutions.sort((a, b) => (b.activityYear > a.activityYear) ? 1 : -1)


    return (
      <div className="SearchResults">
        <ResultsHeading institutions={institutions} />
        <table className="institutions">
          <thead>
            <tr>
              <th width="10%">Year</th>
              <th width="15%">LEI</th>
              <th width="15%">Name</th>
              <th width="15%">Email Domain(s)</th>
              <th width="15%">Tax ID</th>
              <th width="15%">Agency Code</th>
              <th width="15%" />
            </tr>
          </thead>
          <tbody>
            {institutions.map((institution, i) => {
//            {institutions.sort((a, b) => a.activityYear - b.activityYear).map((institution, i) => {
              if (!institution)
                return (
                  <React.Fragment key={i}>
                    <tr>
                    </tr>
                  </React.Fragment>
                )
              else
                return (
                  <React.Fragment key={i}>
                    <tr>
                      <td>{institution.activityYear}</td>
                      <td>{institution.lei}</td>
                      <td>{institution.respondentName}</td>
                      <td>{institution.emailDomains}</td>
                      <td>{institution.taxId}</td>
                      <td>{institution.agency}</td>
                      <ResultsActions
                        institution={institution}
                        index={i}
                        error={error}
                        handleDeleteClick={handleDeleteClick}
                        tables={this.tables}
                      />
                    </tr>
                    <tr
                      className="otherData hidden"
                      ref={element => this.tables.set(i, element)}
                    >
                      <td colSpan={6}>
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

SearchResults.propTypes = {
  institutions: PropTypes.array.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
  error: PropTypes.string
}
export default SearchResults
