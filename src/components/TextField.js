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
      />
    );
  }

  changeHandler(e) {
    this.setState({
      value: e.target.value
    });
  }

  keyDownHandler(e) {
    if (e.keyCode===13 && this.state.value!=='') {
      this.props.onEnter();
    }
  }
}

TextField.defaultProps = {
  placeholder: '',
  readOnly: false
};

export default TextField;
