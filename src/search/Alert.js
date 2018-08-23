import React from 'react'
import { Link } from 'react-router-dom'

const Alert = props => {
  return (
    <div className="alert">
      <h3>{props.heading}</h3>
      <p>{props.message}</p>
      <Link
        to={{
          pathname: '/add',
          state: {
            institution: {
              LEI: props.LEI,
              taxId: props.taxId,
              respondentName: props.respondentName
            }
          }
        }}
      >
        Add a new one
      </Link>
    </div>
  )
}

export default Alert
