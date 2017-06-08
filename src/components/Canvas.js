import React, { Component } from 'react';
import '../styles/Canvas.css';

class Canvas extends Component {
  render() {
    if (typeof(this.context) !== 'undefined' && typeof(this.canvas) !== 'undefined') {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    return (
      <canvas
        className='Canvas'
        ref={
          (canvas) => {
            if (canvas === null) return;
            this.canvas = canvas;
            this.context = canvas.getContext('2d');
          }
        }
        width={500}
        height={500}
        onMouseDown={this.mouseDownHandler.bind(this)}
        onMouseUp={this.mouseUpHandler.bind(this)}
        onMouseMove={this.mouseMoveHandler.bind(this)}
        onMouseOut={this.mouseOutHandler.bind(this)}
      />
    );
  }

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
      this.context.beginPath();
      this.context.strokeStyle = 'rgb(0, 0, 0)';
      this.context.lineJoin = 'round';
      this.context.lineCap = 'round';
      this.context.lineWidth = 10;
      this.context.moveTo(points[0].x, points[0].y);
      for (var i = 0; i < points.length; i++) {
        this.context.lineTo(points[i].x, points[i].y);
      }

      this.context.closePath();
      this.context.stroke();
    }
  }

  positionFromEvent(e) {
    let canvasWidth = this.canvas.clientWidth;
    let canvasHeight = this.canvas.clientHeight;
    return {
      x: (e.clientX - this.canvas.offsetLeft) / canvasWidth * this.canvas.width,
      y: (e.clientY - this.canvas.offsetTop) / canvasHeight * this.canvas.height
    }
  }
}

export default Canvas;
