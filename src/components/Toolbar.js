import React from 'react';
import { connect } from 'react-redux';
import { toolSelectedAction } from '../redux/actions';
import './Toolbar.css';

function Toolbar({selectTool}) {
  const handleChange = tool => {
    selectTool(tool);
  }
  return (
    <form onChange={handleChange} id="toolbar">
      <label>
        <input type="button" id="pan" onClick={() => handleChange('PAN')}/> pan
      </label>
      <br/>
      <label>
        <input type="button" id="edit" onClick={() => handleChange('EDIT')}/> edit
      </label>
    </form>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    selectTool : (tool) => dispatch(toolSelectedAction(tool)),
  };
};

export default connect(null, mapDispatchToProps)(Toolbar);