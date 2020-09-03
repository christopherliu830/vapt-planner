import React, { useState, useEffect } from 'react';
import './App.css';
import { FileSelector, ImageDisplay, Toolbar }  from './components';
import WallTool from './tools/WallTool';
import { connect } from 'react-redux';
import { updateCanvasAction } from './redux/actions';
import { fabric } from 'fabric';

function App({updateCanvas}) {
  const [canvas, setCanvas] = useState(new fabric.Canvas());

  useEffect(() => {
    const c = new fabric.Canvas('c', {backgroundColor: 'white'});
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

  return (
    <div className="App">
      <header className="App-header">
        <FileSelector canvas={canvas}/>
      </header>
      <ImageDisplay canvas={canvas}/>
      <Toolbar/>
      <WallTool canvas={canvas}/>
    </div>
  );
}
const mapDispatchToProps = dispatch => {
  return {
    updateCanvas: (obj) => dispatch(updateCanvasAction(obj)),
  };
};

export default connect(null, mapDispatchToProps)(App);
