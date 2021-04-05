import React from 'react';
import { Button, Form } from 'react-bootstrap';
import Mode7Control from './Mode7Control';

import './Mode7.scss';

interface IStateProps {
  height: number
  width: number;
  zDepth: number;
  scaleX: number;
  scaleY: number;
  angle: number;
}

interface IMode7Controls {
  state: IStateProps;
  setState: React.Dispatch<React.SetStateAction<IStateProps>>;
  resetState: () => void;
};

const Mode7Controls: React.FC<IMode7Controls> = (props) => {

  const {height, width, zDepth, scaleX, scaleY, angle} = props.state;
  const setState = props.setState;
  const resetState = props.resetState;

  // TODO: fix any hack with proper type
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, prop: string) => {
    setState((prevstate) => ({...prevstate, [prop]: e.target.valueAsNumber }))
  }

  //TODO: Set ranges from object?
  return (
    <div id="Mode7Controls">
      <h4>Controls</h4>

      <Form>
        <Mode7Control
          label="Z Depth"
          name="z-depth"
          min={1}
          max={500}
          value={zDepth}
          onChange={(e) => handleChange(e, 'zDepth')}
        />
        <Mode7Control
          label="Height"
          name="height"
          min={100}
          max={1000}
          value={height}
          onChange={(e) => handleChange(e, 'height')}
        />
        <Mode7Control
          label="Width"
          name="width"
          min={100}
          max={1000}
          value={width}
          onChange={(e) => handleChange(e, 'width')}
        />
        <Mode7Control
          label="Scale X"
          name="scale-x"
          min={1}
          max={64}
          value={scaleX}
          onChange={(e) => handleChange(e, 'scaleX')}
        />
        <Mode7Control
          label="Scale Y"
          name="scale-y"
          min={1}
          max={64}
          value={scaleY}
          onChange={(e) => handleChange(e, 'scaleY')}
        />
        <Mode7Control
          label="Rotation Angle"
          name="angle"
          min={0}
          max={360}
          value={angle}
          onChange={(e) => handleChange(e, 'angle')}
        />
      </Form>
      <Button onClick={resetState}>Reset</Button>
    </div>
    );
  }

  export default Mode7Controls;