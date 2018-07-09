using System;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;

namespace boardwalk.db {
    public partial class BoardwalkContext : DbContext {
        public virtual DbSet<Product> Products { get; set; }
    }
}
