import * as actionTypes from './actionTypes';

export default function(state = {}, action) {
  switch(action.type){
    case actionTypes.TOOL_SELECTED:
      const canvas = state.canvasState;
      if (canvas && action.tool === 'PAN') {
        canvas.getObjects().forEach(obj => obj.selectable = false)
        canvas.selection = false;
      }
      else if (canvas) {
        canvas.getObjects().forEach(obj => obj.selectable = true)
        canvas.selection = true;
      }

      return {
        ...state,
        tool: action.tool,
        furniture: null,
      }
    case actionTypes.CANVAS_UPDATED:
      return {
        ...state,
        canvasState: action.canvasState,
      }
    case actionTypes.FURNITURE_ITEM_SELECTED:
      console.log('hello?');
      return {
        ...state,
        furniture: action.furniture,
        tool: action.furniture ? 'FURNITURE' : null,
      }
    case actionTypes.RESIZE:
      return {
        ...state,
        scale: action.newScale,
      }
    default:
      return state;
  }
}