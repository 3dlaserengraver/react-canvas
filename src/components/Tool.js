import React, { Component } from 'react';
import '../styles/Tool.css';

class Tool extends Component {
  render() {
    let className = 'Tool';
    if (this.props.small) className += ' small';
    if (this.props.hoverable) className += ' hoverable';

    return (
      <div
        className={className}
        onClick={this.props.onClick}
      >
        {this.props.children}
      </div>
    );
  }
}

Tool.defaultProps = {
  small: false,
  hoverable: true
}

export default Tool;
