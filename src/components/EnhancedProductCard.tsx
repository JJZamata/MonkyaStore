import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingCart, GitCompare } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  bananaPoints: number;
  reviewCount: number;
  discount?: number;
  colors: string[];
  sizes: string[];
  inStock: boolean;
  stockCount?: number;
  material: string;
  isNew?: boolean;
}

// Banana icon component
const BananaIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20.5 10c-.276 0-.5.224-.5.5s.224.5.5.5c1.378 0 2.5-1.122 2.5-2.5S21.878 6 20.5 6c-.276 0-.5.224-.5.5s.224.5.5.5c.827 0 1.5.673 1.5 1.5s-.673 1.5-1.5 1.5z"/>
    <path d="M19.32 8.54c-1.54-1.28-3.45-2.04-5.49-2.04-4.69 0-8.5 3.81-8.5 8.5 0 2.76 1.32 5.21 3.36 6.76.36.27.87.2 1.14-.16.27-.36.2-.87-.16-1.14-1.7-1.29-2.78-3.33-2.78-5.61 0-3.86 3.14-7 7-7 1.68 0 3.22.59 4.43 1.57-1.22.76-2.05 2.13-2.05 3.68 0 2.41 1.96 4.37 4.37 4.37.76 0 1.48-.2 2.1-.54-.65 2.46-2.88 4.27-5.54 4.27-1.61 0-3.08-.68-4.12-1.76-.27-.28-.72-.29-1-.02-.28.27-.29.72-.02 1 1.29 1.34 3.1 2.17 5.08 2.17 3.59 0 6.55-2.7 6.98-6.17.03-.24-.03-.48-.18-.67-.14-.19-.36-.3-.6-.3-.09 0-.17.01-.26.04-.48.15-.99.23-1.52.23-1.58 0-2.87-1.29-2.87-2.87 0-1.13.66-2.11 1.61-2.58.19-.09.33-.26.37-.46.04-.2 0-.42-.12-.59z"/>
  </svg>
);

interface EnhancedProductCardProps {
  product: Product;
  onCompare: (productId: number) => void;
  isComparing: boolean;
}

const EnhancedProductCard = ({
  product,
  onCompare,
  isComparing,
}: EnhancedProductCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);

  const colorMap: Record<string, string> = {
    beige: "#F5F5DC",
    "petroleum green": "#2F4F4F",
    white: "#FFFFFF",
    black: "#000000",
  };

  return (
    <div className="group relative overflow-hidden rounded-xl border-2 border-border bg-card shadow-lg transition-all hover:shadow-2xl hover:border-primary">
      {/* Badges */}
      <div className="absolute left-3 top-3 z-10 flex flex-col gap-2">
        {product.isNew && (
          <Badge className="bg-blue-600 text-white">NUEVO</Badge>
        )}
        {product.discount && (
          <Badge className="bg-red-600 text-white">-{product.discount}%</Badge>
        )}
        {!product.inStock && (
          <Badge variant="secondary" className="bg-gray-500 text-white">
            AGOTADO
          </Badge>
        )}
      </div>

      {/* Action Buttons */}
      <div className="absolute right-3 top-3 z-10 flex flex-col gap-2">
        <Button
          size="icon"
          variant="secondary"
          className={cn(
            "h-9 w-9 rounded-full bg-white/90 backdrop-blur-sm transition-all hover:scale-110",
            isFavorite && "bg-red-500 text-white hover:bg-red-600"
          )}
          onClick={() => setIsFavorite(!isFavorite)}
        >
          <Heart className="h-4 w-4" fill={isFavorite ? "currentColor" : "none"} />
        </Button>

        <Button
          size="icon"
          variant="secondary"
          className={cn(
            "h-9 w-9 rounded-full bg-white/90 backdrop-blur-sm transition-all hover:scale-110",
            isComparing && "bg-primary text-white"
          )}
          onClick={() => onCompare(product.id)}
        >
          <GitCompare className="h-4 w-4" />
        </Button>
      </div>

      {/* Image */}
      <div className="aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className={cn(
            "h-full w-full object-cover transition-transform duration-500 group-hover:scale-110",
            !product.inStock && "opacity-50 grayscale"
          )}
        />
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        {/* Category & Material */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="font-medium uppercase">{product.category}</span>
          <span className="text-xs">{product.material}</span>
        </div>

        {/* Product Name */}
        <h3 className="text-lg font-bold text-card-foreground line-clamp-2 min-h-[3.5rem]">
          {product.name}
        </h3>

        {/* Banana Points */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <BananaIcon className="h-5 w-5 text-yellow-500" />
            <span className="text-lg font-bold text-yellow-600">
              {product.bananaPoints.toLocaleString()}p
            </span>
          </div>
          <span className="text-sm text-muted-foreground">
            ({product.reviewCount} reviews)
          </span>
        </div>

        {/* Colors */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground">Colores:</p>
          <div className="flex gap-2">
            {product.colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={cn(
                  "h-7 w-7 rounded-full border-2 transition-all hover:scale-110",
                  selectedColor === color
                    ? "border-primary ring-2 ring-primary ring-offset-2"
                    : "border-gray-300"
                )}
                style={{ backgroundColor: colorMap[color.toLowerCase()] || color }}
                title={color}
              />
            ))}
          </div>
        </div>

        {/* Sizes */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground">Tallas:</p>
          <div className="flex flex-wrap gap-1">
            {product.sizes.map((size) => (
              <span
                key={size}
                className="rounded bg-gray-100 px-2 py-1 text-xs font-medium"
              >
                {size}
              </span>
            ))}
          </div>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-primary">
            S/ {product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              S/ {product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Stock Info */}
        {product.inStock && product.stockCount && product.stockCount < 10 && (
          <p className="text-xs font-medium text-orange-600">
            ¡Solo quedan {product.stockCount} unidades!
          </p>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Link to="/customize" className="flex-1">
            <Button
              className="w-full"
              disabled={!product.inStock}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Personalizar
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EnhancedProductCard;
