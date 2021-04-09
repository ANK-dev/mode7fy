import { useEffect } from 'react';

import { IStateProps } from './Mode7';

async function fillCanvas(props: IStateProps) {
  const texture = new Image();
  texture.src = './texture2.png';
  await texture.decode();

  /**************************** Off-Screen Canvas *****************************/

  // Creates an off-screen canvas to store the image as a texture
  const textureCanvas = document.createElement('canvas');
  textureCanvas.width = texture.naturalWidth;
  textureCanvas.height = texture.naturalHeight;

  // Gets a handle and draws texture to off-screen canvas
  const textureCtx = textureCanvas.getContext('2d');
  textureCtx?.drawImage(texture, 0, 0, texture.width, texture.height);

  /***************************** On-Screen Canvas *****************************/

  // Gets a handle to the on-screen canvas element
  // TODO: change `getElementById` to React Refs?
  const mainCanvas = document.getElementById('main-canvas') as HTMLCanvasElement;
  const mainCtx = mainCanvas?.getContext('2d');

  mainCanvas.height = props.height;
  mainCanvas.width = props.width;

  /****************************************************************************/

  let x = 0;
  let y = 0;
  let z = props.zDepth;
  let scaleX = props.scaleX;
  let scaleY = props.scaleY;

  let x_ = 0;
  let y_ = 0;

  let offsetX = props.offsetX;
  let offsetY = props.offsetY;

  // Corrects angle offset
  let angle = props.angle - 45;

  // Conversion of degrees to radians
  let cos = Math.cos(angle * (Math.PI/180));
  let sin = Math.sin(angle * (Math.PI/180));

  // Gets pixel data from main canvas
  let canvas = mainCtx?.getImageData(0, 0, mainCanvas.width, mainCanvas.height)
  let canvasData = canvas?.data;

  // Gets pixel data from texture canvas
  let textureData = textureCtx?.getImageData(0, 0, texture.width, texture.height).data;

  for (y = 0; y < mainCanvas.height; y++) {

    for (x = 0; x < mainCanvas.width; x++) {

      // Fill the skybox with solid color
      if (z < 0){
        canvasData![(y * mainCanvas.width! + x) * 4 + 0] = 0;     // R
        canvasData![(y * mainCanvas.width! + x) * 4 + 1] = 204;   // G
        canvasData![(y * mainCanvas.width! + x) * 4 + 2] = 255;   // B
        canvasData![(y * mainCanvas.width! + x) * 4 + 3] = 255;   // A
        continue;
      }

      y_ = (((mainCanvas.width - x) * cos - (x) * sin)) / z;
      x_ = (((mainCanvas.width - x) * sin + (x) * cos)) / z;

      if (y_ < 0) { y_ *= -1; }
      if (x_ < 0) { x_ *= -1; }

      y_ *= scaleY;
      x_ *= scaleX;

      y_ += offsetY;
      x_ += offsetX;

      y_ %= texture.height;
      x_ %= texture.width;

      if (isNaN(x_) || isNaN(y_)) {
        x_ = 0;
        y_ = 0;
      }

      // Truncate fraction part
      x_ = Math.floor(x_);
      y_ = Math.floor(y_);

      // To RGBA format
      canvasData![(y * mainCanvas.width! + x) * 4 + 0] = textureData![(y_ * texture.width! + x_) * 4 + 0]
      canvasData![(y * mainCanvas.width! + x) * 4 + 1] = textureData![(y_ * texture.width! + x_) * 4 + 1]
      canvasData![(y * mainCanvas.width! + x) * 4 + 2] = textureData![(y_ * texture.width! + x_) * 4 + 2]
      canvasData![(y * mainCanvas.width! + x) * 4 + 3] = textureData![(y_ * texture.width! + x_) * 4 + 3]

    }
    z++;
  }
  mainCtx?.putImageData(canvas!, 0, 0);

}

interface IMode7Canvas {
  state: IStateProps;
};

const Mode7Canvas: React.FC<IMode7Canvas> = (props) => {

  useEffect(() => {
    fillCanvas(props.state);
  }, [props]);


  return (
    <div id="Mode7Canvas">
      <canvas id="main-canvas" width={window.innerWidth} height={window.innerHeight}></canvas>
    </div>
  );
}

export default Mode7Canvas;