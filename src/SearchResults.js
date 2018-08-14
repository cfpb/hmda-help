import React from 'react'
import { Link } from 'react-router-dom'

import './SearchResults.css'

const renderAction = institution => {
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
      <p>
        Because this result is from the {institution.activityYear} dataset an{' '}
        {link.type} is required.
      </p>
      <Link
        to={{ pathname: link.pathname, state: { institution: institution } }}
      >
        {link.text} {institution.respondentName}{' '}
        {link.type === 'addition' ? 'to the' : 'in the'} current year dataset.
      </Link>
    </React.Fragment>
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
          <dl key={i}>
            <dt>Respondent Name</dt>
            <dd>{institution.respondentName}</dd>
            <dt>Tax Id</dt>
            <dd>{institution.taxId}</dd>
            <dt>LEI</dt>
            <dd>{institution.lei}</dd>
            <dt>Action</dt>
            <dd className="action">{renderAction(institution)}</dd>
          </dl>
        )
      })}
    </div>
  )
}

export default SearchResults
