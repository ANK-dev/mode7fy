import { useEffect } from "react";

interface IStateProps {
  height: number;
  width: number;
  z: number;
  scaleX: number;
  scaleY: number
};

interface IMode7Canvas {
  state: IStateProps;
  setState: React.Dispatch<React.SetStateAction<IStateProps>>
};

async function fillCanvas(props: IStateProps) {
  const texture = new Image();
  texture.src = './texture2.png';
  await texture.decode();

  // Creates an off-screen canvas to store the image as a texture
  const textureCanvas = document.createElement('canvas');
  textureCanvas.width = texture.naturalWidth;
  textureCanvas.height = texture.naturalHeight;

  const textureCtx = textureCanvas.getContext('2d');
  textureCtx?.drawImage(texture, 0, 0, texture.width, texture.height);


  const mainCanvas = document.getElementById('main-canvas') as HTMLCanvasElement;
  const mainCtx = mainCanvas?.getContext('2d');

  mainCanvas.height = props.height;
  mainCanvas.width = props.width;

  const mainCanvasWidthCenter = mainCanvas.width / 2;
  const mainCanvasHeightCenter = mainCanvas.height / 2;

  let x = 0;
  let y = 0;
  let z = props.z * -1;
  // let z = mainCanvasHeightCenter * -1;
  let scaleX = props.scaleX;
  // let scaleX = 16;
  let scaleY = props.scaleY;
  // let scaleY = 16;

  let x_new = 0;
  let y_new = 0;

  let canvas = mainCtx?.getImageData(0, 0, mainCanvas.width, mainCanvas.height)
  let canvasData = canvas?.data;

  let textureData = textureCtx?.getImageData(0, 0, texture.width, texture.height).data;

  for (y = 0; y < mainCanvas.height; y++) {

    // Render floor only
    if (z < 0){
      z++;
      continue;
    }

    y_new = y / z;
    if (y_new < 0) {
      y_new *= -1;
    }
    y_new *= scaleY;
    y_new %= texture.height;

    for (x = 0; x < mainCanvas.width; x++) {

      x_new = (mainCanvasWidthCenter - x) / z;
      if (x_new < 0) {
        x_new *= -1;
      }
      x_new *= scaleX;
      x_new %= texture.width;

      if (isNaN(x_new) || isNaN(y_new)) {
        x_new = 0;
        y_new = 0;
      }

      // Truncate fraction part
      x_new = Math.floor(x_new);
      y_new = Math.floor(y_new);

      // To RGBA format
      canvasData![(y * mainCanvas.width! + x) * 4 + 0] = textureData![(y_new * texture.width! + x_new) * 4 + 0]
      canvasData![(y * mainCanvas.width! + x) * 4 + 1] = textureData![(y_new * texture.width! + x_new) * 4 + 1]
      canvasData![(y * mainCanvas.width! + x) * 4 + 2] = textureData![(y_new * texture.width! + x_new) * 4 + 2]
      canvasData![(y * mainCanvas.width! + x) * 4 + 3] = textureData![(y_new * texture.width! + x_new) * 4 + 3]

    }
    z++;
  }
  mainCtx?.putImageData(canvas!, 0, 0);

}

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