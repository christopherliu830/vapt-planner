import * as actionTypes from './actionTypes';

export default function(state = {}, action) {
  switch(action.type){
    case actionTypes.TOOL_SELECTED:
      console.log(action.tool);
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
      return {
        ...state,
        furniture: action.furniture,
        tool: 'FURNITURE',
      }
    case actionTypes.RESIZE:
      console.log(action);
      return {
        ...state,
        scale: action.newScale,
      }
    default:
      return state;
  }
}