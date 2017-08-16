// Import MySQL connection.
var connection = require("./connection.js");

function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

// Helper function for SQL syntax.
function objToSql(ob) {
  var arr = [];

  for (var key in ob) {
    if (Object.hasOwnProperty.call(ob, key)) {
      arr.push(key + "=" + ob[key]);
    }
  }

  return arr.toString();
}

var orm = {
  selectAll: function(callback) {
    var queryString = "SELECT * FROM burgers;";
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      callback(result);
    });
  },

  // LOOK AT THE 15-SEQUELIZE-01-CHIRPY EXAMPLE TO HELP HERE!!! //
  insertOne: function(cols, vals, callback) {
    var queryString = "INSERT INTO burgers (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";
  	
console.log(queryString);
    connection.query(queryString, vals, function(err, result) {
  		if (err) {
  			throw err;
  		}
  		callback(result);
  	});
  },
  // An example of objColVals would be {burger_name: Double Cheese, devoured: true}
  updateOne: function(objColVals, condition, callback) {
    var queryString = "UPDATE burgers SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    console.log(queryString);
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      callback(result);
    });
  }
};

// Export the ORM to use.
module.exports = orm;
