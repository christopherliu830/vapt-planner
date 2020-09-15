import React, { useState, useEffect } from 'react';
import { FileSelector, ImageDisplay, Toolbar, FurniturePalette}  from './components';
import WallTool from './tools/WallTool';
import FurnitureTool from './tools/FurnitureTool';
import { connect } from 'react-redux';
import { updateCanvasAction, toolSelectedAction } from './redux/actions';
import { fabric } from 'fabric';
import './App.css';

function App({updateCanvas, currentTool}) {
  const [canvas, setCanvas] = useState(new fabric.Canvas());

  useEffect(() => {
    const c = new fabric.Canvas('c', {backgroundColor: 'white', selection: false});
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
      case 'FURNITURE':
        return <FurnitureTool canvas={canvas}/>;
      default:
        return <React.Fragment/>;
    }
  }

  return (
    <div className="App d-flex flex-column h-100">
      <header className="App-header navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow-r">
        Select: <FileSelector canvas={canvas}/>
      </header>
      <div className="container-fluid p-0 h-100">
        <div className="row h-100 w-100 d-flex p-0 m-0">
          {/* <div class="palette col-lg-1 d-md-block bg-light sidebar shadow"> */}
          <div class="palette fixed-left shadow">
            <h3>Tools</h3>
            <Toolbar/>
          </div>
          <div class="col main align-self-stretch px-0" role="main">
            <ImageDisplay canvas={canvas}/>
          </div>
          {/* <div class="palette col-lg-1 d-md-block bg-light sidebar collapse shadow"> */}
          <div class="palette fixed-right p-0 m-0 shadow">
            <h3>Furniture</h3>
            <FurniturePalette/>
          </div>
          {getTool()}
        </div>
      </div>
      <footer className="footer my-0 py-0">
        <div className="container">
          <span class="text-muted">VirtualAPT</span>
        </div>
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
