class Utils {
  toMoney(number) {
    if (number === undefined || number == null || number == 0.0)
      return "FREE";
    
    // Inspired by: https://stackoverflow.com/questions/149055/how-can-i-format-numbers-as-dollars-currency-string-in-javascript
    return "$" + number.toFixed(2);
  }
}

a2zApp.factory('UtilsService', function() {
  return new Utils();
});