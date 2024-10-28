const express = require("express");
const route = express.Router();
const user = require("../models/userMode.js");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });
const fs = require("fs");
const Post = require("../models/post.js");
const SECRET = process.env.SECRET;
const saltRounds = 10;
const mongoose = require("mongoose");
const validateToken=require("../middleware/ValidateToke.js")
const comment=require("../models/comment.js")
const {Register,Login,Logout,refreshToken,getProfile}=require("../controller/auth.controller.js")
const{protectRoute}=require("../middleware/auth.middleware.js")
const {createBlog,updateBlog,getSingleBlog,useBlogPost,getAllBlog,latestBlog}=require("../controller/blog.controller")
//register route
route.post("/users/register",Register);
// login route
route.post("/users/login",Login);
//get profile
route.get("/user/Profile",protectRoute,getProfile)
// logout route
route.post("/users/logout",Logout);
route.post("/refresh",refreshToken)

// // comment section
// route.post("/comments/create", async (req, res) => {
//   try {
//     const newComment = new comment(req.body);
//     const savedComment = await newComment.save()
//         res.status(200).json(savedComment)
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ error: error.toString() });
//   }
// });

// // Get post comments
// route.get("/comments/post/:id", async(req,res) => {
//   try {
//     const { id } = req.params;
//       const comments = await Comment.find({id})
//       res.status(200).json(comments)
//   } catch (err) {
//       res.status(500).json(err)
//   }
// })

// route.put("/", async (req, res) => {
//   try {
//     const result = await updateComment(req.body.comment);
//     res.send(result);
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ error: error.toString() });
//   }
// });

// route.delete("/:id", async (req, res) => {
//   try {
//     const result = await deleteComment(req.params.id);
//     res.send(result);
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ error: error.toString() });
//   }
// });
// route.delete("/post/delete/:id" ,async(req,res)=>{
//   const { id } = req.params;
//   const result=await Post.findOneAndDelete(id)
//   res.json(result)
// })


module.exports = route;
