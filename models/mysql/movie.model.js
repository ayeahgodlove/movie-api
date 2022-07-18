const { DataTypes } = require("sequelize");
const { Genre } = require("./genre.model");
const { Director } = require("./director.model");
const { Actor } = require("./actor.model");

const Movie = (sequelize) => {
  const movie = sequelize.define("movie", {
    movieid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // Or DataTypes.UUIDV1
    },
    title: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    img_path: {
      type: DataTypes.STRING,
    },
    create_at: {
      type: DataTypes.DATE,
    },
    published_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },

    // foreign keys
    genreId: {
      type: DataTypes.INTEGER,
      references: {
        //reference modek
        model: Genre,
        key: "id",
        // With PostgreSQL, it is optionally possible to declare when to check the foreign key constraint, passing the Deferrable type.
        deferrable: Deferrable.INITIALLY_IMMEDIATE,
      },
    },
    directorId: {
      type: DataTypes.INTEGER,
      references: {
        //reference modek
        model: Director,
        key: "id",
        // With PostgreSQL, it is optionally possible to declare when to check the foreign key constraint, passing the Deferrable type.
        deferrable: Deferrable.INITIALLY_IMMEDIATE,
      },
    },
    actorId: {
      type: DataTypes.INTEGER,
      references: {
        //reference modek
        model: Actor,
        key: "id",
        // With PostgreSQL, it is optionally possible to declare when to check the foreign key constraint, passing the Deferrable type.
        deferrable: Deferrable.INITIALLY_IMMEDIATE,
      },
    },
  });
  return movie;
};

module.exports = Movie;
