import React from 'react'
import Message from './Message'

export const RegenerateButton = ({ onClick, error, message }) => (
  <>
    <a
      onClick={onClick}
      className="inputSubmit"
      role="button"
      style={{ margin: '0 auto' }}
    >
      Regenerate
    </a>
    <Message isError={error} message={message} />
  </>
)
