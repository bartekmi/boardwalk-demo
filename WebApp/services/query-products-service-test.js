describe("query-products-service", function() {
  var query;

  beforeEach(function() {
    query = new QueryProduct();
  });

  it("should return featured products if args are empty", function() {
    var products = query.queryProducts("");
    expect(products.length).toBeGreaterThan(0);
  });
});
