import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../Actions/productActions";
import { Row, Col, Image, ListGroup, Button, Form, Container } from "react-bootstrap";
import Rating from "../Components/Rating";
import Loader from "../Components/Loader";
import Message from "../Components/Message";
// import Meta from "../Components/Meta";

const ProductScreen = () => {
  const {id} = useParams()
  const [product,setProduct] = useState({})
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const dispatch = useDispatch();
  const { loading, products ,error} = useSelector(state=>state.productList)
  const productDetails = useSelector(state=>state.productDetails)
  useEffect(()=>{
    
    if(products.length!==0){
    setProduct(products.filter((prod)=>prod._id===id)[0])
    }else{
      dispatch(getProduct(id))
      console.log(productDetails.product,"+++++++++++")
    }
  },[])


const addToCartHandler = (()=>{
  
})
 
  return (
    <>
      <Link to="/" className="btn btn-light mb-4">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
        {/* <Meta title={product.name}/> */}
        <Container>
      
      </Container>
    </>
      )}
    </>
  );
};

export default ProductScreen;
