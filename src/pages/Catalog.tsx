import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ProductShowcase from "@/components/ProductShowcase";
import AIGeneratedShowcase from "@/components/AIGeneratedShowcase";
import CatalogFilters from "@/components/CatalogFilters";
import EnhancedProductCard, { type Product } from "@/components/EnhancedProductCard";
import ProductComparison from "@/components/ProductComparison";

const productsData: Product[] = [
  {
    id: 1,
    name: "Camiseta Básica Monkya",
    price: 45.90,
    originalPrice: 55.90,
    image: "./images/PolosMonkya01.png",
    category: "Polos",
    bananaPoints: 45000,
    reviewCount: 128,
    discount: 18,
    colors: ["Black", "White", "Beige"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    inStock: true,
    stockCount: 15,
    material: "Algodón Pima",
    isNew: false,
  },
  {
    id: 2,
    name: "Sudadera con Capucha",
    price: 89.90,
    image: "./images/PolosMonkya02.png",
    category: "Hoodies",
    bananaPoints: 72000,
    reviewCount: 89,
    colors: ["Black", "Petroleum Green"],
    sizes: ["M", "L", "XL"],
    inStock: true,
    stockCount: 8,
    material: "100% Algodón",
    isNew: true,
  },
  {
    id: 3,
    name: "Camiseta Premium Tech",
    price: 62.50,
    originalPrice: 79.90,
    image: "./images/PolosMonkya03.png",
    category: "Polos",
    bananaPoints: 58000,
    reviewCount: 203,
    discount: 22,
    colors: ["White", "Petroleum Green", "Beige"],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    stockCount: 22,
    material: "Premium Blend",
    isNew: true,
  },
  {
    id: 4,
    name: "Sudadera Oversize",
    price: 95.00,
    image: "./images/PolosMonkya04.png",
    category: "Oversized",
    bananaPoints: 81000,
    reviewCount: 156,
    colors: ["Black", "Beige"],
    sizes: ["L", "XL", "XXL"],
    inStock: false,
    material: "Algodón Pima",
    isNew: false,
  },
  {
    id: 5,
    name: "Camiseta Manga Larga",
    price: 52.90,
    image: "./images/PolosMonkya05.png",
    category: "Longsleeve",
    bananaPoints: 48000,
    reviewCount: 67,
    colors: ["Black", "White", "Petroleum Green"],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    stockCount: 5,
    material: "100% Algodón",
    isNew: false,
  },
  {
    id: 6,
    name: "Sudadera Zip Premium",
    price: 99.90,
    originalPrice: 115.00,
    image: "./images/PolosMonkya06.png",
    category: "Hoodies",
    bananaPoints: 85000,
    reviewCount: 234,
    discount: 13,
    colors: ["Black", "Petroleum Green"],
    sizes: ["M", "L", "XL", "XXL"],
    inStock: true,
    stockCount: 12,
    material: "Premium Blend",
    isNew: true,
  },
  {
    id: 7,
    name: "Polo Tech Urban Style",
    price: 38.90,
    image: "./images/PolosMonkya01v2.png",
    category: "Polos",
    bananaPoints: 35000,
    reviewCount: 94,
    colors: ["White", "Black", "Beige"],
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    stockCount: 18,
    material: "Algodón Pima",
    isNew: true,
  },
  {
    id: 8,
    name: "Hoodie Monkya Edition",
    price: 78.50,
    originalPrice: 89.90,
    image: "./images/PolosMonkya04v2.png",
    category: "Hoodies",
    bananaPoints: 65000,
    reviewCount: 142,
    discount: 13,
    colors: ["Black", "Petroleum Green", "Beige"],
    sizes: ["M", "L", "XL", "XXL"],
    inStock: true,
    stockCount: 7,
    material: "Premium Blend",
    isNew: true,
  },
];

const Catalog = () => {
  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedMaterial, setSelectedMaterial] = useState("all");
  const [sortBy, setSortBy] = useState("name-asc");
  const [priceRange, setPriceRange] = useState([30, 120]);
  const [minRating, setMinRating] = useState(0);
  const [showInStockOnly, setShowInStockOnly] = useState(false);

  // Pagination state
  const [itemsToShow, setItemsToShow] = useState(4); // Show 4 products initially (1 row of 4)
  const ITEMS_PER_LOAD = 4; // Load 4 more products per click

  // Comparison state
  const [compareProducts, setCompareProducts] = useState<number[]>([]);

  // Handle product comparison
  const handleCompareToggle = (productId: number) => {
    setCompareProducts((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      }
      if (prev.length >= 4) {
        return prev;
      }
      return [...prev, productId];
    });
  };

  const handleRemoveFromComparison = (productId: number) => {
    setCompareProducts((prev) => prev.filter((id) => id !== productId));
  };

  const handleClearComparison = () => {
    setCompareProducts([]);
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = [...productsData];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Material filter
    if (selectedMaterial !== "all") {
      const materialMap: Record<string, string> = {
        pima: "Algodón Pima",
        cotton100: "100% Algodón",
        premium: "Premium Blend",
      };
      filtered = filtered.filter(
        (product) => product.material === materialMap[selectedMaterial]
      );
    }

    // Price range filter
    filtered = filtered.filter(
      (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Banana Points filter
    filtered = filtered.filter((product) => product.bananaPoints >= minRating * 1000);

    // Stock filter
    if (showInStockOnly) {
      filtered = filtered.filter((product) => product.inStock);
    }

    // Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "rating-desc":
          return b.bananaPoints - a.bananaPoints;
        case "newest":
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [
    searchQuery,
    selectedCategory,
    selectedMaterial,
    sortBy,
    priceRange,
    minRating,
    showInStockOnly,
  ]);

  // Products to display (with pagination)
  const displayedProducts = filteredProducts.slice(0, itemsToShow);
  const hasMoreProducts = itemsToShow < filteredProducts.length;

  const handleLoadMore = () => {
    setItemsToShow((prev) => prev + ITEMS_PER_LOAD);
  };

  const productsToCompare = productsData.filter((p) =>
    compareProducts.includes(p.id)
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Product Showcase Section */}
      <ProductShowcase />

      {/* AI Generated Showcase Section */}
      <AIGeneratedShowcase />

      {/* Catalog Section */}
      <div className="container mx-auto px-4 py-16">
        {/* Title Section */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-5xl font-bold text-foreground md:text-6xl">
            Nuestro Catálogo
          </h1>
          <p className="mx-auto max-w-3xl text-xl text-muted-foreground md:text-2xl">
            Estos son los básicos Monkya… aunque de básicos no tienen nada 😜
            <br />
            <span className="mt-2 inline-block text-lg">
              Pídelos como están o suéltale la IA y crea tu propio caos con estilo.
            </span>
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <CatalogFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedMaterial={selectedMaterial}
            onMaterialChange={setSelectedMaterial}
            sortBy={sortBy}
            onSortChange={setSortBy}
            priceRange={priceRange}
            onPriceRangeChange={setPriceRange}
            minRating={minRating}
            onMinRatingChange={setMinRating}
            showInStockOnly={showInStockOnly}
            onStockFilterChange={setShowInStockOnly}
          />
        </div>

        {/* Product Counter */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-lg font-semibold text-muted-foreground">
            Mostrando {filteredProducts.length} de {productsData.length} productos
          </p>
          {compareProducts.length > 0 && (
            <p className="text-sm font-medium text-primary">
              {compareProducts.length} productos seleccionados para comparar
            </p>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {displayedProducts.map((product) => (
                <EnhancedProductCard
                  key={product.id}
                  product={product}
                  onCompare={handleCompareToggle}
                  isComparing={compareProducts.includes(product.id)}
                />
              ))}
            </div>

            {/* Load More Button */}
            {hasMoreProducts && (
              <div className="mt-12 text-center">
                <Button
                  onClick={handleLoadMore}
                  size="lg"
                  className="px-12 py-6 text-lg font-bold"
                >
                  Cargar Más Productos
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="py-20 text-center">
            <p className="text-2xl font-semibold text-muted-foreground">
              No se encontraron productos
            </p>
            <p className="mt-2 text-lg text-muted-foreground">
              Intenta ajustar los filtros de búsqueda
            </p>
          </div>
        )}
      </div>

      {/* Product Comparison Panel */}
      <ProductComparison
        products={productsToCompare}
        onRemove={handleRemoveFromComparison}
        onClear={handleClearComparison}
      />

      <Footer />
    </div>
  );
};

export default Catalog;
