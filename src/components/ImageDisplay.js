import React, { useState } from 'react';
import { connect } from 'react-redux';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import './ImageDisplay.css';

const ImageDisplay =  ({tool, furniture}) => {
  const [pos, setXY] = useState({x: -1, y: -1});

  const handleMouseMove = e => {
    const ghost = document.querySelector('.ghost');
    if (!ghost || !furniture) return;
    ghost.style.left = `${e.clientX}px`;
    ghost.style.top = `${e.clientY}px`;
  }

  return (
    <div id="main-canvas" onMouseMove={handleMouseMove}>
      <TransformWrapper 
        pan={{disabled: tool!=='PAN'}}
        doubleClick={{disabled: true}}
      >
        <TransformComponent>
          <canvas id="c"/>
        </TransformComponent>
        {furniture && <img className="ghost" src={furniture.img}/>}
      </TransformWrapper>
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
