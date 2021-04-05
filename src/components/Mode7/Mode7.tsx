import Mode7Controls from './Mode7Controls';
import Mode7Canvas from './Mode7Canvas';
import { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './Mode7.scss';

const Mode7: React.FC = () => {

  const defaultState = {
    height : 240,
    width  : 320,
    zDepth : 100,
    scaleX : 16,
    scaleY : 16,
    angle  : 45
  }

  const [state, setState] = useState({
    ...defaultState
  })

  const resetState = () => setState((prevstate) => ({
    ...defaultState
  }))

  return (
    <div id="Mode7">
      <Container fluid>
        <Row>
          <Col md={2} id="sidebar" >
            <Mode7Controls state={state} setState={setState} resetState={resetState}/>
          </Col>
          <Col id="main-area">
            <Mode7Canvas state={state}/>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Mode7;