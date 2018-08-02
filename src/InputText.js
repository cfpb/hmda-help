import React, { Component } from 'react'
import PropTypes from 'prop-types'

class InputText extends Component {
  constructor(props) {
    super(props)
    this.state = { value: props.defaultValue }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    })
  }

  render() {
    return (
      <React.Fragment>
        <label>{this.props.label}</label>
        <input
          type="text"
          name={this.props.id}
          id={this.props.id}
          value={this.state.value}
          onChange={this.handleChange}
        />
      </React.Fragment>
    )
  }
}

InputText.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  defaultValue: PropTypes.string
}

InputText.defaultProps = {
  defaultValue: ''
}

export default InputText
