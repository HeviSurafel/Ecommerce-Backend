
const express = require("express");
const{protectRoute,adminRoute,ownerRoute}=require("../middleware/auth.middleware.js")
const {createBlog,updateBlog,getSingleBlog,useBlogPost,getAllBlog,latestBlog}=require("../controller/blog.controller")
const route=express.Router()
//create blog route
route.post( "/blog/createBlog",protectRoute,adminRoute,createBlog);

//update blog route
route.put("/blog/update",protectRoute,adminRoute,updateBlog );
//get all blog route

route.get("/blog/allblogPost", getAllBlog
);
//view a single blog route
route.get('/blog/:id', getSingleBlog);
// lastest blog route
route.get("/blog/latestBlog",
  latestBlog
);
// users blog route
route.get(
  "blog/userPosts",
  useBlogPost
);
module.exports=route