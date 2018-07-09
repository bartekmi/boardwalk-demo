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

        private const int MAX_ITEMS = 300;

        // GET: /api/ProductQuery/<searchText>
        public IEnumerable<Product> Get(string searchText) {

            using (BoardwalkContext context = new BoardwalkContext()) {
                return context.Products
                    .Where(x => x.description.Contains(searchText.Trim()))
                    .Take(MAX_ITEMS)
                    .ToList();
            }
        }

        // GET: /api/ProductQuery
        // If searchText is missing, interpret the request to get 'Featured' products
        public IEnumerable<Product> Get() {

            using (BoardwalkContext context = new BoardwalkContext()) {
                return context.Products
                    .Where(x => x.isfeatured)
                    .ToList();
            }
        }
    }
}
