import * as actionTypes from './actionTypes';

export const uploadImageAction = (image) => {
  return {
    type: actionTypes.IMAGE_UPLOADED,
    image: image,
  };
};

export const toolSelectedAction = (tool) => {
  return {
    type: actionTypes.TOOL_SELECTED,
    tool: tool
  };
};

export const updateCanvasAction = (canvasState) => {
  return {
    type: actionTypes.CANVAS_UPDATED,
    canvasState: canvasState
  }
}