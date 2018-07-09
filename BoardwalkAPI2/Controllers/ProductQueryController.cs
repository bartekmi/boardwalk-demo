using boardwalk.db;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace BoardwalkAPI2.Controllers {
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ProductQueryController : ApiController {
        // GET: /api/ProductQuery
        public IEnumerable<Product> Get(string searchText) {
            return new Product[] {
                new Product() {
                  code= "123",
                  price= 12.58,
                  description= "14k From API",
                  image= "https://cdn.shopify.com/s/files/1/0597/2185/products/18k-rose-gold-wire-bloom-earrings_afcace12-edfb-4c82-aba0-11462409947f.jpg?v=1406749652"
                },
                new Product() {
                  code= "777",
                  price= 888.77,
                  description= "18k From API",
                  image= "https://cdn.shopify.com/s/files/1/0597/2185/products/18k-rose-gold-intertwined-earrings.jpg?v=1406731987"
                }
            };
        }
    }
}
