import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './InputRadio.css'

class InputRadio extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: props.value || null
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
        <label>{this.props.label}</label>
        <ul className="unstyled-list">
          {this.props.options.map((option, i) => {
            return (
              <li key={i}>
                <input
                  type="radio"
                  id={`radio${i}`}
                  name={this.props.id}
                  value={option.id}
                  onChange={this.handleChange}
                  checked={
                    parseInt(this.state.value, 10) === parseInt(option.id, 10)
                      ? true
                      : false
                  }
                />
                <label htmlFor={`radio${i}`}>
                  {option.id} - {option.name}
                </label>
              </li>
            )
          })}
        </ul>
      </React.Fragment>
    )
  }
}

InputRadio.defaultProps = {
  disabled: false
}

InputRadio.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  options: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool
}

export default React.forwardRef((props, ref) => {
  return <InputRadio innerRef={ref} {...props} />
})
