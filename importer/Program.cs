using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using boardwalk.db;

namespace importer {
    // This is a one-time use program to import 
    class Program {

        private static int _nextId = 1;
        private const string CSV_DIR = @"C:\Boardwalk\Shopify-Product-CSVs-and-Images\CSVs";

        static void Main(string[] args) {
            List<Product> allProducts = new List<Product>();

            foreach (string csvPath in Directory.EnumerateFiles(CSV_DIR, "*.csv")) {
                if (csvPath.Contains("Clean")) {
                    Console.WriteLine("Processing File: " + Path.GetFileName(csvPath));
                    List<Product> products = ReadCsv(csvPath);
                    allProducts.AddRange(products);

                    foreach (Product product in products)
                        Console.WriteLine(product);
                }
            }

            StroreInDatabase(allProducts);

            Console.WriteLine(string.Format("Extracted {0} products", allProducts.Count));
            Console.ReadLine();
        }

        #region Parse CSV
        private static List<Product> ReadCsv(string csvPath) {
            string filename = Path.GetFileName(csvPath);
            string[] lines = ReadAllLinesEvenIfLocked(csvPath);
            List<Product> products = new List<Product>();

            for (int ii = 1; ii < lines.Length; ii++) {        // The first row is headers
                string line = lines[ii];
                string[] pieces = line.Split(',');

                string n = Get(pieces, 'M', ii);
                string b = Get(pieces, 'B', ii);
                string priceAsString = Get(pieces, 'S', ii);
                if (!double.TryParse(priceAsString, out double price)) {
                    Warn(filename, ii, "Could not parse price from " + priceAsString);
                    continue;
                }

                Product product = new Product() {
                    code = (_nextId++).ToString(),
                    price = price,
                    description = string.IsNullOrWhiteSpace(n) ? b : n,     // Column n seems to have more useful info than b, but b is a fall-back
                    image = Get(pieces, 'X', ii)
                };

                if (string.IsNullOrWhiteSpace(product.description)) {
                    Warn(filename, ii, "Description is blank");
                    continue;
                }

                if (string.IsNullOrWhiteSpace(product.image)) {
                    Warn(filename, ii, "Image is blank");
                    continue;
                }

                if (string.IsNullOrWhiteSpace(product.image)) {
                    Warn(filename, ii, "Image is blank");
                    continue;
                }

                if (!product.image.StartsWith("http")) {
                    Warn(filename, ii, "Image does not start with 'http': " + product.image);
                    continue;
                }

                products.Add(product);
            }

            return products;
        }

        private static string[] ReadAllLinesEvenIfLocked(string filename) {
            List<string> lines = new List<string>();

            string line = null;
            using (StreamReader reader = new StreamReader(OpenStreamEvenIfLocked(filename)))
                while ((line = reader.ReadLine()) != null)
                    lines.Add(line);

            return lines.ToArray();
        }

        public static FileStream OpenStreamEvenIfLocked(string filename) {
            return new FileStream(filename, FileMode.Open, FileAccess.Read, FileShare.ReadWrite);
        }

        // Get data at Excel column
        private static string Get(string[] data, char column, int csvRowIndex) {
            int index = (column - 'A');
            if (index >= data.Length)
                return null;

            return data[index];
        }
        #endregion

        #region Store to Database

        private static void StroreInDatabase(List<Product> allProducts) {
            throw new NotImplementedException();
        }
        #endregion

        #region Utilities

        private static void Warn(string filename, int ii, string warning) {
            int csvRow = ii + 1;
            Console.WriteLine("WARNING at {0}:{1} - {2}", filename, csvRow, warning);
        }
        #endregion
    }
}
