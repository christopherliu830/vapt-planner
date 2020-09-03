import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import './ImageDisplay.css';
import { toolSelectedAction } from '../redux/actions';
import { fabric } from 'fabric';

const ImageDisplay =  ({canvas, currentTool}) => {
  useEffect(() => { // Initialize canvas
    if (canvas) {
      canvas.add(new fabric.Rect({width: 10, height: 20, fill: '#f55', opacity: 0.7}));
      canvas.fire('update');
    }
  }, [canvas]); // canvas

  const handleClick = ({target, e}) => {
    console.log(`Click registered at ${e.layerX}, ${e.layerY}`)
  };

  return (
    <div id="main">
      <TransformWrapper 
        pan={{disabled: currentTool!=='PAN'}}
        doubleClick={{disabled: true}}
      >
        <TransformComponent>
          <canvas id="c"/>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
}

const mapStateToProps = state => {
  const {tool, canvasState} = state;
  return {
    currentTool: tool,
    canvasState: canvasState
  };
};

export default connect(mapStateToProps, null)(ImageDisplay);

