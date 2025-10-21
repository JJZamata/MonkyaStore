import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ProductCard, Product } from './ProductCard';
import { CartItem } from './CartScreen';
import { Search, Filter, Grid3X3, List } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import poloWhite from '@/assets/polo-white.jpg';
import tshirtBlack from '@/assets/tshirt-black.jpg';

// Mock data para productos
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Polo Clásico Premium',
    type: 'polo',
    basePrice: 45.99,
    colors: ['#FFFFFF', '#000000', '#1E40AF', '#DC2626', '#059669'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    image: poloWhite,
    rating: 4.8,
    reviews: 124,
    isNew: true
  },
  {
    id: '2',
    name: 'Polera Urbana Algodón',
    type: 'polera',
    basePrice: 32.99,
    colors: ['#000000', '#FFFFFF', '#374151', '#7C3AED'],
    sizes: ['S', 'M', 'L', 'XL'],
    image: tshirtBlack,
    rating: 4.6,
    reviews: 89,
    discount: 20
  },
  {
    id: '3',
    name: 'Polo Deportivo Dri-Fit',
    type: 'polo',
    basePrice: 52.99,
    colors: ['#1E40AF', '#DC2626', '#FFFFFF', '#059669', '#F59E0B'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    image: poloWhite,
    rating: 4.9,
    reviews: 203,
    isNew: true
  },
  {
    id: '4',
    name: 'Polera Oversize Comfort',
    type: 'polera',
    basePrice: 38.99,
    colors: ['#374151', '#F3F4F6', '#EF4444', '#8B5CF6'],
    sizes: ['M', 'L', 'XL', 'XXL'],
    image: tshirtBlack,
    rating: 4.5,
    reviews: 156,
    discount: 15
  },
  {
    id: '5',
    name: 'Polo Business Premium',
    type: 'polo',
    basePrice: 65.99,
    colors: ['#000000', '#1F2937', '#1E40AF', '#FFFFFF'],
    sizes: ['S', 'M', 'L', 'XL'],
    image: poloWhite,
    rating: 4.7,
    reviews: 78
  },
  {
    id: '6',
    name: 'Polera Casual Essential',
    type: 'polera',
    basePrice: 28.99,
    colors: ['#FFFFFF', '#000000', '#6B7280', '#F59E0B', '#10B981'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    image: tshirtBlack,
    rating: 4.4,
    reviews: 267
  }
];

interface ProductCatalogProps {
  onCustomizeProduct: (product: Product) => void;
  onAddToCart?: (item: Omit<CartItem, 'id'>) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({ onCustomizeProduct, onAddToCart }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'polo' | 'polera'>('all');
  const [priceRange, setPriceRange] = useState<'all' | 'low' | 'mid' | 'high'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'rating'>('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // Filtros aplicados
  const filteredProducts = useMemo(() => {
    let filtered = mockProducts;

    // Filtro por búsqueda
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filtro por tipo
    if (selectedType !== 'all') {
      filtered = filtered.filter(product => product.type === selectedType);
    }

    // Filtro por rango de precio
    if (priceRange !== 'all') {
      filtered = filtered.filter(product => {
        const price = product.discount 
          ? product.basePrice * (1 - product.discount / 100) 
          : product.basePrice;
        
        switch (priceRange) {
          case 'low': return price < 35;
          case 'mid': return price >= 35 && price < 50;
          case 'high': return price >= 50;
          default: return true;
        }
      });
    }

    // Ordenamiento
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          const priceA = a.discount ? a.basePrice * (1 - a.discount / 100) : a.basePrice;
          const priceB = b.discount ? b.basePrice * (1 - b.discount / 100) : b.basePrice;
          return priceA - priceB;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [searchQuery, selectedType, priceRange, sortBy]);

  const handleToggleFavorite = (productId: string) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  };

  const handleAddToCart = (product: Product) => {
    if (onAddToCart) {
      const finalPrice = product.discount 
        ? product.basePrice * (1 - product.discount / 100) 
        : product.basePrice;
      
      onAddToCart({
        productId: product.id,
        name: product.name,
        type: product.type,
        color: product.colors[0],
        colorName: 'Color base',
        size: 'M',
        price: finalPrice,
        quantity: 1,
        image: product.image
      });
    } else {
      toast({
        title: "¡Añadido al carrito!",
        description: `${product.name} agregado exitosamente`,
      });
    }
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Nuestro <span className="text-gradient-primary">Catálogo</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explora nuestra colección de polos y poleras de alta calidad, perfectos para personalizar
          </p>
        </div>

        {/* Filters Bar */}
        <div className="card-elevated p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 items-center">
              <Select value={selectedType} onValueChange={(value: any) => setSelectedType(value)}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="polo">Polos</SelectItem>
                  <SelectItem value="polera">Poleras</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priceRange} onValueChange={(value: any) => setPriceRange(value)}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Precio" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="low">Hasta $35</SelectItem>
                  <SelectItem value="mid">$35 - $50</SelectItem>
                  <SelectItem value="high">Más de $50</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="Ordenar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Nombre</SelectItem>
                  <SelectItem value="price">Precio</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                </SelectContent>
              </Select>

              {/* View Mode */}
              <div className="flex bg-muted rounded-lg p-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className={`px-3 ${viewMode === 'grid' ? 'bg-card shadow-sm' : ''}`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className={`px-3 ${viewMode === 'list' ? 'bg-card shadow-sm' : ''}`}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Active filters */}
          <div className="flex flex-wrap gap-2 mt-4">
            {searchQuery && (
              <Badge variant="secondary" className="bg-accent text-accent-foreground">
                Búsqueda: "{searchQuery}"
              </Badge>
            )}
            {selectedType !== 'all' && (
              <Badge variant="secondary" className="bg-accent text-accent-foreground">
                Tipo: {selectedType}
              </Badge>
            )}
            {priceRange !== 'all' && (
              <Badge variant="secondary" className="bg-accent text-accent-foreground">
                Precio: {priceRange === 'low' ? 'Hasta $35' : priceRange === 'mid' ? '$35-$50' : 'Más de $50'}
              </Badge>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-muted-foreground">
            Mostrando {filteredProducts.length} productos
          </p>
        </div>

        {/* Products Grid */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onCustomize={onCustomizeProduct}
              onAddToCart={handleAddToCart}
              onToggleFavorite={handleToggleFavorite}
              isFavorite={favorites.has(product.id)}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <Filter className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No se encontraron productos</h3>
            <p className="text-muted-foreground mb-6">
              Intenta ajustar los filtros para ver más resultados
            </p>
            <Button 
              onClick={() => {
                setSearchQuery('');
                setSelectedType('all');
                setPriceRange('all');
              }}
              variant="outline"
            >
              Limpiar filtros
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};