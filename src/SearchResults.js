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
  const { institutions, name, taxId, lei } = props.results
  if (!institutions) return null

  if (institutions.length === 0) {
    const institution = { lei: lei, name: name, taxId: taxId }
    return (
      <React.Fragment>
        <h1>No results found!</h1>
        <Link to={{ pathname: '/add', state: { institution: institution } }}>
          Add
        </Link>
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
