// Import MySQL connection.
var connection = require("./config/connection.js");

// In the orm.js file, create the methods that will execute the necessary MySQL commands in the controllers. These are the methods you will need to use in order to retrieve and store data in your database.
	// selectAll() 
	// insertOne() 
	// updateOne()

var orm = {
  selectAll: function(tableInput, callback) {
    var queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      callback(result);
    });
  },
  insertOne: function(vals) {
  	var queryString = "INSERT INTO burgers (burger_name) VALUES ?;";
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
