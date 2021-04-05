import { Navbar } from 'react-bootstrap';

const Header: React.FC = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand className="font-italic mr-auto">MODE7FY</Navbar.Brand>
      <Navbar.Text><a href="https://github.com/ANK-dev">by ANK-dev</a></Navbar.Text>
    </Navbar>
  );
}

export default Header;