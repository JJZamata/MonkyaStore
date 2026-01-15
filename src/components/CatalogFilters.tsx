import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface CatalogFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  selectedMaterial: string;
  onMaterialChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  priceRange: number[];
  onPriceRangeChange: (value: number[]) => void;
  minRating: number;
  onMinRatingChange: (value: number) => void;
  showInStockOnly: boolean;
  onStockFilterChange: (value: boolean) => void;
}

const CatalogFilters = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedMaterial,
  onMaterialChange,
  sortBy,
  onSortChange,
  priceRange,
  onPriceRangeChange,
  minRating,
  onMinRatingChange,
  showInStockOnly,
  onStockFilterChange,
}: CatalogFiltersProps) => {
  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Buscar productos..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 pr-4 py-6 text-lg border-2 focus:border-primary"
        />
      </div>

      {/* Filters Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Category Filter */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold">Categoría</Label>
          <Select value={selectedCategory} onValueChange={onCategoryChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Todas las categorías" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="polos">Polos</SelectItem>
              <SelectItem value="hoodies">Sudaderas</SelectItem>
              <SelectItem value="longsleeve">Manga Larga</SelectItem>
              <SelectItem value="oversized">Oversized</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Material Filter */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold">Material</Label>
          <Select value={selectedMaterial} onValueChange={onMaterialChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Todos los materiales" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="pima">Algodón Pima</SelectItem>
              <SelectItem value="cotton100">100% Algodón</SelectItem>
              <SelectItem value="premium">Premium Blend</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Sort By */}
        <div className="space-y-2">
          <Label className="text-sm font-semibold">Ordenar por</Label>
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name-asc">Nombre (A-Z)</SelectItem>
              <SelectItem value="name-desc">Nombre (Z-A)</SelectItem>
              <SelectItem value="price-asc">Precio (Menor)</SelectItem>
              <SelectItem value="price-desc">Precio (Mayor)</SelectItem>
              <SelectItem value="rating-desc">Mejor valorados</SelectItem>
              <SelectItem value="newest">Más nuevos</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* In Stock Filter */}
        <div className="flex items-end space-x-2 pb-2">
          <Checkbox
            id="instock"
            checked={showInStockOnly}
            onCheckedChange={(checked) => onStockFilterChange(checked as boolean)}
          />
          <Label
            htmlFor="instock"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Solo productos en stock
          </Label>
        </div>
      </div>

      {/* Advanced Filters */}
      <div className="rounded-lg border-2 border-border bg-card p-6">
        <div className="mb-4 flex items-center gap-2">
          <SlidersHorizontal className="h-5 w-5" />
          <h3 className="font-semibold">Filtros Avanzados</h3>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Price Range */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-semibold">Rango de Precio</Label>
              <span className="text-sm font-medium text-primary">
                S/ {priceRange[0]} - S/ {priceRange[1]}
              </span>
            </div>
            <Slider
              min={30}
              max={120}
              step={5}
              value={priceRange}
              onValueChange={onPriceRangeChange}
              className="w-full"
            />
          </div>

          {/* Banana Points Filter */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-semibold">Puntos mínimos 🍌</Label>
              <span className="text-sm font-medium text-yellow-600">
                {(minRating * 1000).toLocaleString()}p o más
              </span>
            </div>
            <Slider
              min={0}
              max={100}
              step={5}
              value={[minRating]}
              onValueChange={(value) => onMinRatingChange(value[0])}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogFilters;
