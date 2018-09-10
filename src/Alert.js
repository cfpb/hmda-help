import React from 'react'

import './Alert.css'

const Alert = props => {
  let alertClass = `alert alert-${props.type}`
  if (props.smallWidth) alertClass = alertClass.concat(' alert-paragraph')
  return (
    <div className={alertClass}>
      <div className="alert-body">
        <h3 className="alert-heading">{props.heading}</h3>
        <p className="alert-text">{props.text}</p>
      </div>
    </div>
  )
}

export default Alert
