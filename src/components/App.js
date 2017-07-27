import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import '../styles/App.css';
import Canvas from './Canvas';
import Toolbar from './Toolbar';
import Tool from './Tool';
import Slider from './Slider';
import Icon from './Icon';
import TextField from './TextField';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textEnabled: false,
      consoleEnabled: false,
      brushStroke: 1,
      brushShade: 0,
      canvasSize: undefined,
      text: ''
    };
  }

  render() {
    const consoleToolbar = this.state.consoleEnabled ? (
      <Toolbar>
        <TextField
          placeholder='Enter G-code'
          onEnter={this.send.bind(this)}
          ref={(consoleTextField) => {this.consoleTextField = consoleTextField;}}
        />
        <TextField
          placeholder='Server Response'
          autoFocus={false}
          readOnly={true}
          ref={(consoleResponseTextField) => {this.consoleResponseTextField = consoleResponseTextField;}}
        />
      </Toolbar>
    ) : null;

    const textToolbar = this.state.textEnabled ? (
      <Toolbar>
        <TextField
          placeholder='Enter Text'
          onChange={this.changeText.bind(this)}
        />
      </Toolbar>
    ) : null;

    return (
      <div className='App'>
        <Toolbar>
          <div className='group small'>
            <Tool
              onClick={this.clear.bind(this)}
            >
              <Icon icon='trash' />
            </Tool>
            <Tool
              onClick={this.upload.bind(this)}
            >
              <Icon icon='upload' />
            </Tool>
            <Tool
              onClick={this.toggleTextEntry.bind(this)}
              active={this.state.textEnabled}
              ref={(toggleTextEntryTool) => {this.toggleTextEntryTool = toggleTextEntryTool;}}
            >
              <Icon icon='font' />
            </Tool>
            <Tool
              onClick={this.toggleConsole.bind(this)}
              active={this.state.consoleEnabled}
              ref={(toggleConsoleTool) => {this.toggleConsoleTool = toggleConsoleTool;}}
            >
              <Icon icon='console' />
            </Tool>
          </div>
          <div className='group'>
            <Slider
              min={1}
              max={100}
              onChange={this.strokeChange.bind(this)}
              ref={(slider) => {this.strokeSlider = slider;}}
            />
          </div>
          <div className='group'>
            <Slider
              min={0}
              max={255}
              onChange={this.shadeChange.bind(this)}
              ref={(slider) => {this.shadeSlider = slider;}}
            />
          </div>
        </Toolbar>
        {consoleToolbar}
        {textToolbar}
        <Canvas
          size={this.state.canvasSize}
          imageSize={500}
          brushStroke={this.state.brushStroke}
          brushShade={this.state.brushShade}
          textEnabled={this.state.textEnabled}
          text={this.state.text}
          ref={(canvas) => {this.canvas = canvas;}}
        />
      </div>
    );
  }

  componentDidMount() {
    console.log('mounted');
    const canvas = ReactDOM.findDOMNode(this.canvas);
    const canvasSize = Math.min(canvas.clientHeight, canvas.clientWidth);
    this.setState({
      canvasSize: canvasSize
    });
    this.clear();
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize.bind(this));
  }

  handleResize() {
    console.log('resize');
    const canvas = ReactDOM.findDOMNode(this.canvas);
    const canvasSize = Math.min(canvas.clientHeight, canvas.clientWidth);
    this.setState({
      canvasSize: canvasSize
    });
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

  send(gcode) {
    console.log('upload gcode '+gcode);
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
          return response.text();
        } else {
          throw new Error('Request failed with status: '+response.status);
        }
      })
      .then(data => {
        this.consoleTextField.setState({
          value: ''
        });
        this.consoleResponseTextField.setState({
          value: data
        });
        console.log(data);
      })
      .catch(error => {
        this.consoleResponseTextField.setState({
          value: error.message
        });
        console.log(error);
      });
  }

  changeText(text) {
    console.log('change text to: '+text);
    this.setState({
      text: text
    });
  }

  clear() {
    console.log('clear canvas');
    this.canvas.clear();
  }

  toggleTextEntry() {
    console.log(this.state.textEnabled ? 'text disabled' : 'text enabled');
    if (this.state.textEnabled) {
      this.canvas.paintText(true); // Commit text to main canvas
    }
    if (this.state.consoleEnabled && !this.state.textEnabled) this.toggleConsole();
    this.setState({
      textEnabled: !this.state.textEnabled,
      text: ''
    }, () => {
      this.handleResize();
    });
  }

  toggleConsole() {
    if (this.state.textEnabled && !this.state.consoleEnabled) this.toggleTextEntry();
    this.setState({
      consoleEnabled: !this.state.consoleEnabled
    }, () => {
      this.handleResize();
    });
  }

  strokeChange(value) {
    console.log('stroke changed to '+value);
    this.setState({
      brushStroke: value
    });
  }

  shadeChange(value) {
    console.log('shade changed to '+value);
    this.setState({
      brushShade: value
    });
  }
}

export default App;
