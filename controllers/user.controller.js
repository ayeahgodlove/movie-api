const asyncHandler = require("express-async-handler");
const User = require("../models/mysql/user.model");
const { mySQLSequelize } = require("../config/db-mysql.config");
const operation = User(mySQLSequelize);

const getUsers = asyncHandler(async (req, res) => {
  const users = await operation.findAll();
  res.status(200).json(users);
});

// Find a single Tutorial with an id
const searchUsers = asyncHandler(async (req, res) => {
  const searchParam = req.params.search;
  const allUsers = await operation.findAll();

  const filteredUsers = allUsers.filter((user) =>
    (user.firstname + user.lastname + user.username).toLowerCase().includes(searchParam.toString().toLowerCase())
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
    created_at: new Date(),
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

module.exports = {
  getUsers,
  searchUsers,
  createUser,
  updateUser,
  deleteUser,
};
