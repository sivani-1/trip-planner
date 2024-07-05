import express from "express";

import { deleteUser, getUser, getUsers, updateUser } from "../controllers/user.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// CREATE

// router.post("/", createUser);

// UPDATE

// router.get("/checkaunthetication",verifyToken, (req,res,next)=>{
//     res.send("hello user, you are looged in");
// })

// router.get("/checkuser/:id", verifyUser, (req,res,next)=>{
//     res.send("hello user, you are looged in and you can delete your account");
// })

// router.get("/checkadmin/:id", verifyAdmin, (req,res,next)=>{
//     res.send("hello admin, you are looged in and you can delete your account");
// })

router.put("/:id", verifyUser,  updateUser);

// DELETE

router.delete("/:id", verifyUser, deleteUser);

// GET

router.get("/:id", verifyUser, getUser);

// GETALL

router.get("/", verifyAdmin, getUsers);



export default router;