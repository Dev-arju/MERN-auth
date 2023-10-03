import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from 'axios'

// import react-bootstrap components
import { Container, Form, Button, Row, Col } from "react-bootstrap";

// import react-router-bootstrap components
import { LinkContainer } from "react-router-bootstrap";

// import components
import Header from "../../components/adminComponents/Header";

const CreateUser = () => {
  const [avatar, setAvatar] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("avatar", avatar);
    formData.append("name", name);
    formData.append("email", email);

    try {
      axios.post('http://localhost:5000/admin/add-user', formData, {withCredentials: true})
      .then(res => console.log(res))
    } catch (error) {
      console.log(error);
    }

    // .then( async(res) => {
    //   if(res.status === 200){
    //     return await res.json()
    //   } else {
    //     throw new Error('Invalid user info')
    //   }
    // })
    // .then(res => {
    //   navigate('/admin')
    //   toast.success('User Created')
    // })
    // .catch(err => {
    //   console.log(err);
    //   toast.error('error facing creating user')
    // })
  };

  return (
    <>
      <Header />
      <Container className="mt-4 py-2">
        <Row className="my-3 py-2">
          <Col className="d-flex justify-content-center">
            <h2>Create User</h2>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-center w-75">
            <Form onSubmit={handleSubmit}>
              <Form.Group
                className="mb-3 d-flex justify-content-center"
                controlId="avatar"
              >
                <Form.Label>
                  <img
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                    }}
                    src={avatar ? "/user-avatar.png" : "/user-avatar.png"}
                  />
                </Form.Label>
                <Form.Control
                  style={{ display: "none" }}
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  onChange={(e) => setAvatar(e.target.files[0])}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="username">
                <Form.Label>User Name</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="user name"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email Address </Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email address"
                />
              </Form.Group>

              <Form.Group
                className="mb-3 d-flex justify-content-center"
                controlId="buttonGroup"
              >
                <LinkContainer to="/admin">
                  <Button variant="primary" type="button" className="me-3">
                    Home
                  </Button>
                </LinkContainer>
                <Button variant="success" type="submit">
                  Create
                </Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CreateUser;
