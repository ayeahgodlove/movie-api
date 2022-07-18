const asyncHandler = require("express-async-handler");
const User = require("../models/mysql/user.model");
const { mySQLSequelize } = require("../config/db-mysql.config");
const operation = User(mySQLSequelize);

const getUsers = asyncHandler(async (req, res) => {
  const users = await operation.findAll();
  res.status(200).json(users);
});

const getUser = asyncHandler(async (req, res) => {
  res.status(200).json(movies);
});

const createUser = asyncHandler(async (req, res) => {
  const { firstname, lastname, username, password, email, birthyear } =
  req.body;

if (!firstname) {
  res.status(400).send();
  throw new Error("Please add actor name");
}

const user = {
  firstname,
  lastname,
  username,
  password,
  email,
  birthyear,
  created_at: new Date()
};

await User(mySQLSequelize)
  .create(user)
  .then((data) => res.send(data))
  .catch((err) =>
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Tutorial.",
    })
  );
});

const updateUser = asyncHandler(async (req, res) => {});

const deleteUser = asyncHandler(async (req, res) => {});

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
