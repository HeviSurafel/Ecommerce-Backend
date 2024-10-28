const User=require("../models/userMode")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const asyncHandler=require("express-async-handler")
const redis=require("../lib/redis")
const generateToken = (userId) => {
  const accessToken = jwt.sign({ userId }, process.env.accessTokeSecret, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign({ userId }, process.env.refreshTokenSecret, {
    expiresIn: "7d",
  });
  return { accessToken, refreshToken };
};
const storeRefreshToken = async (userId, refreshToken) => {
  await redis.set(
    `refresh_token : ${userId}`,
    refreshToken,
    "EX",
    7 * 24 * 60 * 60
  );
};
const setCokkies = async (res, refreshToken, accessToken) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true, // prevent XSS attack
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict", //prevent CSRF attack
    maxAge: 15 * 60 * 1000,
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true, // prevent XSS attack
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict", //prevent CSRF attack
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};
const Register=async(req, res) => {
   try {
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    if (!email || !username || !password ) {
      throw Error("all fields are required");
    }
    const IsUserAvailable = await User.findOne({ email });
    if (IsUserAvailable) {
      res.json({
        message: "email is Already Taken",
      });
    }
    const hashpassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashpassword,
    });
    res.status(201).json({
      username:user.username, message:"created successfulluy"
    })
   } catch (error) {
    res.status(501).json({
      message:error
    })
   }
  }
const Login=asyncHandler(async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const user= await User.findOne({ email });
    const isPasswordRight = await bcrypt.compare(password, user.password);
    if (user && isPasswordRight) {
      const { accessToken, refreshToken } = generateToken(user._id);
      await storeRefreshToken(user._id, refreshToken);
      setCokkies(res, accessToken, refreshToken);
      res.json({
        _id: user._id,
        name: user.name,
        email: user.password,
        role: user.role,
      })
    }
    else{
     
      res.status(501).json({
        message:"email or password error"
      })
    }
  })
  const Logout= asyncHandler((req, res) => {
    res.cookie("token", "").json("ok");
  })
  const refreshToken=async(req,res)=>{
    try {
      const refreshToken=req.cookie.refreshToken;
      if(!refreshToken){
        res.status(401).json({
          message:"no Token found"
        })
      }
      const decoded=jwt.verify(refreshToken,process.env.refreshTokenSecret)
      console.log(decoded)
      const storedToken=await redis.get(`refresh_token : ${decoded.userId}`)
      if(decoded!==storedToken){
        return res.status(401).json({
          message:"Invalid refresh token"
        })
      }
      const accessToken=jwt.sign({userId:decoded.userId},process.env.accessTokeSecret,{
        expiresIn:"15m"
      })
      res.cookie("accessToken", accessToken, {
        httpOnly:true,
        secure:process.env.NODE_ENV==="production",
        sameSite:"strict",
        maxAge:15*60*1000,
      })
      res.json({message: "refresh token created"})
    } catch (error) {
      console.log(error)
    }
  }
  const getProfile = async (req, res) => {
    try {
      res.json(req.user);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  
  module.exports={Register,Login,Logout,refreshToken,getProfile}