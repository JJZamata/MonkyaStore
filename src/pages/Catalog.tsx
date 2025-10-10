import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const products = [
  {
    id: 1,
    name: "Camiseta Básica",
    price: "24.99€",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
  },
  {
    id: 2,
    name: "Sudadera con Capucha",
    price: "49.99€",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop",
  },
  {
    id: 3,
    name: "Camiseta Premium",
    price: "34.99€",
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400&h=400&fit=crop",
  },
  {
    id: 4,
    name: "Sudadera Oversize",
    price: "54.99€",
    image: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=400&h=400&fit=crop",
  },
  {
    id: 5,
    name: "Camiseta Manga Larga",
    price: "29.99€",
    image: "https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=400&h=400&fit=crop",
  },
  {
    id: 6,
    name: "Sudadera Zip",
    price: "59.99€",
    image: "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?w=400&h=400&fit=crop",
  },
];

const Catalog = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-12">
        <h1 className="mb-8 text-4xl font-bold text-foreground">
          Nuestro Catálogo
        </h1>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="group overflow-hidden rounded-lg border border-border bg-card shadow-[var(--shadow-card)] transition-all hover:shadow-[var(--shadow-yellow)]"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="mb-2 text-xl font-semibold text-card-foreground">
                  {product.name}
                </h3>
                <p className="mb-4 text-2xl font-bold text-primary">
                  {product.price}
                </p>
                <Link to="/customize">
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                    Personalizar
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Catalog;
