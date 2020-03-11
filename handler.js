"use strict";

const getFunc = require("./lib/get");
const getAllFunc = require("./lib/getAll");
const createFunc = require("./lib/create");
const updateFunc = require("./lib/update");
const deleteFunc = require("./lib/delete");

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
  const response = await createFunc(event, "users");
  callback(null, response);
};

module.exports.updateUser = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const response = await updateFunc(event, "users");
  callback(null, response);
};

module.exports.deleteUser = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const response = await deleteFunc(event, "users");
  callback(null, response);
};
