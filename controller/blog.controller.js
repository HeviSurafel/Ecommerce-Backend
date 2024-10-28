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

const saltRounds = 10;
const mongoose = require("mongoose");
const validateToken=require("../middleware/ValidateToke.js")
const comment=require("../models/comment.js")
const createBlog=(uploadMiddleware.single("image"),asyncHandler(async (req, res) => {
    const { originalname, path } = req.file;
    const parse = originalname.split(".");
    const ext = parse[parse.length - 1];
    const newPath = path + "." + ext;
    const files = fs.renameSync(path, newPath);
   
      const { title, description, catagory,subDescription } = req.body;
      const PostDoc = await Post.create({
        title,
        description,
        subDescription,
        catagory,
        image: newPath,
        author: info.id,
      });
      res.json(PostDoc);
    
  }))

const updateBlog=(uploadMiddleware.single("file"), async (req, res) => {
    let newPath = null;
    if (req.file) {
      const { originalname, path } = req.file;
      const parts = originalname.split(".");
      const ext = parts[parts.length - 1];
      newPath = path + "." + ext;
      fs.renameSync(path, newPath);
    }
 
    const { token } = req.cookies;
    jwt.verify(token, SECRET, {}, async (err, info) => {
      if (err) throw err;
      const { id, title, summary, content } = req.body;
      const postDoc = await Post.findById(id);
      const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
      if (!isAuthor) {
        return res.status(400).json("you are not the author");
      }
      await postDoc.updateOne({
        title,
        summary,
        content,
        cover: newPath ? newPath : postDoc.cover,
      });
  
      res.json(postDoc);
    });
  })
  const getAllBlog=asyncHandler(async (req, res) => {
    const data = await Post.find().populate("author").sort({
      createdAt: -1,
    });
    res.json(data);
  })
  const getSingleBlog=(req, res) => {
    const blogPost = req.blogPost;
    res.json(blogPost);
  }
  const latestBlog= asyncHandler(async (req, res) => {
    const data = await Post.find().sort({
      createdAt: -1,
    }).limit(3);
    res.json(data);
  })
  const useBlogPost= asyncHandler(async (req, res) => {
    res.json(
      await Post.find()
        .populate("author", ["username"])
        .sort({
          createdAt: -1,
        })
        .limit(20)
    );
  })
  module.exports={createBlog,updateBlog,getAllBlog,getSingleBlog,latestBlog,useBlogPost}