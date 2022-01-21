
module.exports = {
    HOST: "localhost",
    USER: "sammy",
    PASSWORD: "SmartWork@123",
    DB: "newdb",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    PORT: 7575,
  };