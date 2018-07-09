describe("uils-service", function() {
  var utils;

  beforeEach(function() {
    utils = new Utils();
  });

  it("should format empty money", function() {
    expect(utils.toMoney(null)).toEqual('FREE');
    expect(utils.toMoney(0.0)).toEqual('FREE');
  });

  it("should format non-empty money", function() {
    expect(utils.toMoney(2)).toEqual('$2.00');
    expect(utils.toMoney(3.121)).toEqual('$3.12');
    expect(utils.toMoney(3.129)).toEqual('$3.13');
  });
});
