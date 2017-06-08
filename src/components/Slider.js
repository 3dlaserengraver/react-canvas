import React, { Component } from 'react';
import RcSlider from 'rc-slider';
import 'rc-slider/assets/index.css';
import '../styles/Slider.css';
import Tool from './Tool';

class Slider extends Component {
  render() {
    return (
      <Tool hoverable={false}>
        <RcSlider
          maximumTrackStyle={{
            backgroundColor: '#bbb',
            height: 10,
            marginTop: -3,
          }}
          minimumTrackStyle={{
            backgroundColor: '#eee',
            height: 10,
            marginTop: -3,
          }}
          handleStyle={{
            backgroundColor: '#000',
            border: 0,
            height: 28,
            width: 28,
            marginLeft: -14,
            marginTop: -12
          }}
        />
      </Tool>
    );
  }
}

export default Slider;
