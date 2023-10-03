import Header from "../../components/adminComponents/Header";
import UsersTable from "../../components/adminComponents/UsersTable";
import { Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const AdminHome = () => {
  return (
    <>
      <Header />
      <Container className="mt-4 py-2">
        <div className="d-flex justify-content-between">
          <h4>Users List</h4>
          <LinkContainer to="/admin/add-user">
            <button className="btn btn-success">Create user</button>
          </LinkContainer>
        </div>
        <UsersTable />
      </Container>
    </>
  );
};

export default AdminHome;
