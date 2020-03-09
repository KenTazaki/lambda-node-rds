require("dotenv").config();

module.exports = {
  host: process.env.DATABASE_ENDPOINT,
  port: process.env.DATABASE_PORT,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME
};
