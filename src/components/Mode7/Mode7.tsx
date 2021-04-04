import { useEffect } from "react";

type Mode7Props = {
    height: number;
    width: number;
    z: number;
    scaleX: number;
    scaleY: number
};

// Creates an off-screen canvas to store the image as a texture
async function fillCanvas() {
    const texture = new Image();
    texture.src = './texture2.png';
    await texture.decode();

    const textureCanvas = document.createElement('canvas');
    textureCanvas.width = texture.naturalWidth;
    textureCanvas.height = texture.naturalHeight;

    const textureCtx = textureCanvas.getContext('2d');
    textureCtx?.drawImage(texture, 0, 0, texture.width, texture.height);


    const mainCanvas = document.getElementById('main-canvas') as HTMLCanvasElement;
    const mainCtx = mainCanvas?.getContext('2d');

    const mainCanvasWidthCenter = mainCanvas.width / 2;
    const mainCanvasHeightCenter = mainCanvas.height / 2;

    let x = 0;
    let y = 0;
    let z = mainCanvasHeightCenter * -1;
    let scaleX = 16;
    let scaleY = 16;

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
            y_new = Math.floor(y_new)

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

function Mode7() {

    useEffect(() => {
        fillCanvas();
    }, []);


    return (
        <>
        <canvas id="main-canvas" width={window.innerWidth} height={window.innerHeight}></canvas>
        </>
    );
}

export default Mode7;