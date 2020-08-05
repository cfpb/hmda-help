import React from 'react'
import Message from './Message'

export const RegenerateButton = ({ onClick, error, message }) => (
  <>
    <span
      onClick={onClick}
      className="inputSubmit"
      style={{ margin: '0 auto' }}
    >
      Regenerate
    </span>
    <Message isError={error} message={message} />
  </>
)
