const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/mysql/user.model");
const { mySQLSequelize } = require("../config/db-mysql.config");
const operation = User(mySQLSequelize);

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //get token from headers
      token = req.headers.authorization.split(" ")[1];

      //verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await operation.findByPk(decoded.id);

      //get user from the token
      req.user = {
        id: 2,
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        email: user.email,
        birthyear: user.birthyear,
        created_at: user.created_at
      };
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error(
        JSON.stringify({
          message: "Not authorized!",
        })
      );
    }
  }

  if (!token) {
    res.status(401);
    throw new Error(
      JSON.stringify({
        message: "Not authorized, no token",
      })
    );
  }
});

module.exports = { protect };
