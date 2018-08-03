import React from 'react'

import InputText from './InputText'
import InputSubmit from './InputSubmit'

const SearchForm = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      <InputText label="LEI" id="lei" />
      <InputText label="Tax ID" id="taxId" />
      <InputText label="Name" id="name" />
      <InputSubmit actionType="search" />
    </form>
  )
}

export default SearchForm
