const { DataTypes } = require("sequelize");
const Movie = require("./movie.model");
const User = require("./user.model");

const FavMovie = (sequelize) => {
  const favMovie = sequelize.define("movie", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    // foreign keys
    userId: {
      type: DataTypes.INTEGER,
      references: {
        //reference modek
        model: User,
        key: "id",
        // With PostgreSQL, it is optionally possible to declare when to check the foreign key constraint, passing the Deferrable type.
        deferrable: Deferrable.INITIALLY_IMMEDIATE,
      },
    },
    movieId: {
      type: DataTypes.INTEGER,
      references: {
        //reference modek
        model: Movie,
        key: "id",
        // With PostgreSQL, it is optionally possible to declare when to check the foreign key constraint, passing the Deferrable type.
        deferrable: Deferrable.INITIALLY_IMMEDIATE,
      },
    },
    create_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });
  return favMovie;
};

module.exports = FavMovie;
