import React from 'react'

import './InstitutionForm.css'

const OtherFieldsToggleButton = props => {
  const buttonText = props.showOtherFields ? 'Hide' : 'Show'
  return (
    <button
      className="toggleButton"
      type="button"
      onClick={props.toggleShowOtherFields}
    >
      {buttonText} other fields
    </button>
  )
}

export default OtherFieldsToggleButton
