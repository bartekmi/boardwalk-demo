a2zApp.controller('QueryController', function($rootScope, $scope, $http, ShoppingCartService) {

  // Listen to the 'userSearched' event generated by parent controller (index.js)
  $scope.$on('userSearched', function (event, searchText) {
    console.log('User Searched event received: ' + searchText); 
    queryProducts(searchText);
  });

  $scope.addToCart = function(product) {
    ShoppingCartService.add(product);
    window.location = "#/shopping-cart";
  }

  $scope.isInCart = function(product) {
    return ShoppingCartService.isInCart(product);
  }

  // See detailed explanation in index.js for why it is necessary to call this
  // both as a result of the 'userSearched' event and the controller constructor
  // If searchText is blank, the API returns a list of Featured Products.
  function queryProducts(searchText) {
    console.log("Executing Search with text: " + searchText);
    $scope.isShowingFeaturedProducts = (searchText == null || !(/\S/.test(searchText)));

    // TODO: make data url-friendly?
    var url = '/api/ProductQuery/' + searchText;

    $http.get(url)
      .then(function(okResponse) {
      $scope.products = okResponse.data;
      window.location = "#/home";
    }, function(errorResponse) {
      console.log("Error in " + url);
      console.log(errorResponse);
    });
  }

  queryProducts($rootScope.searchText);
});
