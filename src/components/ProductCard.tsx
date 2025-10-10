import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, ShoppingCart, Star } from 'lucide-react';

export interface Product {
  id: string;
  name: string;
  type: 'polo' | 'polera';
  basePrice: number;
  colors: string[];
  sizes: string[];
  image: string;
  rating: number;
  reviews: number;
  isNew?: boolean;
  discount?: number;
}

interface ProductCardProps {
  product: Product;
  onCustomize: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleFavorite: (productId: string) => void;
  isFavorite?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onCustomize,
  onAddToCart,
  onToggleFavorite,
  isFavorite = false
}) => {
  const finalPrice = product.discount 
    ? product.basePrice * (1 - product.discount / 100) 
    : product.basePrice;

  return (
    <div className="card-product group">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
              Nuevo
            </Badge>
          )}
          {product.discount && (
            <Badge variant="destructive" className="bg-destructive text-destructive-foreground">
              -{product.discount}%
            </Badge>
          )}
        </div>

        {/* Favorite Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(product.id);
          }}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full bg-card/80 backdrop-blur-sm hover:bg-card transition-all duration-200 ${
            isFavorite ? 'text-destructive' : 'text-muted-foreground hover:text-destructive'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </Button>

        {/* Quick Actions Overlay */}
        <div className="absolute inset-0 bg-neutral-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="flex gap-3">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onCustomize(product);
              }}
              className="btn-primary transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
            >
              Personalizar
            </Button>
            <Button
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product);
              }}
              className="bg-card/90 backdrop-blur-sm hover:bg-card transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 [transition-delay:0.1s]"
            >
              <ShoppingCart className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-lg text-foreground line-clamp-1">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground capitalize">
            {product.type}
          </p>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-warning fill-warning" />
            <span className="text-sm font-medium ml-1">{product.rating}</span>
          </div>
          <span className="text-xs text-muted-foreground">
            ({product.reviews} reseñas)
          </span>
        </div>

        {/* Colors Preview */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Colores:</span>
          <div className="flex gap-1">
            {product.colors.slice(0, 4).map((color, index) => (
              <div
                key={index}
                className="w-4 h-4 rounded-full border border-border shadow-sm"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
            {product.colors.length > 4 && (
              <div className="w-4 h-4 rounded-full bg-muted border border-border flex items-center justify-center">
                <span className="text-[8px] text-muted-foreground font-medium">
                  +{product.colors.length - 4}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-foreground">
              ${finalPrice.toFixed(2)}
            </span>
            {product.discount && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.basePrice.toFixed(2)}
              </span>
            )}
          </div>
          
          {/* Sizes */}
          <div className="text-xs text-muted-foreground">
            {product.sizes.join(', ')}
          </div>
        </div>
      </div>
    </div>
  );
};