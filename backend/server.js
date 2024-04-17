import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import { notFound, errorMiddleware } from "./middleware/errorMiddleware.js";
import productRouter  from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";

dotenv.config();
connectDb();

const app = express();
app.use(express.json());

//routes
app.use("/api/products",productRouter);
app.use("/api/users", userRouter);

app.use(notFound)
app.use(errorMiddleware)

const port = process.env.PORT || 5000;

app.listen(port, ()=>{console.log(`server is started and running in port ${port}`)});