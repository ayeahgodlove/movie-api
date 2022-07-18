module.exports = {
  HOST: "http://localhost:5000",
  USER: "root",
  PASSWORD: "",
  DB: "christain-movies-app",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
