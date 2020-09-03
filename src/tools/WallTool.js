import React, { useEffect, useState, useCallback } from 'react';
import { fabric } from 'fabric';

function WallTool({canvas}) {
  const [point, setPoint] = useState(0);

  useEffect(() => {
    canvas.on('mouse:down', handleMouseDown);
    return () => canvas.off('mouse:down', handleMouseDown);
  }, [canvas, point])

  let handleMouseDown = useCallback(({e, target}) => {
    if (target) setPoint(null);
    else if (point) {
      console.log(point);
      setPoint(null);
      canvas.add(new fabric.Line([point.x, point.y, e.layerX, e.layerY], {stroke: 'black'} ));
      canvas.fire('update');
    }
    else {
      console.log(`Click registered at ${e.layerX}, ${e.layerY}`)
      setPoint({x: e.layerX, y: e.layerY});
    }
  }, [point, setPoint, canvas] );

  return <React.Fragment/>
}

export default WallTool;