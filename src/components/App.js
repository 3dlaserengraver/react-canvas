import React, { Component } from 'react';
import '../styles/App.css';
import Canvas from './Canvas';
import Toolbar from './Toolbar';
import Tool from './Tool';
import Slider from './Slider';
import Icon from './Icon';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Toolbar>
          <Tool
            small={true}
            onClick={this.clear.bind(this)}
          >
            <Icon icon='trash' />
          </Tool>
          <Tool
            small={true}
            onClick={this.upload.bind(this)}
          >
            <Icon icon='upload' />
          </Tool>
          <Slider
            min={1}
            max={100}
            onChange={this.strokeChange.bind(this)}
            ref={(slider) => {this.strokeSlider = slider;}}
          />
          <Slider
            min={0}
            max={255}
            onChange={this.shadeChange.bind(this)}
            ref={(slider) => {this.shadeSlider = slider;}}
          />
        </Toolbar>
        <Canvas
          brushStroke={1}
          brushShade={0}
          ref={(canvas) => {this.canvas = canvas;}}
        />
      </div>
    );
  }

  upload() {
    console.log('upload bitmap');
    const imageData = this.canvas.getImageData();
    const options = {
      method: 'POST',
      body: JSON.stringify(imageData)
    }
    fetch('upload', options)
      .then(response => {
        if (response.ok) {
          return response.blob();
        } else {
          throw new Error('Request failed with status: '+response.status);
        }
      })
      .then(blob => {
        console.log(blob);
      })
      .catch(error => {
        console.log(error);
      });
  }

  clear() {
    console.log('clear canvas');
    this.canvas.clear();
  }

  strokeChange(value) {
    console.log('stroke changed to '+value);
    this.canvas.setState({
      brushStroke: value
    })
  }

  shadeChange(value) {
    console.log('shade changed to '+value);
    this.canvas.setState({
      brushShade: value
    })
  }
}

export default App;
