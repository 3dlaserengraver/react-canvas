import React, { Component } from 'react';
import '../styles/Tool.css';

class Tool extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false
    };
  }

  render() {
    let className = 'Tool';
    if (this.props.small) className += ' small';
    if (this.props.active) className += ' active';
    if (this.props.hoverable) className += ' hoverable';
    if (this.state.hover) className += ' hover';

    return (
      <div
        className={className}
        onClick={this.props.onClick}
        onMouseEnter={this.handleMouseEnter.bind(this)}
        onMouseLeave={this.handleMouseLeave.bind(this)}
      >
        {this.props.children}
      </div>
    );
  }

  handleMouseEnter(e) {
    this.setState({
      hover: true
    });
  }

  handleMouseLeave(e) {
    this.setState({
      hover: false
    });
  }
}

Tool.defaultProps = {
  small: false,
  hoverable: true
}

export default Tool;
