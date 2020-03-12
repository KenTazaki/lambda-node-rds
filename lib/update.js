"use strict";

const mysql = require("mysql2/promise");
const db_data = require("../config/db");

module.exports = async (event, tableName) => {
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
    const sql = `UPDATE ${tableName} set ${sets} WHERE id = ?`;

    await connection.query(sql, id);
    const [result] = await connection.query(
      `SELECT * FROM ${tableName} WHERE id = ?`,
      id
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
