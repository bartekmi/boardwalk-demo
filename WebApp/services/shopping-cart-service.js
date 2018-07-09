class ShoppingCartItem {
  constructor(product, quantity) {
    this.product = product;
    this.quantity = quantity;
  }

  total() {
    return this.product.price * this.quantity;
  }
}

class ShoppingCart {

  constructor() {
    this.items = [];
  }

  add(product, quantity = 1) {
    var item = new ShoppingCartItem(product, quantity);
    this.items.push(item);
    this.save();

    console.log("Contents of shopping cart: \r\n" + this);
  }

  remove(item) {
    var index = this.items.indexOf(item);
    if (index >= 0) {
      this.items.splice(index, 1);
    }
    this.save();
  }
  
  emptyCart() {
    this.items = [];
    this.save();
  }

  isInCart(product) {
    for (var ii = 0; ii < this.items.length; ii++) {
      var item = this.items[ii];
      if (item.product.code == product.code)
        return true;
    };

    return false;
  }
  
  numberOfItemsInCart() {
    var count = 0;
    this.items.forEach(i => count += i.quantity);
    return count;
  }

  subtotal() {
    var total = 0.0;
    this.items.forEach(i => total += i.total());
    return total;
  }

  shipping() {
    // Obviously, this is a stub
    return 0.0;
  }

  // Obviously, this is a stub too, since tax should be location-dependent
  tax() {
    var GST = 0.05;
    return this.subtotal() * GST;
  }

  total() {
    return this.subtotal() + this.shipping() + this.tax();
  }

  isEmpty() {
    return this.items.length == 0;
  }

  save() {
    window.localStorage.setItem("ShoppingCart", JSON.stringify(this.items));
  }
  
  restore() {
    var itemsAsString = window.localStorage.getItem("ShoppingCart");
    var rawItems = JSON.parse(itemsAsString);
    
    // This is needed because the data read from local storage will parse to raw
    // objects, not instances of our ShoppingCartItem's
    rawItems.forEach(r => this.items.push(new ShoppingCartItem(r.product, r.quantity)));
  }

  toString() {
    var string = "";
    this.items.forEach(i => string += 
                       "Code = " + i.product.code + 
                       ". Description = " + i.product.description +
                       ". Quantity = " + i.quantity + "\r\n");
    return string;
  }
}

// Register the service. Singleton will be created on-demand, including restoring from local storage
a2zApp.factory('ShoppingCartService', function() {
  var cart = new ShoppingCart();
  cart.restore();
  return cart;
});