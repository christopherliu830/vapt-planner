import React, { useState } from 'react';
import { connect } from 'react-redux';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import './ImageDisplay.css';

const ImageDisplay =  ({tool, furniture}) => {
  const [pos, setXY] = useState({x: -1, y: -1});
  const handleMouseMove = e => setXY({x: e.clientX, y: e.clientY}); 
  return (
    <div id="main-canvas" onMouseMove={handleMouseMove}>
      <TransformWrapper 
        pan={{disabled: tool!=='PAN'}}
        doubleClick={{disabled: true}}
      >
        <TransformComponent>
          <canvas id="c"/>
        </TransformComponent>
      </TransformWrapper>
      {furniture && <img className="ghost" style={{transform: `translate(${pos.x}px, ${pos.y}px)`}} src={furniture.img}/>}
    </div>
  );
}

const mapStateToProps = state => {
  const {tool, furniture} = state;
  return {
    tool: tool,
    furniture: furniture,
  };
};

export default connect(mapStateToProps, null)(ImageDisplay);
