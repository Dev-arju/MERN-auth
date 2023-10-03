import { dropCredential } from '../../slices/admin/adminSlice'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'
import { FaSignOutAlt } from "react-icons/fa";

const Header = () => {


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async (e) => {
        e.preventDefault()
        await fetch('http://localhost:5000/admin/drop', {
            method: "POST",
            credentials: "include",
        })
        .then(res => {
            if(res.status == 200){
                dispatch(dropCredential())
                navigate('/admin/login')
            }
        })  
    }

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/admin">
            <Navbar.Brand>Admin Portal</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link onClick={logoutHandler} className="mx-auto">
                <FaSignOutAlt />Log Out
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
