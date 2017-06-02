import React, { Component } from 'react';
import '../styles/App.css';
import Canvas from './Canvas'
import Toolbar from './Toolbar'
import Tool from './Tool'

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Toolbar>
          <Tool key='size' />
          <Tool key='shade' />
        </Toolbar>
        <Canvas />
      </div>
    );
  }
}

export default App;
