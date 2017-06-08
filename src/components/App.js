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
          <Slider />
          <Slider />
        </Toolbar>
        <Canvas />
      </div>
    );
  }

  upload() {
    const options = {
      method: 'POST',
      body: 'asdf'
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
    this.forceUpdate();
  }
}

export default App;
