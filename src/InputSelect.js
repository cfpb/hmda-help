import React, { Component } from 'react'

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
        <label>{this.props.label}</label>
        <select
          ref={this.props.innerRef}
          name={this.props.inputId}
          id={this.props.inputId}
          onChange={this.handleChange}
          disabled={this.props.disabled || false}
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

export default React.forwardRef((props, ref) => {
  return <InputSelect innerRef={ref} {...props} />
})
