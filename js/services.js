var mysql = require('mysql');
var connection=mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"toor",
  database:"icb"
});
angular.module('icb.services', [])


.factory('customerService', function($q) {
  // Might use a resource here that returns a JSON array

 function createCustomer(customer){
  var deferred=$q.defer();
  var insertQuery="INSERT INTO customers SET ?";
  connection.query(insertQuery,customer,function(err,res){
    if(err) deferred.reject(err);
    deferred.resolve(res.insertId);
  });
  return deferred.promise;
 }

 function getCustomers(){
  var deferred=$q.defer();
  var selectQuery="SELECT * FROM customers";
  connection.query(selectQuery,function(err,res){
    if(err)deferred.reject(err);
    deferred.resolve(res);
  });
  return deferred.promise;
 }
  
  return{
    addCustomer:createCustomer,
    listAllCustomers:getCustomers
  };

  /*return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };*/
});
