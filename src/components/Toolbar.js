import React from 'react';
import { connect } from 'react-redux';
import { toolSelectedAction } from '../redux/actions';
import './FurniturePalette.css';
import PaletteItem from './PaletteItem';

function Toolbar({tool, selectTool}) {
  const ids = ['PAN', 'WALL', 'SELECT'];
  const tools = ids.map(id => {
    return {
      name: id,
    }
  })

  return (
    <div className="palette">
      { ids.map(t => {
          return <PaletteItem
            highlighted={tool===t}
            onClick={() => selectTool(t)}
            text={t}
          />
        })
      }
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    selectTool : (tool) => dispatch(toolSelectedAction(tool)),
  };
};

const mapStateToProps = state => {
  const { tool } = state;
  return {
    tool: tool,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);