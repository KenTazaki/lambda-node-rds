"use strict";

const mysql = require("mysql2/promise");
const db_data = require("../config/db");

module.exports = async (event, tableName) => {
  let connection;

  try {
    connection = await mysql.createConnection(db_data);

    const object = JSON.parse(event.body);
    const keys = Object.keys(object);
    const values = keys.map(key => object[key]);
    const cols = keys.join(", ");
    const placeholders = values.map(_v => "?").join(", ");
    const sql = `INSERT into ${tableName}(${cols}) values(${placeholders})`;

    await connection.query(sql, values);
    const [result] = await connection.query(
      `SELECT * FROM ${tableName} WHERE id = LAST_INSERT_ID()`
    );
    connection.end();

    return {
      statusCode: 200,
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(result[0])
    };
  } catch (err) {
    connection.end();

    return {
      statusCode: err.statusCode || 500,
      headers: { "Content-type": "application/json" },
      body: "Could not find User: " + err
    };
  }
};
