import React from 'react'
import { Link } from 'react-router-dom'

import './SearchResults.css'

const renderAction = institution => {
  let pathname = '/update'
  let linkText = 'Update'

  if (institution.activityYear === 2017) {
    pathname = '/add'
    linkText = 'Add'
  }

  return (
    <Link to={{ pathname: pathname, state: { institution: institution } }}>
      {linkText}
    </Link>
  )
}

const SearchResults = props => {
  const { institutions, lei, taxId, respondentName } = props.data
  if (!institutions) return null

  if (institutions.length === 0) {
    return (
      <React.Fragment>
        <h2>No results found!</h2>
        <Link
          to={{
            pathname: '/add',
            state: {
              institution: {
                lei: lei,
                taxId: taxId,
                respondentName: respondentName,
                activityYear: '',
                agencyCode: '',
                institutionType: '',
                institutionId2017: '',
                RSSD: '',
                emailDomains: [],
                respondentState: '',
                respondentCity: '',
                parentIdRSSD: '',
                parentName: '',
                assets: '',
                otherLenderCode: '',
                topHolderIdRSSD: '',
                topHolderName: ''
              }
            }
          }}
        >
          Add
        </Link>
      </React.Fragment>
    )
  }

  return (
    <div className="SearchResults">
      <h2>Search results</h2>
      {institutions.map((institution, i) => {
        return (
          <React.Fragment key={i}>
            <dl>
              <dt>Respondent Name</dt>
              <dd>{institution.respondentName}</dd>
              <dt>Tax Id</dt>
              <dd>{institution.taxId}</dd>
              <dt>LEI</dt>
              <dd>{institution.lei}</dd>
              <dt>Action</dt>
              <dd>
                Result from {institution.activityYear} -{' '}
                {renderAction(institution)}
              </dd>
            </dl>
          </React.Fragment>
        )
      })}
    </div>
  )
}

export default SearchResults
