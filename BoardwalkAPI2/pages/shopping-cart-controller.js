a2zApp.controller('ShoppingCartController', function($rootScope, $scope, ShoppingCartService, UtilsService) {

  $scope.cart = ShoppingCartService;
  $scope.utils = UtilsService;

  $scope.removeFromCart = function(item) {
    console.log("Remove from Cart: " + item);
    ShoppingCartService.remove(item);
  }

  $scope.proceedToCheckout = function() {
    console.log("Proceed to Checkout");
    // Call the back-end here!
    $rootScope.orderTotal = ShoppingCartService.total();
    ShoppingCartService.emptyCart();
    window.location = "#/thank-you";
  }

  $scope.isCartEmpty = function() {
    return ShoppingCartService.isEmpty();
  }
});
