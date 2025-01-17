import express from "express";

import dotenv from "dotenv";

import mongoose from "mongoose";

import authRoute from "./routes/auth.js";

import usersRoute from "./routes/users.js";

import hotelsRoute from "./routes/hotels.js";

import cookieParser from "cookie-parser";
import roomsRoute from "./routes/rooms.js";

const app = express();

dotenv.config();

const connect = async () => {
    try{
        await mongoose.connect(process.env.MONGO);
        console.log("connected to mongodb");
    }
    catch(error){
        throw error;
    }
};

mongoose.connection.on("disconnected", () =>{
    console.log("mongodb disconnected");
})

mongoose.connection.on("connected", () =>{
    console.log("mongodb connected");
})

// app.get("/users", (req,res) => {
//     res.send("hello first request");                     //since written in index.js so app.get
// })


//middlewares

app.use(cookieParser());

app.use(express.json());

app.use("/api/auth", authRoute);

app.use("/api/users", usersRoute);

app.use("/api/hotels", hotelsRoute);

app.use("/api/rooms", roomsRoute);

// app.use((req,res,next) => {
//     res.send("hii middle ware");
// })

app.use((err,req,res,next) => {
    // return res.status(500).json("hello error from handler");

    const errorStatus = err.status || 500;
    const errorMessage = err.message || "something went wrong!";
    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMessage,
        stack:err.stack,
    })
})

app.listen(8800, () =>{
    connect();
    console.log("connected to backend");
})