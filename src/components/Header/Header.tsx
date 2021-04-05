import React from 'react';
import { Navbar, Button} from 'react-bootstrap';

import { IStateSidebar } from '../App/App';

import './Header.scss';

interface IHeader {
  sidebarState: IStateSidebar;
  toggleSidebar: () => void;
}

const Header: React.FC<IHeader> = (props) => {

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
      {
        props.sidebarState.open
          ? <Button id="menu" onClick={props.toggleSidebar}>&times;</Button>
          : <Button id="menu" onClick={props.toggleSidebar}>+</Button>
      }
      <Navbar.Brand className="font-italic mr-auto">MODE7FY</Navbar.Brand>
      <Navbar.Text><a href="https://github.com/ANK-dev">by ANK-dev</a></Navbar.Text>
    </Navbar>
  );
}

export default Header;