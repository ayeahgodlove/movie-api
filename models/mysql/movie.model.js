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
    videoPath: {
      type: DataTypes.STRING
    },
    imgPath: {
      type: DataTypes.STRING,
    },
    banner: {
      type: DataTypes.STRING,
    },
    published: {
      type: DataTypes.DATE,
    },

    // foreign keys
    genreId: {
      type: DataTypes.INTEGER,
      references: {
        //reference modek
        model: Genre,
        key: "id",
      },
    },
    directorId: {
      type: DataTypes.INTEGER,
      references: {
        //reference modek
        model: Director,
        key: "id",
      },
    },
    actorId: {
      type: DataTypes.INTEGER,
      references: {
        //reference modek
        model: Actor,
        key: "id",
      },
    },
  });
  return movie;
};

module.exports = Movie;
