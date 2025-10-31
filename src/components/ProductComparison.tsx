import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Product } from "./EnhancedProductCard";

interface ProductComparisonProps {
  products: Product[];
  onRemove: (productId: number) => void;
  onClear: () => void;
}

const ProductComparison = ({
  products,
  onRemove,
  onClear,
}: ProductComparisonProps) => {
  if (products.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t-2 border-primary bg-card shadow-2xl">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold">
            Comparar Productos ({products.length})
          </h3>
          <Button variant="ghost" size="sm" onClick={onClear}>
            Limpiar todo
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="relative rounded-lg border-2 border-border bg-background p-3"
            >
              <button
                onClick={() => onRemove(product.id)}
                className="absolute -right-2 -top-2 z-10 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
              >
                <X className="h-4 w-4" />
              </button>

              <img
                src={product.image}
                alt={product.name}
                className="mb-2 h-24 w-full rounded object-cover"
              />
              <p className="mb-1 text-sm font-semibold line-clamp-1">
                {product.name}
              </p>
              <p className="mb-2 text-lg font-bold text-primary">
                S/ {product.price.toFixed(2)}
              </p>

              <div className="space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Material:</span>
                  <Badge variant="secondary" className="text-xs">
                    {product.material}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Puntos:</span>
                  <span className="font-medium text-yellow-600">{product.bananaPoints.toLocaleString()}p</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Stock:</span>
                  <Badge
                    variant={product.inStock ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {product.inStock ? "Disponible" : "Agotado"}
                  </Badge>
                </div>
              </div>
            </div>
          ))}

          {products.length < 4 && (
            <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 p-3">
              <p className="text-center text-sm text-muted-foreground">
                Añade más productos para comparar
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductComparison;
