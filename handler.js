"use strict";

const mysql = require("mysql2/promise");
const db_data = require("./config/db");

module.exports.getUser = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    let connection = await mysql.createConnection(db_data);
    const [result] = await connection.query(
      "SELECT * FROM users WHERE id = ?",
      event.pathParameters.id
    );
    connection.end();
    callback(null, {
      statusCode: 200,
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(result[0])
    });
  } catch (err) {
    connection.end();
    callback(null, {
      statusCode: err.statusCode || 500,
      headers: { "Content-type": "application/json" },
      body: "Could not find User: " + err
    });
  } finally {
    connection.end();
  }
};

module.exports.getAllUsers = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    let connection = await mysql.createConnection(db_data);
    const [result] = await connection.query("SELECT * FROM users");
    connection.end();
    callback(null, {
      statusCode: 200,
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(result)
    });
  } catch (err) {
    connection.end();
    callback(null, {
      statusCode: err.statusCode || 500,
      headers: { "Content-type": "application/json" },
      body: "Could not find Users: " + err
    });
  } finally {
    connection.end();
  }
};
