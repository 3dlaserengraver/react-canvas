import React, { Component } from 'react';
import '../styles/App.css';
import Canvas from './Canvas';
import Toolbar from './Toolbar';
import Tool from './Tool';
import Slider from './Slider';
import Icon from './Icon';
import TextField from './TextField';

class App extends Component {
  render() {
    const consoleToolbar = this.toggleConsoleTool!==undefined && this.toggleConsoleTool.state.active ? (
      <Toolbar>
        <TextField
          placeholder='Enter G-code'
          onEnter={this.send.bind(this)}
          ref={(consoleTextField) => {this.consoleTextField = consoleTextField;}}
        />
      </Toolbar>
    ) : null;

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
          <Tool
            small={true}
            onClick={this.toggleTextEntry.bind(this)}
            ref={(toggleTextEntryTool) => {this.toggleTextEntryTool = toggleTextEntryTool;}}
          >
            <Icon icon='font' />
          </Tool>
          <Tool
            small={true}
            onClick={this.toggleConsole.bind(this)}
            ref={(toggleConsoleTool) => {this.toggleConsoleTool = toggleConsoleTool;}}
          >
            <Icon icon='console' />
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
        {consoleToolbar}
        <Canvas
          brushStroke={1}
          brushShade={0}
          textEntry={false}
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
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        bitmap: imageData
      })
    };
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

  send() {
    console.log('upload gcode');
    const gcode = this.consoleTextField.state.value;
    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        gcode: gcode
      })
    };
    fetch('send', options)
      .then(response => {
        if (response.ok) {
          return response.blob();
        } else {
          throw new Error('Request failed with status: '+response.status);
        }
      })
      .then(blob => {
        this.consoleTextField.setState({
          value: ''
        });
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

  toggleTextEntry() {
    this.toggleTextEntryTool.setState({
      active: !this.toggleTextEntryTool.state.active
    }, () => {
      console.log(this.toggleTextEntryTool.state.active ? 'text entry enabled' : 'text entry disabled');
      this.canvas.setState({
        textEntry: this.toggleTextEntryTool.state.active
      });
    });
  }

  toggleConsole() {
    this.toggleConsoleTool.setState({
      active: !this.toggleConsoleTool.state.active
    }, () => {
      console.log(this.toggleConsoleTool.state.active ? 'console enabled' : 'console disabled');
      this.forceUpdate();
    });
  }

  strokeChange(value) {
    console.log('stroke changed to '+value);
    this.canvas.setState({
      brushStroke: value
    });
  }

  shadeChange(value) {
    console.log('shade changed to '+value);
    this.canvas.setState({
      brushShade: value
    });
  }
}

export default App;
