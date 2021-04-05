import { useEffect } from "react";

interface IStateProps {
  height: number;
  width: number;
  zDepth: number;
  scaleX: number;
  scaleY: number;
  angle: number;

};

interface IMode7Canvas {
  state: IStateProps;
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

  // const mainCanvasWidthCenter = mainCanvas.width / 2;
  // const mainCanvasHeightCenter = mainCanvas.height / 2;

  let x = 0;
  let y = 0;
  let z = props.zDepth * -1;
  // let z = mainCanvasHeightCenter * -1;
  let scaleX = props.scaleX;
  // let scaleX = 16;
  let scaleY = props.scaleY;
  // let scaleY = 16;

  let x_ = 0;
  let y_ = 0;

  let angle = props.angle;

  // Conversion of degrees to radians
  let cos = Math.cos(angle * (Math.PI/180));
  let sin = Math.sin(angle * (Math.PI/180));


  let canvas = mainCtx?.getImageData(0, 0, mainCanvas.width, mainCanvas.height)
  let canvasData = canvas?.data;

  let textureData = textureCtx?.getImageData(0, 0, texture.width, texture.height).data;

  for (y = 0; y < mainCanvas.height; y++) {

    for (x = 0; x < mainCanvas.width; x++) {

      // Fill the skybox with solid color
      if (z < 0){
        canvasData![(y * mainCanvas.width! + x) * 4 + 0] = 0;
        canvasData![(y * mainCanvas.width! + x) * 4 + 1] = 204;
        canvasData![(y * mainCanvas.width! + x) * 4 + 2] = 255;
        canvasData![(y * mainCanvas.width! + x) * 4 + 3] = 255;
        continue;
      }

      y_ = (((mainCanvas.width - x) * cos - (x) * sin)) / z;
      x_ = (((mainCanvas.width - x) * sin + (x) * cos)) / z;

      if (y_ < 0) { y_ *= -1; }
      if (x_ < 0) { x_ *= -1; }

      y_ *= scaleY;
      x_ *= scaleX;

      y_ %= texture.height;
      x_ %= texture.width;
      // x_ = (mainCanvasWidthCenter - x) / z;
      // if (x_ < 0) {
      //   x_ *= -1;
      // }
      // x_ *= scaleX;
      // x_ %= texture.width;

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