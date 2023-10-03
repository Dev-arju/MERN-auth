import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setCredential, setLoading, setError } from '../../slices/admin/adminSlice'
import { Form, Button } from "react-bootstrap";
import FormContainer from "../../components/FormContainer";
import { toast } from "react-toastify";
import Loader from "../../components/adminComponents/Loader";

const AdminLoginScreen = () => {
  const [adminId, setAdminID] = useState("");
  const [adminPass, setAdminPass] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { authData, isLoading } = useSelector((state) => state.admin);

  useEffect(() => {
    if (authData.length > 0) {
      navigate("/admin");
    }
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    if(adminId && adminPass) {
        dispatch(setLoading())
        await fetch('http://localhost:5000/admin/login', {
            headers: { 'Content-Type': 'application/json'},
            credentials: "include",
            method: "POST",
            body: JSON.stringify({adminId, adminPass})
        })
        .then(res => res.json())
        .then(res => {
            if(res._id) {
                dispatch(setCredential([res]))
                navigate('/admin')
            } else {
                dispatch(setError(res.message))
                toast.error(res.message)
            }
        })
        .catch(err => {
            dispatch(setError(err?.data?.message || err.error))
            toast.error(err?.data?.message || err.error)
        })
    } else {
        toast.warning('Enter valid credentials')
    }
  };

  return (
    <FormContainer>
      <h2 className="text-center">Admin Login</h2>
      <Form className="mt-3" onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="adminId">
          <Form.Label>Admin ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Administrator ID"
            value={adminId}
            onChange={(e) => setAdminID(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="my-2" controlId="adminPass">
          <Form.Label>Admin Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Administrator Password"
            value={adminPass}
            onChange={(e) => setAdminPass(e.target.value)}
          />
        </Form.Group>

        {isLoading ? (
          <Loader />
        ) : (
          <Button type="submit" variant="success">
            Log IN
          </Button>
        )}
      </Form>
    </FormContainer>
  );
};

export default AdminLoginScreen;
