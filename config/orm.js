// Import MySQL connection.
var connection = require("./connection.js");


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
  insertOne: function(vals) {
  	var queryString = "INSERT INTO burgers (burger_name) VALUES ?";
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
