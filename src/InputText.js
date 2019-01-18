import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { validateInput } from './utils/validate'

class InputText extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: props.value || '',
      error: null
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    })
    if (this.props.onChange) {
      this.props.onChange(event)
    }
  }

  handleBlur(event) {
    if (this.props.validation) {
      this.setState({
        error: validateInput(this.props.validation, event.target.value)
      })
    }
    if (this.props.onBlur) {
      this.props.onBlur()
    }
  }

  render() {
    return (
      <React.Fragment>
        <label>{this.props.label}</label>
        {this.state.error ? this.state.error : null}
        <input
          ref={this.props.innerRef}
          type="text"
          name={this.props.id}
          id={this.props.id}
          placeholder={this.props.placeholder}
          value={this.state.value}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          disabled={this.props.disabled}
          maxLength={this.props.maxLength || ''}
          size={this.props.maxLength || 75}
        />
      </React.Fragment>
    )
  }
}

InputText.defaultProps = {
  disabled: false
}

InputText.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  validation: PropTypes.array
}

export default React.forwardRef((props, ref) => {
  return <InputText innerRef={ref} {...props} />
})
