class QueryProduct {

  constructor($resource) {
    this.$resource = $resource;
  }

  queryProducts(searchText) {
    return this.$resource('http://localhost:55345/api/ProductQuery', {}, {});
  }
}

a2zApp.factory('QueryProductService', function($resource) {
  return new QueryProduct($resource);
});
