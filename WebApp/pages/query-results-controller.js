a2zApp.controller('QueryController', function($scope, $http, ShoppingCartService) {

  //  $scope.products = [
  //    {
  //      code: '123',
  //      price: 12.58,
  //      description: '14k Wire Bloom Earrings',
  //      image: 'https://cdn.shopify.com/s/files/1/0597/2185/products/18k-rose-gold-wire-bloom-earrings_afcace12-edfb-4c82-aba0-11462409947f.jpg?v=1406749652'
  //    },
  //    {
  //      code: '777',
  //      price: 1099.99,
  //      description: '18k Intertwined Earrings',
  //      image: 'https://cdn.shopify.com/s/files/1/0597/2185/products/18k-rose-gold-intertwined-earrings.jpg?v=1406731987'
  //    }
  //  ];

  $scope.$on('userSearched', function (event, data) {
    console.log('User Search event received: ' + data); 
    
    // TODO: user relative URL
    // TODO: make data url-friendly?
    var url = '/api/ProductQuery/' + data;
    
    $http.get(url)
    .then(function(okResponse) {
      $scope.products = okResponse.data;
      window.location = "#/home";
    }, function(errorResponse) {
      console.log("Error in " + url);
      console.log(errorResponse);
    });

  });

  $scope.addToCart = function(product) {
    ShoppingCartService.add(product);
    window.location = "#/shopping-cart";
  }

  $scope.isInCart = function(product) {
    return ShoppingCartService.isInCart(product);
  }

});
