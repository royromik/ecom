import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormContainer from "../Components/FormContainer";
import { userRegister } from "../Actions/userActions";
import { Form } from "react-bootstrap";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const RegisterScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user, error } = useSelector((state) => state.userRegister);
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPass: "",
  });

  const setValue = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const submitHandler = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      console.log("inisde")
    } else{
        // console.log(validated);
        event.preventDefault();
        dispatch(userRegister(formData));
    }
    setValidated(true);  
  };

  useEffect(() => {
    console.log(user)
    if (user) {
      navigate("/");
      console.log("called")
    }
  }, [user]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <FormContainer>
      <h1>Sign In</h1>
      <Form noValidate validated={validated} onSubmit={submitHandler}>
        <Form.Group className="pb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            required
            onChange={setValue}
          />
        </Form.Group>
        <Form.Group className="pb-3" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={setValue}
            required
            isInvalid={validated&&!/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(formData.email)}
          />
        <Form.Control.Feedback type="invalid">
        Please enter a valid email address.
        </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="pb-3" controlId="password">
          <Form.Label>Passowrd</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            required
            onChange={setValue}
          />
        </Form.Group>
        <Form.Group className="pb-3" controlId="confirmPass">
          <Form.Label>Confirm Passowrd</Form.Label>
          <Form.Control
            type="password"
            name="confirmPass"
            placeholder="Confirm Passowrd"
            value={formData.confirmPass}
            onChange={setValue}
            required
            isInvalid={validated&&formData.password !== formData.confirmPass}
          />
        <Form.Control.Feedback type="invalid">
          Passwords do not match.
        </Form.Control.Feedback>
        </Form.Group>

        <Button type="submit" className="mb-3">
          Log In
        </Button>
      </Form>
      <div>
        Already have an account.<Link to="/login"> Login</Link>{" "}
      </div>
    </FormContainer>
  );
};

export default RegisterScreen;
