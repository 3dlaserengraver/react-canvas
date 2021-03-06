import React, { Component } from 'react';
import '../styles/Canvas.css';

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textPoint: {x: this.props.imageSize/2, y: this.props.imageSize/2}
    };
  }

  render() {
    const style = typeof this.props.size==='undefined' ? null : {
      width: this.props.size,
      height: this.props.size
    };

    return (
      <div
        className='Canvas container'
        ref={(container) => {this.container = container;}}
      >
        <canvas
          style={style}
          tabIndex={1}
          className='canvas'
          ref={(canvas) => {this.canvas = canvas;}}
          width={this.props.imageSize}
          height={this.props.imageSize}
        />
        <canvas
          style={style}
          tabIndex={2}
          className='canvas'
          ref={(textCanvas) => {this.textCanvas = textCanvas;}}
          width={this.props.imageSize}
          height={this.props.imageSize}
          onMouseDown={this.mouseDownHandler.bind(this)}
          onMouseUp={this.mouseUpHandler.bind(this)}
          onMouseMove={this.mouseMoveHandler.bind(this)}
          onMouseOut={this.mouseUpHandler.bind(this)}
          onTouchStart={this.mouseDownHandler.bind(this)}
          onTouchEnd={this.mouseUpHandler.bind(this)}
          onTouchMove={this.touchMoveHandler.bind(this)}
        />
      </div>
    );
  }

  componentDidUpdate(prevProps, prevState) {
    this.paintText();
  }

  // Event handlers

  touchMoveHandler(e) {
    e.preventDefault();
    this.mouseMoveHandler(e);
  }

  mouseDownHandler(e) {
    this.shouldPaint = true;
    this.startPoint = this.positionFromEvent(e);
    if(this.props.textEnabled) {
      this.paintText();
    } else {
      this.paintMove(this.positionFromEvent(e));
    }
  }

  mouseUpHandler(e) {
    this.shouldPaint = false;
  }

  mouseMoveHandler(e) {
    if (!this.shouldPaint) return;
    if (this.props.textEnabled) {
      this.textMove(this.positionFromEvent(e));
      this.startPoint = this.positionFromEvent(e);
    } else {
      this.paintMove(this.positionFromEvent(e));
  		this.startPoint = this.positionFromEvent(e);
    }
  }

  // Painting

  shadeRgb() {
    const shade = this.props.brushShade;
    return 'rgb('+shade+', '+shade+', '+shade+')';
  }

  paintText(commit=false) {
    const context = commit ? this.canvas.getContext('2d') : this.textCanvas.getContext('2d');
    if (commit) this.setState({
      textPoint: {x: this.props.imageSize/2, y: this.props.imageSize/2}
    });
    this.clearText();
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.font = (this.props.brushStroke+5)+'px Arial';
    context.fillStyle = this.shadeRgb();
    context.fillText(this.props.text, this.state.textPoint.x, this.state.textPoint.y);
  }

  textMove({x, y}) {
    let move = {x: x-this.startPoint.x, y: y-this.startPoint.y};
    this.setState({
      textPoint: {x: this.state.textPoint.x+move.x, y: this.state.textPoint.y+move.y}
    });
  }

  paintMove({x, y}) {
    if (x===this.startPoint.x && y===this.startPoint.y) { // Paint at least 1 pixel
      x++;
      y++;
    }
    this.paintPath([this.startPoint, {x, y}]);
  }

  paintPath(points) {
    if (Array.isArray(points) && points.length > 0) {
      const context = this.canvas.getContext('2d');
      context.beginPath();
      context.strokeStyle = this.shadeRgb();
      context.lineJoin = 'round';
      context.lineCap = 'round';
      context.lineWidth = this.props.brushStroke;
      context.moveTo(points[0].x, points[0].y);
      for (var i = 0; i < points.length; i++) {
        context.lineTo(points[i].x, points[i].y);
      }
      context.closePath();
      context.stroke();
    }
  }

  positionFromEvent(e) {
    const canvasWidth = this.canvas.clientWidth;
    const canvasHeight = this.canvas.clientHeight;
    const clientCoordinates = {
      x: typeof e.clientX!=='undefined' ? e.clientX : e.touches[0].clientX,
      y: typeof e.clientY!=='undefined' ? e.clientY : e.touches[0].clientY
    }
    return {
      x: (clientCoordinates.x - this.canvas.offsetLeft) / canvasWidth * this.canvas.width,
      y: (clientCoordinates.y - this.container.offsetTop) / canvasHeight * this.canvas.height
    }
  }

  // Public

  clear() {
    const context = this.canvas.getContext('2d');
    context.fillStyle = 'white';
    context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  clearText() {
    const context = this.textCanvas.getContext('2d');
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  getImageData() {
    const context = this.canvas.getContext('2d');
    const imageData = context.getImageData(0, 0, this.canvas.width, this.canvas.height).data;
    let mappedImageData = [];
    for (var i=0; i<(this.canvas.height); i++) {
      let row = [];
      for (var j=2; j<(this.canvas.width*4); j+=4) {
        row.push(255-imageData[i*this.canvas.width*4+j]); // RGB value must be inverted for power
      }
      mappedImageData.push(row);
    }
    return mappedImageData;
  }
}

export default Canvas;
