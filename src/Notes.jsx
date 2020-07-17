import React from 'react'
import InputText from './InputText'
import { notesInput } from './constants/inputs'
import { PropTypes } from 'prop-types'

const Notes = props => {
  const { notes, onBlur, onChange, prevNotes, required } = props

  if (required)
    return (
      <InputText
        key={notesInput.id}
        value={notes || ''}
        {...notesInput}
        onChange={onChange}
        onBlur={onBlur}
      />
    )

  return (
    <InputText
      key={notesInput.id}
      {...notesInput}
      disabled={true}
      value={prevNotes || ''}
    />
  )
}

Notes.propTypes = {
  notes: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  prevNotes: PropTypes.string,
  required: PropTypes.bool
}

export default Notes
