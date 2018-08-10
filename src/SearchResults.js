import React from 'react'

import { Link } from 'react-router-dom'

const renderAction = institution => {
  let pathname = '/add'
  let linkText = 'Add'

  if (institution.year === '2018') {
    pathname = '/update'
    linkText = 'Update'
  }

  return (
    <Link to={{ pathname: pathname, state: { institution: institution } }}>
      {linkText}
    </Link>
  )
}

const SearchResults = props => {
  if (!props.institutions) return null
  return (
    <React.Fragment>
      <h1>Search results</h1>
      {props.institutions.map((institution, i) => {
        return (
          <React.Fragment key={i}>
            <dl>
              <dt>Name</dt>
              <dd>{institution.name}</dd>
              <dt>Tax Id</dt>
              <dd>{institution.taxId}</dd>
              <dt>LEI</dt>
              <dd>{institution.lei}</dd>
              <dt>Action</dt>
              <dd>
                Result from {institution.year} - {renderAction(institution)}
              </dd>
            </dl>
          </React.Fragment>
        )
      })}
    </React.Fragment>
  )
}

export default SearchResults
