import React, { useState } from 'react';
import { connect } from 'react-redux';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import './ImageDisplay.css';

const ImageDisplay =  ({tool, furniture}) => {
  const [pos, setXY] = useState({x: -1, y: -1});

  const handleMouseMove = e => {
    const ghost = document.querySelector('.ghost');
    if (!ghost || !furniture) return;
    ghost.style.left = `${e.clientX - furniture.img.width/2}px`;
    ghost.style.top = `${e.clientY - furniture.img.height/2}px`;
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
        {furniture && <img className="ghost" src={furniture.src}/>}
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
