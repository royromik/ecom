import React , {useState,useEffect} from 'react'
import {Form, Button} from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../Components/FormContainer';
import { userLoginAction } from '../Actions/userActions';
import {Link, useNavigate} from "react-router-dom";
import Loader from '../Components/Loader';
import Message from '../Components/Message';


const LoginScreen = () => {
    const navigate = useNavigate();
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const dispatch = useDispatch();
    const {loading,user, error} = useSelector(state=>state.userLogin)
    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(userLoginAction({email,password}))
    }
    useEffect(()=>{
        if(user){
        navigate("/")
        }
    },[user])
  return (
    loading?<Loader/>:error?<Message variant="danger">{error}</Message>:
    <FormContainer>
        <h1>Sign In</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group className='pb-3' controlId='email'>
                <Form.Label>
                    Email Address
                </Form.Label>
                <Form.Control 
                type='email'
                placeholder='Email'
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                />
            </Form.Group>
            <Form.Group className='pb-3' controlId='password'>
                <Form.Label>
                    Passowrd
                </Form.Label>
                <Form.Control 
                type='password'
                placeholder='password'
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                />
            </Form.Group>

            <Button type="submit" className='mb-3'>Log In</Button>
        </Form>
        <div>Don't have an account.<Link to="/register"> Register here</Link> </div>
    </FormContainer>
  )
}

export default LoginScreen