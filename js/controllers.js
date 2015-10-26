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
            var createPopup = $ionicPopup.alert({
                title: 'Success',
                template: 'Added new Customer Successfully'
            });
            createPopup.then(function(res) {
                console.log('Added new Customer Successfully');
            });
        });
    };
})

.controller('productsCtrl', function($scope, $q, $ionicModal, customerService) {
    $scope.productsArray=[];
    $ionicModal.fromTemplateUrl('add-product.html',{
        scope:$scope,
        animation:"slide-in-up"
    }).then(function(modal){
        $scope.modal=modal;
    });
    
    $scope.openModal=function(){
        $scope.modal.show();
    };
    $scope.closeModal=function(){
        $scope.modal.hide();
    };

})

.controller('addProductCtrl',function($scope,$ionicPopup,customerService){
    
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
    $scope.settings = {
        enableFriends: true
    };
});
