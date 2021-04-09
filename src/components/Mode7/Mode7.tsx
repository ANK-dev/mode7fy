import Mode7Controls from './Mode7Controls';
import Mode7Canvas from './Mode7Canvas';
import { useState } from 'react';
import { IStateSidebar } from '../App/App';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './Mode7.scss';

export interface IStateProps {
  height: number;
  width: number;
  zDepth: number;
  scaleX: number;
  scaleY: number;
  angle: number;
  offsetX: number;
  offsetY: number;
};

interface IMode7 {
  sidebarState: IStateSidebar;
}

const Mode7: React.FC<IMode7> = (props) => {
  const defaultState: IStateProps = {
    height  : 240,
    width   : 320,
    zDepth  : -50,
    scaleX  : 16,
    scaleY  : 16,
    angle   : 0,
    offsetX : 0,
    offsetY : 0
  };

  const [state, setState] = useState({
    ...defaultState
  });

  const resetState = () => setState((prevstate) => ({
    ...defaultState
  }));

  return (
    <div id="Mode7">
      <Container fluid>
        <Row>
          {
            props.sidebarState.open &&
            <Col md={2} id="sidebar">
                <Mode7Controls
                  state={state}
                  setState={setState}
                  resetState={resetState}
                />
            </Col>
          }
          <Col id="main-area">
            <Mode7Canvas state={state}/>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Mode7;