const express = require('express');
const app = express();
const errorMiddleware = require("../backend/middleware/error");
const cookieParser = require("cookie-parser")

app.use(express.json());
app.use(cookieParser());

//Route Imports 
const product = require("../backend/routes/productRoute");
const user = require("../backend/routes/userRoute");

app.use("/api/v1",product);
app.use("/api/v1", user);

//Middleware for error
app.use(errorMiddleware);

module.exports = app