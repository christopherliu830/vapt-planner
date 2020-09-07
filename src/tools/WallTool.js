import React, { useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { fabric } from 'fabric';

function WallTool({canvas, currentTool}) {
  const [fabricLine, SetLine] = useState(0);

  useEffect(() => {
    console.log('wall tool init');
    canvas.selection = false;
    return () => canvas.selection = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMouseMove = useCallback(({e, target}) => {
    if (fabricLine) {
      const pointer = canvas.getPointer(e);
      fabricLine.set({x2: pointer.x, y2: pointer.y});
      canvas.renderAll();
    };
  }, [canvas, fabricLine]);

  const handleMouseDown = useCallback(({e, target}) => {
    if (target) {
      console.log('I\'m clicking');
      return;
    }
    else if (fabricLine) {
      console.log(fabricLine);
      SetLine(null);
      const pointer = canvas.getPointer(e);
      fabricLine.set({x2: pointer.x, y2: pointer.y, selectable: true});
      canvas.fire('update');
    }
    else {
      const pointer = canvas.getPointer(e);
      console.log(`Click registered at ${pointer.x}, ${pointer.y}`);
      const line = new fabric.Line([pointer.x, pointer.y, pointer.x, pointer.y], {stroke: 'black'});
      line.set('selectable', false);
      console.log(line.get('selectable'));
      SetLine(line);
      canvas.add(line);
    }
  }, [fabricLine, SetLine, canvas] );

  useEffect(() => {
    canvas.on('mouse:down', handleMouseDown);
    canvas.on('mouse:move', handleMouseMove);
    return () => {
      canvas.off('mouse:down', handleMouseDown);
      canvas.off('mouse:move', handleMouseMove);
    }
  }, [canvas, fabricLine, handleMouseDown, handleMouseMove]);

  return <React.Fragment>{currentTool}</React.Fragment>
}

const mapStateToProps = state => {
  const { tool } = state;
  return {
    currentTool : tool,
  };
};

export default connect(mapStateToProps)(WallTool);