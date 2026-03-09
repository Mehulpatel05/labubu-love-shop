import { useEffect, useState } from "react";
import { fetchProducts, type Product } from "@/lib/products";
import ProductCard from "./ProductCard";
import { Search } from "lucide-react";

const categories = [
  { id: "all", label: "All" },
  { id: "phone", label: "Phone" },
  { id: "case", label: "Cases" },
  { id: "accessories", label: "Accessories" },
];

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    fetchProducts().then((p) => { 
      setProducts(p); 
      setFilteredProducts(p);
      setLoading(false); 
    }).catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    let filtered = products;
    
    if (selectedCategory !== "all") {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(selectedCategory) ||
        p.short_description.toLowerCase().includes(selectedCategory)
      );
    }
    
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.short_description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, products]);

  return (
    <section id="products" className="py-10 sm:py-16 bg-background">
      <div className="container">
        <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-extrabold text-center text-foreground mb-2">
          Our Products
        </h2>
        <p className="text-center text-muted-foreground text-sm mb-6">
          Browse our adorable Labubu collection
        </p>
        
        <div className="max-w-md mx-auto mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>

        <div className="flex gap-2 justify-center mb-8 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                selectedCategory === cat.id
                  ? "bg-primary text-primary-foreground shadow-cute"
                  : "bg-card border hover:border-primary"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-12 text-muted-foreground">Loading products...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">No products found</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8 max-w-5xl mx-auto">
            {filteredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
