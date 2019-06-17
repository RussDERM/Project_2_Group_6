require("dotenv").config();

if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  module.exports = {
    development: {
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      dialect: "mysql",
      port: process.env.DB_PORT
    },
    test: {
      username: "root",
      password: null,
      database: "testdb",
      host: "localhost",
      dialect: "mysql",
      logging: false
    },
    production: {
      use_env_variable: "JAWSDB_URL",
      dialect: "mysql"
    }
  };
}
