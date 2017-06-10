import React, { Component } from 'react';
import '../styles/Canvas.css';

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brushStroke: props.brushStroke,
      brushShade: props.brushShade
    };
  }

  render() {
    return (
      <canvas
        className='Canvas'
        ref={(canvas) => {this.canvas = canvas;}}
        width={500}
        height={500}
        onMouseDown={this.mouseDownHandler.bind(this)}
        onMouseUp={this.mouseUpHandler.bind(this)}
        onMouseMove={this.mouseMoveHandler.bind(this)}
        onMouseOut={this.mouseOutHandler.bind(this)}
      />
    );
  }

  // Event handlers

  mouseDownHandler(e) {
    this.shouldPaint = true;
		this.startPoint = this.positionFromEvent(e);
    this.paintMove(this.positionFromEvent(e));
  }

  mouseUpHandler(e) {
    this.shouldPaint = false;
  }

  mouseMoveHandler(e) {
    this.paintMove(this.positionFromEvent(e));
		this.startPoint = this.positionFromEvent(e);
  }

  mouseOutHandler(e) {
    this.shouldPaint = false;
  }

  // Painting

  paintMove({x, y}) {
    if (this.shouldPaint) {
      let {x: xs, y: ys} = this.startPoint;
      if (xs === x && ys === y) { // Paint at least 1 pixel
        x++;
        y++;
      }
      this.paintPath([this.startPoint, {x, y}]);
    }
  }

  paintPath(points) {
    if (Array.isArray(points) && points.length > 0) {
      const shade = this.state.brushShade;
      const context = this.canvas.getContext('2d');
      context.beginPath();
      context.strokeStyle = 'rgb('+shade+', '+shade+', '+shade+')';
      context.lineJoin = 'round';
      context.lineCap = 'round';
      context.lineWidth = this.state.brushStroke;
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
    return {
      x: (e.clientX - this.canvas.offsetLeft) / canvasWidth * this.canvas.width,
      y: (e.clientY - this.canvas.offsetTop) / canvasHeight * this.canvas.height
    }
  }

  // Public

  clear() {
    const context = this.canvas.getContext('2d');
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  getImageData() {
    const context = this.canvas.getContext('2d');
    const imageData = context.getImageData(0, 0, this.canvas.width, this.canvas.height).data;
    let mappedImageData = [];
    for (var i=0; i<(this.canvas.height); i++) {
      let row = [];
      for (var j=3; j<(this.canvas.width*4); j+=4) {
        row.push(imageData[j]);
      }
      mappedImageData.push(row);
    }
    return mappedImageData;
  }
}

export default Canvas;
