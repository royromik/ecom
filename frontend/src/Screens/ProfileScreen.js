import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userProfile,updateProfile } from "../Actions/userActions";
import FormContainer from "../Components/FormContainer";
import { Row, Col, Form, Button } from "react-bootstrap";
import {Link }from "react-router-dom"
import Loader from "../Components/Loader";
import Message  from "../Components/Message";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userLogin);
  const { loading , error, userInfo } = useSelector(
    (state) => state.userProfile
  );
  const{loading:loadingUt,error:errorUt,success,updatedUser} = useSelector(state=>state.updateProfile)
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPass: "",
  });

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      if (!userInfo?.name) {
        dispatch(userProfile());
      } else {
        setFormData({...formData,name:userInfo.name,email:userInfo.email})
      }
    }
  }, [user,userInfo]);

  const submitHandler = (event) => {
        const form = event.currentTarget;
        if(form.checkValidity()===false){
            event.preventDefault();
            event.stopPropagation();
        }else{
            event.preventDefault();
            dispatch(updateProfile(formData))
        }

        setValidated(true);
  }

  const setValue = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <Row>
      <Col md={6}>
        <h1>User Profile</h1>
        {/* {message && <Message variant="danger">{message}</Message>} */}
        {success && <Message variant="success">Profile Updated Successfully</Message>}
        {(error||errorUt) && <Message variant="danger">{error||errorUt}</Message>}
        {loading && <Loader />}
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
                isInvalid={
                  validated &&
                  !/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(formData.email)
                }
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
                isInvalid={
                  validated && formData.password !== formData.confirmPass
                }
              />
              <Form.Control.Feedback type="invalid">
                Passwords do not match.
              </Form.Control.Feedback>
            </Form.Group>

            <Button type="submit" className="mb-3">
              Update
            </Button>
          </Form>
        </FormContainer>
      </Col>
      <Col md={6}>
        <h1>My Orders</h1>
        
      </Col>
    </Row>
  );
};

export default ProfileScreen;
