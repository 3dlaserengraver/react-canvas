import React, { Component } from 'react';
import '../styles/Tool.css';

class Tool extends Component {
  render() {
    const style = this.props.small ? {
      flexGrow: 0
    } : null;
    return (
      <div
        className='Tool'
        style={style}
        onClick={this.props.onClick}
      >
        {this.props.children}
      </div>
    );
  }
}

Tool.defaultProps = {
  small: false
}

export default Tool;
