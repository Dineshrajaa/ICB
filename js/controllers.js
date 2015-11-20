angular.module('icb.controllers', [])

/*Controller for Fixing the Window Name issue*/
.controller('nameCtrl', function($scope) {


    $scope.$on('$ionicView.afterEnter', function(ev, data) {
        ev.stopPropagation();
    });

})

/*Controller for Customers Module*/
.controller('customersCtrl', function($scope, $q, $ionicModal, customerService) {
    // Add-Customer Modal Methods
    $scope.customersArray = [];
    $ionicModal.fromTemplateUrl('add-customer.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });

    $scope.openModal = function() {
        $scope.modal.show();
    };

    $scope.closeModal = function() {
        $scope.modal.hide();
        $scope.listAllCustomers();
    };

    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });

    $scope.listAllCustomers = function() {
        customerService.listAllCustomers().then(function(customers) {
            $scope.customersArray = [].concat(customers);
            console.log($scope.customersArray);
        });
    };
    $scope.listAllCustomers();

})

.controller('addCustomerCtrl', function($scope, $ionicPopup, customerService) {
    //Create Customer Method

    $scope.addCustomer = function() {

        var customer = {
            "name": $scope.customer.name,
            "shop_name": $scope.customer.shopname,
            "phone": $scope.customer.phone
        };
        customerService.addCustomer(customer).then(function(affectedrows) {
            $scope.closeModal();
            var createCustomerPopup = $ionicPopup.alert({
                title: 'Success',
                template: 'Added new Customer Successfully'
            });
            createCustomerPopup.then(function(res) {
                console.log('Added new Customer Successfully');
            });
        });
    };
})

.controller('productsCtrl', function($scope, $q, $ionicModal, productService) {
    $scope.productsArray = [];
    $ionicModal.fromTemplateUrl('add-product.html', {
        scope: $scope,
        animation: "slide-in-up"
    }).then(function(modal) {
        $scope.modal = modal;
    });

    $scope.openModal = function() {
        $scope.modal.show();
    };
    $scope.closeModal = function() {
        $scope.modal.hide();
        $scope.listProducts();
    };

    $scope.listProducts = function() {
        productService.listAllProducts().then(function(products) {
            $scope.productsArray = [].concat(products);
        });
    };
    $scope.listProducts();
})

.controller('addProductCtrl', function($scope, $ionicPopup, productService) {

    $scope.addProduct = function() {

        var product = {
            "pname": $scope.products.pname,
            "pcount": $scope.products.pcount,
            "pprice": $scope.products.pprice,
            "pcolor": $scope.products.pcolor
        };

        productService.addProduct(product).then(function(affectedrows) {
            console.log(affectedrows);
            $scope.closeModal();
            var createProductPopup = $ionicPopup.alert({
                title: 'Success',
                template: 'Added new Product Successfully'
            });
            createProductPopup.then(function(res) {
                console.log("Added new Product Successfully");
            });
        });
    };


})

.controller('billsCtrl', function($scope, $q, $ionicModal, customerService, productService) {
    $scope.customersArray = [], $scope.productsArray = [];
    $ionicModal.fromTemplateUrl('add-bill.html', {
        scope: $scope,
        animation: "slide-in-up"
    }).then(function(modal) {
        $scope.modal = modal;
    });

    $scope.openModal = function() {
        $scope.modal.show();
    };

    $scope.closeModal = function() {
        $scope.modal.hide();
    };
    $scope.listAllCustomers = function() {
        customerService.listAllCustomers().then(function(customers) {
            $scope.customersArray = [].concat(customers);
            console.log($scope.customersArray);
        });
    };
    $scope.listAllProducts = function() {
        productService.listAllProducts().then(function(products) {
            $scope.productsArray = [].concat(products);
        })
    }

    $scope.listAllCustomers();
    $scope.listAllProducts();
})

.controller('addBillCtrl', function($scope) {
    $scope.sumUp = function() {
        var sum = 0;
        /*for (var i = 0; i<$scope.productsArray.length; i++) {
            sum += parseInt($scope.productsArray[i].pprice)*parseInt($scope.productsArray[i].pquantity);
        }*/

        angular.forEach($scope.productsArray, function(value, key) {
            sum = sum + (parseInt(value.pprice) * parseInt(value.pquantity)||0);
        });
        console.log(sum);
        return isNaN(sum) ? 0 : sum;
    }

})
