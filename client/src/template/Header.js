import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Header() {
  return (
    <>
      <Navbar className="navbar navbar-dark bg-dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="/logo192.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            mlmodels.foo
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link className="me-auto" href="/">Home</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;