import express from "express";
import { getProduct, getProductbyId } from "../controller/productController.js";


const router = express.Router();

// get all products
// access public
router.get("/",getProduct)

// get product by id
// access public
router.get("/:id",getProductbyId);

export default router;
