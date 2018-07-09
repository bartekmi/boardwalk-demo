describe("shopping-cart-service", function() {
  var cart;

  beforeEach(function() {
    cart = new ShoppingCart();
    
    cart.add({ code: '123', description: 'Product 123', price: 10.00 }, 1);
    cart.add({ code: '456', description: 'Product 456', price: 5.00 }, 2);
  });

  it("should calculate total, etc", function() {
    expect(cart.subtotal()).toEqual(20.0);
    expect(cart.tax()).toEqual(1.0);
    expect(cart.shipping()).toEqual(0.0);
    expect(cart.total()).toEqual(21.0);
    expect(cart.numberOfItemsInCart()).toEqual(3);
  });

  it("should know what's inside", function() {
    expect(cart.isInCart( { code: '123' } )).toBeTruthy();
    expect(cart.isInCart( { code: '999' } )).toBeFalsy();
  });

  it("can remove items", function() {
    expect(cart.isEmpty()).toBeFalsy();
    
    cart.remove(cart.items[1]);
    expect(cart.items.length).toEqual(1);
    expect(cart.isInCart( { code: '123' } )).toBeTruthy();
    expect(cart.isInCart( { code: '456' } )).toBeFalsy();
    
    cart.remove(cart.items[0]);
    expect(cart.items.length).toEqual(0);
    expect(cart.isEmpty()).toBeTruthy();
  });
  
  it ("can empty cart", function() {
    expect(cart.isEmpty()).toBeFalsy();
    cart.emptyCart();
    expect(cart.isEmpty()).toBeTruthy();
  });
  
  it("should restore", function() {
    // saving should already have been done as a consequence of of cart.add()
    var restored = new ShoppingCart();
    restored.restore();
    
    expect(restored.items.length).toEqual(2);
    restored.items.forEach(i => expect(i instanceof ShoppingCartItem).toBeTruthy());
    
    // Verify correct order 
    expect(restored.items[0].product.code).toEqual('123');
    expect(restored.items[1].product.code).toEqual('456');
    
    // Verify data for first item
    expect(restored.items[0].quantity).toEqual(1);
    expect(restored.items[0].product.description).toEqual('Product 123');
    
    // Verify that methods still work
    expect(restored.total()).toEqual(21.0);
  });

});
