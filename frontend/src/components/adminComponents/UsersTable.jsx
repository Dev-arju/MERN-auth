import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, ButtonGroup } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  sendRequest,
  saveResponse,
  saveError,
  deleteUser,
  changeUserStatus
} from "../../slices/admin/usersSlice";

const UsersTable = () => {
  const users = useSelector((state) => state.usersList);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(sendRequest());
    try {
      fetch("http://localhost:5000/admin/users", {
        headers: { "Content-Type": "application/json" },
        method: "GET",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((res) => {
          // console.log(res.docs);
          dispatch(saveResponse(res.docs));
        });
    } catch (error) {
      console.log(error);
      dispatch(saveError(error));
    }
  }, []);

  const handleDelete = async (userId) => {
    await fetch(`http://localhost:5000/admin/users/${userId}`, {
      method: 'DELETE',
      credentials: 'include'
    })
    .then(async (res) => res.json())
    .then((res) => {
      dispatch(deleteUser(userId))
      toast.success(res.message)
    })
    .catch((err) => {
      toast.error(err.message)
    })
  }

  const handleStatus = async (userId, currStatus) => {
    await fetch('http://localhost:5000/admin/users',{
      headers: {"Content-Type": "application/json"},
      method: 'PATCH',
      credentials: 'include',
      body: JSON.stringify({userId, currStatus})
    })
    .then(async (res) => await res.json())
    .then(res => {
        console.log(res)
        dispatch(changeUserStatus(userId))
        toast.success(res.message)
    })
  }

  return (
    <Table striped bordered hover className="mt-3">
      <thead>
        <tr>
          <th>#</th>
          <th>User Name</th>
          <th>email</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {users.usersList.map((user, index) => {
          return (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td className="text-center">
                <ButtonGroup aria-label="Basic example">
                  <Button onClick={() => handleDelete(user._id)} variant="danger">Delete</Button>
                  {
                    user.isActive ? (
                      <Button onClick={() => handleStatus(user._id, user.isActive)} variant="warning">Block</Button>
                    ) : (
                      <Button onClick={() => handleStatus(user._id, user.isActive)} variant="success">Un Block</Button>
                    )
                  }
                  
                  <LinkContainer to={`/admin/update/${user._id}`} >
                    <Button variant="primary">Edit</Button>
                  </LinkContainer>
                </ButtonGroup>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default UsersTable;
