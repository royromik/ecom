import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

export const getProduct = asyncHandler(async(req,res)=>{
    const products = await Product.find({});
    res.send(products)
})

export const getProductbyId = asyncHandler(async(req,res)=>{
    const product = await Product.findById(req.params.id)
    if(product){
        res.send(product)
    }else{
        res.status(404).json({message:`product not found`})
    }
})