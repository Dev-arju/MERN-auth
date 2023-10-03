import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Container, Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Hero = () => {
  const { authData } = useSelector(state => state.user)
  console.log(typeof authData);
  console.log(authData);
  
  return (
    <div className=" py-5">
      <Container className="d-flex justify-content-center">
        <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-75">
          {authData[0] ? (
            <h2>Welcome {authData[0].name}</h2>
          ) : (
            <>
              <h1 className="text-center mb-4">MERN Authentication</h1>
              <div className="d-flex">
                <Button variant="primary" href="/login" className="me-3">
                  Sign In
                </Button>
                <Button variant="secondary" href="/register">
                  Register
                </Button>
              </div>
            </>
          )}
        </Card>
      </Container>
    </div>
  );
};

export default Hero;
