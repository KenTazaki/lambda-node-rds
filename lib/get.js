"use strict";

const mysql = require("mysql2/promise");
const db_data = require("../config/db");

module.exports = async (event, tableName) => {
  let connection;

  try {
    connection = await mysql.createConnection(db_data);

    const id = event.pathParameters.id;
    const sql = `SELECT * FROM ${tableName} WHERE id = ?`;
    const [result] = await connection.query(sql, id);
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
