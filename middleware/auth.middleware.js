const jwt = require("jsonwebtoken");
const User = require("../models/userMode");
const protectRoute = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
       return res.status(401).json({
        message: "unauthorized user no token provided",
      });
    }
   try {
    const decoded = jwt.verify(accessToken, process.env.accessTokeSecret)
    const user = await User.findById(decoded.userId).select("-password")
    if (!user) {
      res.status(401).json({
        message: " user not found",
      });
    }
    req.user = user;
    next();
   } catch (error) {
    console.log("Error in protectRoute middleware", error);
		return res.status(401).json({ message: "Unauthorized - Invalid access token" });
   }
  } catch (error) {
    console.log("Error in protect route", error.message);
    res.status(500).json({
      message: "Unauthorized -Invalid access token",
      error: error.message,
    });
  }
};
const adminRoute = (req, res, next) => {
  if (req.user && req.user.role === "admin" || "owner") {
    next();
  } else {
    res.status(501).json({
      message: "unauthorized user,admin only",
    });
  }
};
const ownerRoute = (req, res, next) => {
    if (req.user && req.user.role === "owner") {
      next();
    } else {
      res.status(501).json({
        message: "unauthorized user,admin only",
      });
    }
  };
module.exports = { adminRoute, protectRoute };
