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
        $scope.addBillModal = modal;
    });
    $ionicModal.fromTemplateUrl('bill-preview.html', {
        scope: $scope,
        animation: "slide-in-up"
    }).then(function(modal) {
        $scope.previewModal = modal;
    });
    $scope.openModal = function(modalName) {
        if (modalName === 'addBillModal')
            $scope.addBillModal.show();
        else if (modalName == 'previewModal')
            $scope.previewModal.show();
    };

    $scope.closeModal = function(modalName) {
        if (modalName === 'addBillModal')
            $scope.addBillModal.hide();
        else if (modalName == 'previewModal')
            $scope.previewModal.hide();
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

.controller('addBillCtrl', function($scope, billService) {
    $scope.sumUp = function() {
        var sum = 0;
        angular.forEach($scope.productsArray, function(value, key) {
            sum = sum + (parseInt(value.pprice) * parseInt(value.pquantity) || 0);
        });
        //console.log(sum);
        return isNaN(sum) ? 0 : sum;
    };
    $scope.printBill = function() {
        /*var popupWin = window.open('', '_blank', 'width=600,height=600,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
        popupWin.document.write('<!DOCTYPE html><html><head>' + '<link rel="stylesheet" type="text/css" href="style.css" />' + '</head><body onload="window.print()"><div class="reward-body">Hello Dinesh</div></body></html>');*/
        //window.print();
        billService.printIt();
    };
    $scope.previewBill = function() {
        //$scope.openModal('previewModal');
        $scope.previewBillBlock = '<div class="row billHeader">\
         < div class = "col-25" > < img src = "./img/logo.png"\
        height = "50px"\
        width = "50px" / >\
         < /div> < div class = "col-75 padding logo" >\
          INDIRA THREAD BALLS < /div > \
          < /div> < div class = "row billHeader" > \
          < div class = "col" > \
          < center > Contact: < strong > 7708898448 < /strong></center >\
            < /div> < /div > < div class = "row" >\
            < div class = "col-65" > To: < strong > < /strong></div >\
            < div class = "col-35" > Date: < /div> < /div > ';
        console.log($scope.bill.customer.shop_name);
    };

})
