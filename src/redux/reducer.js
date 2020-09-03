import * as actionTypes from './actionTypes';

export default function(state = {}, action) {
  switch(action.type){
    case actionTypes.TOOL_SELECTED:
      console.log(action.tool);
      return {
        ...state,
        tool: action.tool,
      }
    case actionTypes.CANVAS_UPDATED:
      return {
        ...state,
        canvasState: action.canvasState,
      }
    default:
      return state;
  }
}