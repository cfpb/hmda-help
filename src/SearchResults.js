import React from 'react'

import { Link } from 'react-router-dom'

const renderAction = institution => {
  if (Object.getOwnPropertyNames(institution).length === 0) {
    return <Link to={{ pathname: '/add' }}>Add</Link>
  }

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
  const { institutions } = props.results
  if (!institutions) return null

  if (institutions.length === 0) {
    const institution = {}
    return (
      <React.Fragment>
        <h1>No results found!</h1>
        {renderAction(institution)}
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      <h1>Search results</h1>
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
    </React.Fragment>
  )
}

export default SearchResults
