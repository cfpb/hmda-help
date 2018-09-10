import React from 'react'
import { Link } from 'react-router-dom'

const Success = props => {
  return (
    <React.Fragment>
      <h3>
        {props.LEI} {props.action}
      </h3>
      <p>
        <button className="backToUpdate" onClick={props.backToUpdate}>
          Update this institution
        </button>
      </p>
      <p>
        <Link to="/">Search for a new institution</Link>
      </p>
    </React.Fragment>
  )
}

export default Success
