import React, { Component } from 'react';
import '../styles/TextField.css';

class TextField extends Component {
  render() {
    return (
      <input
        className='TextField'
        type='text'
        placeholder={this.props.placeholder}
        onChange={this.changeHandler.bind(this)}
        onKeyDown={this.keyDownHandler.bind(this)}
      />
    );
  }

  changeHandler(e) {
    this.setState({
      value: e.target.value
    });
  }

  keyDownHandler(e) {
    if (e.keyCode == 13) {
      this.props.onEnter();
    }
  }
}

TextField.defaultProps = {
  placeholder: ''
};

export default TextField;
