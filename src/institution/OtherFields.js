import React from 'react'

import InputText from '../InputText'

import { otherInputs } from '../constants/inputs'

const OtherFields = props => {
  return otherInputs.map(textInput => {
    return (
      <InputText
        key={textInput.id}
        label={textInput.label}
        inputId={textInput.id}
        placeholder={textInput.placeholder}
        value={
          props.institution
            ? props.institution[textInput.id]
            : textInput.defaultValue
        }
        disabled={false}
        onChange={props.onInputChange}
      />
    )
  })
}

export default OtherFields
