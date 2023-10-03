import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Form, Button, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Container } from "react-bootstrap";
import Header from "../../components/adminComponents/Header";
import { toast } from "react-toastify";

function UserUpdate() {
    const userId = useParams(':id')
    const users = useSelector(state => state.usersList)
    
    const [avatar, setAvatar] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate()

    useEffect(() => {
        users.usersList.forEach(doc => {
            if(doc._id === userId.id){
                setUsername(doc.name)
                setEmail(doc.email)
            }
        })
    }, [])
    
    



  const handleSubmit = async (e) => {
    e.preventDefault()
    if(username !== ""){
      setUsername(null)
    }
    await fetch('http://localhost:5000/admin/update-user',{
        headers: { "Content-Type": "application/json" },
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ userId: userId.id, name: username, email }),
    }).then(async(res) => res.json())
    .then(res => {
      navigate('/admin')
      toast.success(res.message)
    })
    .catch(err => {
      toast.error(err.message)
    }) 
  };

  return (
    <>
      <Header />
      <Container className="mt-4 py-2 d-flex justify-content-center">
        <Form onSubmit={handleSubmit} className="w-75">
          <Form.Group
            className="mb-3 d-flex justify-content-center"
            controlId="avatar"
          >
            <Form.Label>
              <img
                style={{
                  width: "180px",
                  height: "180px",
                  borderRadius: "10px",
                }}
                src={avatar ? '/user-avatar.png' : '/user-avatar.png'}
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="user name"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email Address</Form.Label>
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
              Update
            </Button>
          </Form.Group>
        </Form>
      </Container>
    </>
  );
}

export default UserUpdate;
