import React, {useState} from "react";

const Controls = () => {

  const [height, setHeight] = useState(300);
  const [width,  setWidth ] = useState(400);
  const [z,      setZ     ] = useState(-300);
  const [scaleX, setScaleX] = useState(30);
  const [scaleY, setScaleY] = useState(30);

  const handleZChange = (e: React.ChangeEvent<HTMLInputElement> ) => {
      setZ(e.target.valueAsNumber);
      console.log('z:', z);
  }
  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement> ) => {
      setHeight(e.target.valueAsNumber);
      console.log('height:', height);
  }
  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement> ) => {
      setWidth(e.target.valueAsNumber);
      console.log('width:', width);
  }
  const handleScaleXChange = (e: React.ChangeEvent<HTMLInputElement> ) => {
      setScaleX(e.target.valueAsNumber);
      console.log('scaleX:', scaleX);
  }
  const handleScaleYChange = (e: React.ChangeEvent<HTMLInputElement> ) => {
      setScaleY(e.target.valueAsNumber);
      console.log('scaleY:', scaleY);
  }
  return (
    <div>
      <label htmlFor="slider-z">Z Depth</label>
      <input type="range" name="slider-z" id="slider-z" onChange={handleZChange}/>

      <label htmlFor="slider-height">Height</label>
      <input type="range" name="slider-height" id="slider-height" onChange={handleHeightChange}/>

      <label htmlFor="slider-width">Width</label>
      <input type="range" name="slider-width" id="slider-width" onChange={handleWidthChange}/>

      <label htmlFor="slider-scale-x">Scale X</label>
      <input type="range" name="slider-scale-x" id="slider-scale-x" onChange={handleScaleXChange}/>

      <label htmlFor="slider-scale-y">Scale Y</label>
      <input type="range" name="slider-scale-y" id="slider-scale-y" onChange={handleScaleYChange}/>
    </div>
    );
  }

  export default Controls;