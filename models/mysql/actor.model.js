const { DataTypes } = require("sequelize");

const Actor = (sequelize) => {
  const actor = sequelize.define("actor", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthyear: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    deathyear: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });
  return actor;
};

module.exports = Actor;
