import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { dropCredential } from '../slices/user/userSlice'


const Header = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authData } = useSelector(state => state.user)

  const logoutHandler = async () => {
    try {
      await fetch("http://localhost:5000/api/users/logout", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        credentials: "include"
      })
      .then(() => {
        dispatch(dropCredential())
        navigate('/')
      })
    } catch (error) {
      console.log(error);
      navigate('/')
    }
    
  }

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>MERN App</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              { authData[0] ? (
                <>
                  <NavDropdown className="ms-auto" title={authData[0].name} id="username">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Update Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/reset-password">
                      <NavDropdown.Item>Change Password</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                  </NavDropdown>
                </>
               ) : ( 
                <>
                  <LinkContainer to="/login">
                    <Nav.Link className="mx-auto">
                      <FaSignInAlt /> Sign In
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/register">
                    <Nav.Link className="mx-auto">
                      <FaSignOutAlt /> Sign Up
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
