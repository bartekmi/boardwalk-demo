using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace boardwalk.db {

    [Table("product", Schema = "public")]
    public class Product {
        [Key]
        public int id { get; set; }

        public string code { get; set; }
        public double price { get; set; }
        public string description { get; set; }
        public string image { get; set; }           // This is the URL of the image

        public override string ToString() {
            return string.Format("SKU = {0}, Description = {1}, Price = {2}", code, description, price);
        }
    }
}