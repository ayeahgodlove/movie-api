const asyncHandler = require("express-async-handler");
const User = require("../models/mysql/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { mySQLSequelize } = require("../config/db-mysql.config");
const generateToken = require("../security/generate-token");
const operation = User(mySQLSequelize);
require("dotenv").config();

const getUsers = asyncHandler(async (req, res) => {
  const users = await operation.findAll();
  res.status(200).json(users);
});

// Find a single Tutorial with an id
const searchUsers = asyncHandler(async (req, res) => {
  const searchParam = req.params.search;
  const allUsers = await operation.findAll();

  const filteredUsers = allUsers.filter((user) =>
    (user.firstname + user.lastname + user.username)
      .toLowerCase()
      .includes(searchParam.toString().toLowerCase())
  );

  if (filteredUsers && filteredUsers.length < 1) {
    res.status(400);
    throw new Error("Search not found! try again.");
  }

  res.send(filteredUsers);
});

const createUser = asyncHandler(async (req, res) => {
  const { firstname, lastname, username, password, email, birthyear } =
    req.body;

  if (
    !firstname ||
    !lastname ||
    !username ||
    !password ||
    !email ||
    !birthyear
  ) {
    res.status(400);
    throw new Error(
      JSON.stringify({
        username: "Please add a firstname field",
        username: "Please add a lastname field",
        username: "Please add a username field",
        password: "Please add a password field",
        email: "Please add a email field",
        birthday: "Please add a birthday field",
      })
    );
  }

  // check if username, or email exist already
  const userExists = await operation.findOne({ where: { email, username } });
  if (userExists) {
    res.status(400);
    throw new Error(
      JSON.stringify({
        message: "Email already exists in the system",
      })
    );
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = {
    firstname,
    lastname,
    username,
    password: hashedPassword,
    email,
    birthyear,
    created_at: new Date(),
  };

  await User(mySQLSequelize)
    .create(user)
    .then((data) => {
      res.status(201).send({
        id: data.id,
        firstname: data.firstname,
        lastname: data.lastname,
        username: data.username,
        password: data.password,
        email: data.email,
        birthyear: data.birthday,
        created_at: data.birthday,
        token: generateToken(data.id),
      });
    })
    .catch((err) =>
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial.",
      })
    );
});

const updateUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const user = await operation.findByPk(id);

  if (!user) {
    res.status(400);
    throw new Error("user not found!");
  }

  await operation
    .update(req.body, {
      where: { id: id },
    })
    .then(async (num) => {
      const updatedUser = await operation.findByPk(id);
      res.send({
        message: "A User was updated successfully.",
        data: updatedUser,
      });
    })
    .catch((error) => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id,
        data: error,
      });
    });
});

const deleteUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const user = await operation.findByPk(id);

  if (!user) {
    res.status(400);
    throw new Error("user not found!");
  }

  await operation
    .destroy({
      where: { id: id },
    })
    .then(() => {
      res.status(200).send({
        message: `User: ${user.name} was deleted successfully!`,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: `Could not delete User: ${user.name}`,
      });
    });
});

const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  // console.log(process.env.JWT_SECRET)
  // check for user email
  const user = await operation.findOne({ where: { username } });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      id: user.id,
      username: user.username,
      password: user.password,
      email: user.email,
      token: generateToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error(
      JSON.stringify({
        message: "Invalid User Credentials",
      })
    );
  }
});

const getProfile = asyncHandler(async (req, res) => {
  console.log("user: ", req)
  const { id, firstname, lastname, username, email, birthyear } =
    await operation.findByPk(req.user.id);

  res.status(200).json({
    id,
    firstname,
    lastname,
    username,
    email,
    birthyear,
  });
});

module.exports = {
  getUsers,
  searchUsers,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
  getProfile,
};
