import React from 'react'

const renderAction = year => {
  if (year === '2018') {
    return 'Update'
  }

  return 'Add'
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
                Result from {institution.year} -{' '}
                {renderAction(institution.year)}
              </dd>
            </dl>
          </React.Fragment>
        )
      })}
    </React.Fragment>
  )
}

export default SearchResults
