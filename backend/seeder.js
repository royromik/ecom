import mongoose from "mongoose";
import Order from "./models/orderModel.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import users from "./data/users.js";
import products from "./data/products.js";
import connectDb from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();
connectDb();

const importData = async()=>{
    try{
        await User.deleteMany()
        await Order.deleteMany()
        await Product.deleteMany()

        const addedUsers = await User.insertMany(users);
        const adminUser = addedUsers[0]._id
        await Product.insertMany(products.map((product)=>{
            return {...product,user:adminUser}
        }));
        console.log("data imported");
        process.exit(1);
    }catch(error){
        console.error(`Error:${error.message}`)
        process.exit(1)
    }
}


const destroyData = async()=>{
    try{
        await User.deleteMany()
        await Order.deleteMany()
        await Product.deleteMany()

        console.log("data destroyed");
        process.exit(1);
    }catch(error){
        console.error(`Error:${error.message}`)
        process.exit(1);
    }
}


    if(process.argv[2] == "-d"){
        destroyData()
    }else{
        importData()
    }
