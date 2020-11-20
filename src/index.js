import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {BrowserRouter} from 'react-router-dom';
import reducer from './redux/reducer';
import App from './App'
import AWS from 'aws-sdk';
import { CanvasProvider } from './hooks/with-canvas';
import * as serviceWorker from './serviceWorker';


const initialState = {
  tool: 'PAN',
  scale: 1,
  canvasState: null,
};


const store = createStore(reducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
// const store = createStore(reducer, initialState);
ReactDOM.render(
  <Provider store={store}>
  <CanvasProvider>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </CanvasProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
