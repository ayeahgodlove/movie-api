module.exports = {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "admin@2022",
  DB: "christain-movie-db",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
