const config = require("./index");
const { username, password, database, host } = config.db;


module.exports = {
  "development": {
    "username": username,
    "password": password,
    "database": database,
    "host": host,
    "dialect": "postgres",
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  }
}



