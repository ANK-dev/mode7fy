import React from "react";

interface IStateProps {
    height: number
    width: number;
    z: number;
    scaleX: number;
    scaleY: number;
}

interface IMode7Controls {
  state: IStateProps;
  setState: React.Dispatch<React.SetStateAction<IStateProps>>
};


const Mode7Controls: React.FC<IMode7Controls> = (props) => {

  const {height, width, z, scaleX, scaleY} = props.state;
  const setState = props.setState;


  const handleZChange = (e: React.ChangeEvent<HTMLInputElement> ) => {
      setState((prevstate) => ({...prevstate, z: e.target.valueAsNumber }))
      // console.log('z:', z);
      // document.getElementById('slider-z-value')!.innerHTML = z.toString();
  }
  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement> ) => {
      setState((prevstate) => ({...prevstate, height: e.target.valueAsNumber }))
      // console.log('height:', height);
  }
  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement> ) => {
      setState((prevstate) => ({...prevstate, width: e.target.valueAsNumber }))
      // console.log('width:', width);
  }
  const handleScaleXChange = (e: React.ChangeEvent<HTMLInputElement> ) => {
      setState((prevstate) => ({...prevstate, scaleX: e.target.valueAsNumber }))
      // console.log('scaleX:', scaleX);
  }
  const handleScaleYChange = (e: React.ChangeEvent<HTMLInputElement> ) => {
      setState((prevstate) => ({...prevstate, scaleY: e.target.valueAsNumber }))
      // console.log('scaleY:', scaleY);
  }
  return (
    <div id="Mode7Controls" style={{float: 'left'}}>
      <label htmlFor="slider-z">Z Depth</label>
      <input type="range" name="slider-z" id="slider-z" min="0" max="1000" onChange={handleZChange}/>
      <p id="slider-z-value">{z}</p>

      <label htmlFor="slider-height">Height</label>
      <input type="range" name="slider-height" id="slider-height" min="100" max="1000" onChange={handleHeightChange}/>
      <p id="slider-height-value">{height}</p>

      <label htmlFor="slider-width">Width</label>
      <input type="range" name="slider-width" id="slider-width" min="100" max="1000" onChange={handleWidthChange}/>
      <p id="slider-width-value">{width}</p>

      <label htmlFor="slider-scale-x">Scale X</label>
      <input type="range" name="slider-scale-x" id="slider-scale-x" onChange={handleScaleXChange}/>
      <p id="slider-scale-x-value">{scaleX}</p>

      <label htmlFor="slider-scale-y">Scale Y</label>
      <input type="range" name="slider-scale-y" id="slider-scale-y" onChange={handleScaleYChange}/>
      <p id="slider-scale-y-value">{scaleY}</p>
    </div>
    );
  }

  export default Mode7Controls;