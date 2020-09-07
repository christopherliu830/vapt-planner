import React from 'react';
import { connect } from 'react-redux';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import './ImageDisplay.css';

const ImageDisplay =  ({currentTool}) => {
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
