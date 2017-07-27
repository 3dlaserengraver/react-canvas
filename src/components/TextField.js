import React, { Component } from 'react';
import '../styles/TextField.css';

class TextField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  render() {
    return (
      <input
        className='TextField'
        type='text'
        value={this.state.value}
        placeholder={this.props.placeholder}
        onChange={this.changeHandler.bind(this)}
        onKeyDown={this.keyDownHandler.bind(this)}
        readOnly={this.props.readOnly}
        autoFocus={this.props.autoFocus}
      />
    );
  }

  changeHandler(e) {
    const value = e.target.value;
    console.log('tf change');
    this.setState({
      value: value
    }, () => {
      if (typeof this.props.onChange !== 'undefined') this.props.onChange(this.state.value);
    });
  }

  keyDownHandler(e) {
    if (e.keyCode===13) {
      if (typeof this.props.onEnter !== 'undefined') this.props.onEnter(this.state.value);
    }
  }
}

TextField.defaultProps = {
  placeholder: '',
  readOnly: false,
  autoFocus: true
};

export default TextField;
