import React from 'react'

import './Alert.css'

const Alert = props => {
  const type = props.type || 'info'
  let alertClass = `alert alert-${type}`

  return (
    <div className={alertClass}>
      <div className="alert-body">
        <h3 className="alert-heading">{props.heading}</h3>
        <p className="alert-text">{props.message}</p>
        {props.children}
      </div>
    </div>
  )
}

export default Alert
