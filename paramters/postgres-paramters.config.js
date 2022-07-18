module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "Postgres@2022",
  DB: "testdb",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
