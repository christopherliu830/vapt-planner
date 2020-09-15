import React, { useState } from 'react';
import { connect } from 'react-redux';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { resizeAction } from '../redux/actions';
import './ImageDisplay.css';

const ImageDisplay =  ({tool, furniture, scale}) => {
  const [zoom, setZoom] = useState(1);

  const handleMouseMove = e => {
    console.log(zoom);
    const ghost = document.querySelector('.ghost');
    if (!ghost || !furniture) return;
    ghost.style.left = `${e.clientX - furniture.img.width/2}px`;
    ghost.style.top = `${e.clientY - furniture.img.height/2}px`;
    ghost.style.transform = `scale(${scale*zoom},${scale*zoom})`
  }

  const handleScale = e => {
    setZoom(e.scale);
    handleMouseMove(e);
  }

  return (
    <div id="main-canvas" onMouseMove={handleMouseMove}>
      <TransformWrapper 
        pan={{disabled: tool!=='PAN'}}
        doubleClick={{disabled: true}}
        onZoomChange={handleScale}
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
  const {tool, furniture, scale} = state;
  return {
    tool: tool,
    furniture: furniture,
    scale: scale,
  };
};

export default connect(mapStateToProps)(ImageDisplay);
