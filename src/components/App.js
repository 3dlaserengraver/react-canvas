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
          <Tool small={true}>
            <Icon icon='trash' />
          </Tool>
          <Slider />
          <Slider />
        </Toolbar>
        <Canvas />
      </div>
    );
  }
}

export default App;
