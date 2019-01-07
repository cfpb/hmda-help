import React, { Component } from 'react'

class TextInput extends Component {
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
  }

  render() {
    return (
      <React.Fragment>
        <label>{this.props.label}</label>
        <input
          ref={this.props.innerRef}
          type="text"
          name={this.props.inputId}
          id={this.props.inputId}
          placeholder={this.props.placeholder}
          value={this.state.value}
          onChange={this.handleChange}
          disabled={this.props.disabled || false}
        />
      </React.Fragment>
    )
  }
}

export default React.forwardRef((props, ref) => {
  return <TextInput innerRef={ref} {...props} />
})
