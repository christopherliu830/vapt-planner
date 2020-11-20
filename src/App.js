import React, { useState, useEffect } from 'react';
import { ExportButton, FileSelector, ImageDisplay, Toolbar, FurniturePalette, ScaleUpdater}  from './components';
import WallTool from './tools/WallTool';
import FurnitureTool from './tools/FurnitureTool';
import EditTool from './tools/EditTool';
import { connect } from 'react-redux';
import { updateCanvasAction} from './redux/actions';
import { fabric } from 'fabric';
import './App.css';
import { useCanvas } from './hooks/with-canvas';

function App({updateCanvas, currentTool}) {
  const canvas = useCanvas();

  useEffect(() => {
    console.log(canvas);
  }, [canvas]);

  const getTool = () => {
    switch(currentTool) {
      case 'WALL':
        return <WallTool canvas={canvas}/>;
      case 'FURNITURE':
        return <FurnitureTool canvas={canvas}/>;
      case 'SELECT':
        return <EditTool canvas={canvas}/>;
      default:
        return <React.Fragment/>;
    }
  }

  return (
    <div className="App d-flex flex-column h-100">
      <header className="App-header navbar navbar-dark h-1 sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <span>  Select: <FileSelector canvas={canvas}/> Scale: <ScaleUpdater canvas={canvas}/> </span>
        <ExportButton/>
      </header>
      <div className="main p-0">
        <div>
          <h3>Tools</h3>
          <Toolbar/>
        </div>
        <div className="flex-grow-1">
          <ImageDisplay canvas={canvas}/>
        </div>
        <FurniturePalette className="sidebar"/>
      </div>
      <footer className="footer my-0 py-0 shadow">
        <div className="container">
          <span className="text-muted">VirtualAPT</span>
        </div>
      </footer>

      {getTool()}
    </div>
  );
}

const mapStateToProps = state => {
  const { tool, canvasState } = state;
  return {
    currentTool : tool,
    canvas: canvasState,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    updateCanvas: (obj) => dispatch(updateCanvasAction(obj)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
