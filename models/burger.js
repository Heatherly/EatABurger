// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var burger = {
  selectAll: function(callback) {
    orm.selectAll(function(res) {
      callback(res);
    });
  },
  insertOne: function(cols, vals, callback) {
    orm.insertOne(cols, vals, function(res) {
      callback(res);
    });
  },
  updateOne: function(objColVals, condition, callback) {
    orm.updateOne(objColVals, condition, function(res) {
      callback(res);
    });
  },

};

// Export the database functions for the controller (burgers_controller.js).
module.exports = burger;
