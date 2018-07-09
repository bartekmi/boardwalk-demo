// Add the controller which is responsible for the overall application
// Specific tasks: 
// * respond to query button
// * respond to shopping cart button
a2zApp.controller("MainController", function($scope, $location, $rootScope, ShoppingCartService) {

  $scope.searchText = '';
  $scope.cart = ShoppingCartService;

  $scope.search = function() {
    console.log("Search clicked");
    window.location = "#/home";
    $scope.$broadcast('userSearched', $scope.searchText);
  };

  $scope.goToShoppingCart = function() {
    console.log("Go to Shopping Cart.");
    window.location = "#/shopping-cart";
  }
});

// Set up the routes/navigation
a2zApp.config(function($routeProvider, $locationProvider) {

  // https://stackoverflow.com/questions/41214312/exclamation-mark-after-hash-in-angularjs-app
  $locationProvider.hashPrefix('');

  $routeProvider
    .when('/home', {
    templateUrl : 'pages/query-results.html',
    controller  : 'QueryController'
  })
    .when('/shopping-cart', {
    templateUrl : 'pages/shopping-cart.html',
    controller  : 'ShoppingCartController'
  })
    .when('/thank-you', {
    templateUrl : 'pages/thank-you.html',
    controller  : 'ThankYouController'
  })
    .when('/about', {
    templateUrl : 'pages/about.html'
  })
    .when('/contact', {
    templateUrl : 'pages/contact-us.html'
  })

    .otherwise({redirectTo: '/home'});
});