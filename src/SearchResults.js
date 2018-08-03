import React from 'react'

const SearchResults = props => {
  if (!props.institutions) return null
  return (
    <React.Fragment>
      <h1>Search results</h1>
      {props.institutions.map((institution, i) => {
        return (
          <dl key={i}>
            <dt>Name</dt>
            <dd>{institution.name}</dd>
            <dt>Tax Id</dt>
            <dd>{institution.taxId}</dd>
            <dt>LEI</dt>
            <dd>{institution.lei}</dd>
          </dl>
        )
      })}
    </React.Fragment>
  )
}

export default SearchResults
