import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './InputSelect.css'

class InputSelect extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: props.value || ''
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    })
    if (this.props.onChange) {
      this.props.onChange(event)
    }
  }

  render() {
    return (
      <React.Fragment>
        <label htmlFor={this.props.id}>{this.props.label}</label>
        <select
          ref={this.props.innerRef}
          name={this.props.name}
          id={this.props.id}
          onChange={this.handleChange}
          disabled={this.props.disabled}
          value={this.state.value}
        >
          {this.props.options.map((option, i) => {
            return (
              <option key={i} value={option.id}>
                {option.name}
              </option>
            )
          })}
        </select>
      </React.Fragment>
    )
  }
}

InputSelect.defaultProps = {
  disabled: false
}

InputSelect.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  options: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool
  ]),
  disabled: PropTypes.bool
}

export default React.forwardRef((props, ref) => {
  return <InputSelect innerRef={ref} {...props} />
})
