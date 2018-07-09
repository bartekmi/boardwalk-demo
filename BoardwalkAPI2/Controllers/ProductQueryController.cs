using BoardwalkAPI2.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace BoardwalkAPI2.Controllers {
    public class ProductQueryController : ApiController {
        // GET: /api/ProductQuery
        public IEnumerable<Product> Get() {
            return new Product[] {
                new Product() {
                  Code= "123",
                  Price= 12.58,
                  Description= "14k Wire Bloom Earrings",
                  Image= "https=//cdn.shopify.com/s/files/1/0597/2185/products/18k-rose-gold-wire-bloom-earrings_afcace12-edfb-4c82-aba0-11462409947f.jpg?v=1406749652"
                },
                new Product() {
                  Code= "777",
                  Price= 1099.99,
                  Description= "18k Intertwined Earrings",
                  Image= "https=//cdn.shopify.com/s/files/1/0597/2185/products/18k-rose-gold-intertwined-earrings.jpg?v=1406731987"
                }
            };
        }
    }
}
