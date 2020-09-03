import React from 'react';
import { fabric } from 'fabric';

const FileSelector = ({canvas}) => {
  const onImageChange = event => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = e => fabric.Image.fromURL(e.target.result, img => {
        console.log('hello');
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
        canvas.setDimensions({width: img.width, height: img.height});
        canvas.fire('update');
      })
      reader.readAsDataURL(event.target.files[0]);

    }
  }

  return (
    <input 
      type="file"
      accept="image/png, image/jpeg"
      onChange={(event) => onImageChange(event)}/>
  );
}

// export default connect(null, mapDispatchToProps)(FileSelector);
export default FileSelector;