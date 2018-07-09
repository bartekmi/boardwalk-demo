// Add the controller which is responsible for the overall application
// Specific tasks: 
// * respond to query button
// * respond to shopping cart button
a2zApp.controller("MainController", function($scope, $location, $rootScope, ShoppingCartService) {

  $scope.searchText = '';
  $rootScope.searchText = '';
  
  $scope.cart = ShoppingCartService;

  $scope.search = function() {
    // Need two ways of communicating with query-results-controller:
    // 1. The $rootScope way for when we also do navigation from another page (e.g. 'Contact Us')
    // 2. The $broadcast way if we are NOT navigating. 
    // ... Neither way works in both cases
    $rootScope.searchText = $scope.searchText;
    $scope.$broadcast('userSearched', $scope.searchText);
    
    window.location = "#/home";
  };

  $scope.goToShoppingCart = function() {
    console.log("Go to Shopping Cart.");
    window.location = "#/shopping-cart";
  }
  
  // Show the features products on page load
  //$scope.search("");    
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