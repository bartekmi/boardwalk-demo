using System;
using System.Collections.Generic;
using boardwalk.db;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Linq;

namespace BoardwalkAPI2.Controllers {
    [TestClass]
    public class ProductQueryControllerTest {

        private ProductQueryController _controller = new ProductQueryController();

        [TestMethod]
        public void ProductQueryController_FeaturedProducts() {
            IEnumerable<Product> products = _controller.Get("  ");
            Assert.AreEqual(10, products.Count());
        }

        [TestMethod]
        public void ProductQueryController_SearchedProducts() {
            IEnumerable<Product> products = _controller.Get("Blue");
            Assert.AreEqual(40, products.Count());
        }
    }
}
