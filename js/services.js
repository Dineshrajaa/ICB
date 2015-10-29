var mysql = require('mysql');
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "toor",
    database: "icb"
});
angular.module('icb.services', [])


.factory('customerService', function($q) {

    function createCustomer(customer) {
        var deferred = $q.defer();
        var insertQuery = "INSERT INTO customers SET ?";
        connection.query(insertQuery, customer, function(err, res) {
            if (err) deferred.reject(err);
            deferred.resolve(res.insertId);
        });
        return deferred.promise;
    }

    function getCustomers() {
        var deferred = $q.defer();
        var selectQuery = "SELECT * FROM customers";
        connection.query(selectQuery, function(err, res) {
            if (err) deferred.reject(err);
            deferred.resolve(res);
        });
        return deferred.promise;
    }

    return {
        addCustomer: createCustomer,
        listAllCustomers: getCustomers
    };

})

.factory('productService', function($q) {

    function createProduct(product) {
        var deferred = $q.defer();
        var insertQuery = "INSERT INTO products SET ?";
        connection.query(insertQuery, product, function(err, res) {
            if (err) deferred.reject(err);
            deferred.resolve(res);
        });
        return deferred.promise;
    }

    function getProducts(){
      var deferred=$q.defer();
      var selectQuery="SELECT * FROM products";
      connection.query(selectQuery,function(err,res){
        if(err) deferred.reject(err);
        deferred.resolve(res);
      });
      return deferred.promise;
    }

    return{
      addProduct:createProduct,
      listAllProducts:getProducts
    };
})

.factory('billService',function($q){

});
