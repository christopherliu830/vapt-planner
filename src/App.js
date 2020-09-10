import React, { useState, useEffect } from 'react';
import './App.css';
import { FileSelector, ImageDisplay, Toolbar, FurniturePalette}  from './components';
import WallTool from './tools/WallTool';
import { connect } from 'react-redux';
import { updateCanvasAction, toolSelectedAction } from './redux/actions';
import { fabric } from 'fabric';

function App({updateCanvas, currentTool}) {
  const [canvas, setCanvas] = useState(new fabric.Canvas());

  useEffect(() => {
    const c = new fabric.Canvas('c', {backgroundColor: 'white', });
    setCanvas(c);
  }, []);

  useEffect(() => {
    if (canvas) {
      canvas.on('update', () => {
        console.log('canvas update');
        updateCanvas(canvas.toObject());
        canvas.renderAll.bind(canvas)();
      })
      canvas.renderAll();
    }
  }, [canvas, updateCanvas]);

  const getTool = () => {
    switch(currentTool) {
      case 'WALL':
        return <WallTool canvas={canvas}/>;
      default:
        return <React.Fragment/>;
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <FileSelector canvas={canvas}/>
      </header>
      <div className="App-main">
        <Toolbar/>
        <ImageDisplay canvas={canvas}/>
        <FurniturePalette/>
        {getTool()}
      </div>
      <footer>
        footer
      </footer>
    </div>
  );
}

const mapStateToProps = state => {
  const { tool } = state;
  return {
    currentTool : tool,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    updateCanvas: (obj) => dispatch(updateCanvasAction(obj)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
