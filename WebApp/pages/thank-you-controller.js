a2zApp.controller('ThankYouController', function($rootScope, $scope, UtilsService) {

  $scope.total = $rootScope.orderTotal;
  $scope.utils = UtilsService;
  
  $scope.backToShopping = function() {
    window.location = "#/home";
  }
});
