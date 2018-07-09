using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BoardwalkAPI2.Models {
    public class Product {
        public string Code { get; set; }
        public double Price { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }           // This is the URL of the image
    }
}