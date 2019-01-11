import React from 'react'

import InputText from '../InputText'
import InputSelect from '../InputSelect'
import InputRadio from '../InputRadio'

import { otherInputs } from '../constants/inputs'

const OtherFields = props => {
  return otherInputs.map(otherInput => {
    if (otherInput.type === 'select') {
      return (
        <InputSelect
          key={otherInput.id}
          label={otherInput.label}
          inputId={otherInput.id}
          options={otherInput.options}
          onChange={props.onInputChange}
          value={
            props.institution
              ? props.institution[otherInput.id]
              : otherInput.defaultValue
          }
        />
      )
    }
    if (otherInput.type === 'radio') {
      return (
        <InputRadio
          key={otherInput.id}
          label={otherInput.label}
          inputId={otherInput.id}
          options={otherInput.options}
          name={otherInput.name}
          onChange={props.onInputChange}
          value={
            props.institution
              ? props.institution[otherInput.id]
              : otherInput.defaultValue
          }
        />
      )
    }
    return (
      <InputText
        key={otherInput.id}
        label={otherInput.label}
        inputId={otherInput.id}
        placeholder={otherInput.placeholder}
        value={
          props.institution
            ? props.institution[otherInput.id]
            : otherInput.defaultValue
        }
        onChange={props.onInputChange}
      />
    )
  })
}

export default OtherFields
