const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv").config();
const errorHanler = require("./middleware/errorHandler");
const routes = require("./routes/routes");
const blogRoute=require("./routes/blog.route")
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const db = require("./db/dbConfig");
const validateToken = require("./middleware/ValidateToke");
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(errorHanler);
app.use("/api", routes);
app.use("/api", blogRoute);
const port = process.env.PORT || 5001;
app.use("/uploads", express.static(__dirname + "/uploads"));
// app.use(validateToken);
app.listen(port, () => {
  db();
  console.log(`university student community page ${port}`);
});
