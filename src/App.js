import React, { useState, useEffect } from 'react';
import './App.css';
import { FileSelector, ImageDisplay, Toolbar, FurniturePalette}  from './components';
import WallTool from './tools/WallTool';
import FurnitureTool from './tools/FurnitureTool';
import { connect } from 'react-redux';
import { updateCanvasAction, toolSelectedAction } from './redux/actions';
import { fabric } from 'fabric';

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
      <header className="App-header navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        Select: <FileSelector canvas={canvas}/>
      </header>
      <div className="container-fluid pb-0 h-100" style={{overflow:"hidden"}}>
        <div className="row h-100">
          <div class="palette col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
            <h3>Tools</h3>
            <Toolbar/>
          </div>
          <div class="col-md-6 col-lg-8 px-0" role="main">
            <ImageDisplay canvas={canvas}/>
          </div>
          <div class="palette col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
            <h3>Furniture</h3>
            <FurniturePalette/>
          </div>
          {getTool()}
        </div>
      </div>
      <footer className="footer my-0 py-0">
        <div className="container">
          footer
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
