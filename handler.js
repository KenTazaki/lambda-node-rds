"use strict";

const mysql = require("mysql2/promise");
const db_data = require("./config/db");

const getFunc = require("./lib/get");
const getAllFunc = require("./lib/getAll");

module.exports.getUser = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const response = await getFunc(event, "users");
  callback(null, response);
};

module.exports.getAllUsers = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const response = await getAllFunc(event, "users");
  callback(null, response);
};

module.exports.createUser = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  let connection;
  try {
    connection = await mysql.createConnection(db_data);

    const object = JSON.parse(event.body);
    const keys = Object.keys(object);
    const values = keys.map(key => object[key]);
    const cols = keys.join(", ");
    const placeholders = values.map(_v => "?").join(", ");
    const sql = `INSERT into users(${cols}) values(${placeholders})`;

    await connection.query(sql, values);
    const [result] = await connection.query(
      "SELECT * FROM users WHERE id = LAST_INSERT_ID()"
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
      body: "Could not create Users: " + err
    });
    connection.end();
  }
};

module.exports.updateUser = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  let connection;
  try {
    connection = await mysql.createConnection(db_data);

    const object = JSON.parse(event.body);
    const id = event.pathParameters.id;
    const sets = Object.keys(object).map(key => {
      const v = object[key];
      const value = typeof v === "string" ? `'${v}'` : v;
      return `${key}=${value}`;
    });
    const sql = `UPDATE users set ${sets} WHERE id = ?`;

    await connection.query(sql, id);
    const [result] = await connection.query(
      "SELECT * FROM users WHERE id = ?",
      id
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
      body: "Could not create Users: " + err
    });
    connection.end();
  }
};

module.exports.deleteUser = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  let connection;
  try {
    connection = await mysql.createConnection(db_data);

    const id = event.pathParameters.id;
    const sql = `DELETE from users WHERE id = ?`;

    await connection.query(sql, id);
    connection.end();
    callback(null, {
      statusCode: 200,
      headers: { "Content-type": "application/json" },
      body: "User deleted!!"
    });
  } catch (err) {
    connection.end();
    callback(null, {
      statusCode: err.statusCode || 500,
      headers: { "Content-type": "application/json" },
      body: "Could not create Users: " + err
    });
    connection.end();
  }
};
