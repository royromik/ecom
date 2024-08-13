import { useDispatch, useSelector } from "react-redux";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { userLogout } from "../Actions/userActions";

const Header = () => {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(userLogout());
  };
  const { user } = useSelector((state) => state.userLogin);

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          ECom
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/cart">
              <i className="fas fa-shopping-cart"></i>Cart
            </Nav.Link>
            {user ? (
              <NavDropdown title={user.name} id="username">
                <NavDropdown.Item >
                  <Link to="/profile">Profile</Link>
                </NavDropdown.Item>
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link as={Link} to="/login">
                <i className="fas fa-user"></i>Sign-in
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
