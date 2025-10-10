import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Palette, Upload, Sparkles, RotateCcw, ShoppingCart, Eye } from 'lucide-react';
import { Product } from './ProductCard';
import poloWhite from '@/assets/polo-white.jpg';

interface CustomizeSectionProps {
  selectedProduct?: Product;
  onCreateLogo: () => void;
}

const colorOptions = [
  { name: 'Blanco', value: '#FFFFFF', textColor: '#000000' },
  { name: 'Negro', value: '#000000', textColor: '#FFFFFF' },
  { name: 'Azul Marino', value: '#1E40AF', textColor: '#FFFFFF' },
  { name: 'Rojo', value: '#DC2626', textColor: '#FFFFFF' },
  { name: 'Verde', value: '#059669', textColor: '#FFFFFF' },
  { name: 'Gris', value: '#6B7280', textColor: '#FFFFFF' },
  { name: 'Amarillo', value: '#F59E0B', textColor: '#000000' },
  { name: 'Morado', value: '#7C3AED', textColor: '#FFFFFF' },
];

const sizeOptions = ['S', 'M', 'L', 'XL', 'XXL'];

export const CustomizeSection: React.FC<CustomizeSectionProps> = ({ 
  selectedProduct, 
  onCreateLogo 
}) => {
  const [selectedColor, setSelectedColor] = useState(colorOptions[0]);
  const [selectedSize, setSelectedSize] = useState('M');
  const [logoPosition, setLogoPosition] = useState<'center' | 'left' | 'pocket'>('center');
  const [quantity, setQuantity] = useState(1);

  const currentProduct = selectedProduct || {
    id: 'default',
    name: 'Polo Personalizable',
    type: 'polo' as const,
    basePrice: 45.99,
    colors: colorOptions.map(c => c.value),
    sizes: sizeOptions,
    image: poloWhite,
    rating: 4.8,
    reviews: 124
  };

  const totalPrice = currentProduct.basePrice * quantity;

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient-primary">Personaliza</span> tu Prenda
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Crea un diseño único ajustando colores, agregando logos y personalizando cada detalle
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Preview */}
          <div className="space-y-6">
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Vista previa
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative aspect-square rounded-2xl overflow-hidden" style={{ backgroundColor: selectedColor.value }}>
                  <img 
                    src={currentProduct.image} 
                    alt="Producto personalizable"
                    className="w-full h-full object-cover mix-blend-multiply"
                    style={{ filter: selectedColor.value === '#FFFFFF' ? 'none' : 'brightness(0.8)' }}
                  />
                  
                  {/* Logo placeholder */}
                  <div 
                    className={`absolute w-20 h-20 border-2 border-dashed border-opacity-50 rounded-lg flex items-center justify-center ${
                      logoPosition === 'center' ? 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' :
                      logoPosition === 'left' ? 'top-1/3 left-8' :
                      'top-8 left-8'
                    }`}
                    style={{ borderColor: selectedColor.textColor }}
                  >
                    <span 
                      className="text-xs opacity-60"
                      style={{ color: selectedColor.textColor }}
                    >
                      Logo
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Product Info */}
            <Card className="card-elevated">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">{currentProduct.name}</h3>
                    <p className="text-muted-foreground capitalize">{currentProduct.type}</p>
                  </div>
                  <Badge variant="secondary" className="bg-secondary/20 text-secondary">
                    Personalizable
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Color:</span>
                    <span className="font-medium">{selectedColor.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Talla:</span>
                    <span className="font-medium">{selectedSize}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Cantidad:</span>
                    <span className="font-medium">{quantity}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span className="text-primary">${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Customization Options */}
          <div className="space-y-6">
            <Tabs defaultValue="colors" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="colors">Colores</TabsTrigger>
                <TabsTrigger value="logo">Logo</TabsTrigger>
                <TabsTrigger value="details">Detalles</TabsTrigger>
              </TabsList>

              {/* Colors Tab */}
              <TabsContent value="colors" className="space-y-6">
                <Card className="card-elevated">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Palette className="w-5 h-5" />
                      Selecciona el Color
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-4 gap-3">
                      {colorOptions.map((color) => (
                        <button
                          key={color.value}
                          onClick={() => setSelectedColor(color)}
                          className={`relative w-full aspect-square rounded-xl border-2 transition-all duration-200 hover:scale-105 ${
                            selectedColor.value === color.value 
                              ? 'border-primary shadow-glow-primary' 
                              : 'border-border hover:border-primary/50'
                          }`}
                          style={{ backgroundColor: color.value }}
                        >
                          {selectedColor.value === color.value && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground mt-4">
                      Color seleccionado: <span className="font-medium">{selectedColor.name}</span>
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Logo Tab */}
              <TabsContent value="logo" className="space-y-6">
                <Card className="card-elevated">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      Agregar Logo
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-3">
                      <Button 
                        onClick={onCreateLogo}
                        className="btn-primary h-12 text-left justify-start"
                      >
                        <Sparkles className="w-5 h-5 mr-3" />
                        <div>
                          <div className="font-semibold">Crear con IA</div>
                          <div className="text-xs opacity-80">Genera logos únicos con inteligencia artificial</div>
                        </div>
                      </Button>
                      
                      <Button variant="outline" className="h-12 text-left justify-start btn-ghost">
                        <Upload className="w-5 h-5 mr-3" />
                        <div>
                          <div className="font-semibold">Subir archivo</div>
                          <div className="text-xs text-muted-foreground">PNG, JPG o SVG (máx. 5MB)</div>
                        </div>
                      </Button>
                    </div>

                    <div className="pt-4 border-t">
                      <label className="text-sm font-medium mb-3 block">Posición del logo:</label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: 'center', label: 'Centro' },
                          { id: 'left', label: 'Izquierda' },
                          { id: 'pocket', label: 'Bolsillo' }
                        ].map((position) => (
                          <Button
                            key={position.id}
                            variant={logoPosition === position.id ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setLogoPosition(position.id as any)}
                            className={logoPosition === position.id ? 'btn-primary' : 'btn-ghost'}
                          >
                            {position.label}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Details Tab */}
              <TabsContent value="details" className="space-y-6">
                <Card className="card-elevated">
                  <CardHeader>
                    <CardTitle>Detalles del Producto</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Size Selection */}
                    <div>
                      <label className="text-sm font-medium mb-3 block">Talla:</label>
                      <Select value={selectedSize} onValueChange={setSelectedSize}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {sizeOptions.map((size) => (
                            <SelectItem key={size} value={size}>
                              {size}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Quantity */}
                    <div>
                      <label className="text-sm font-medium mb-3 block">Cantidad:</label>
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          disabled={quantity <= 1}
                        >
                          -
                        </Button>
                        <span className="w-12 text-center font-medium">{quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setQuantity(quantity + 1)}
                        >
                          +
                        </Button>
                      </div>
                    </div>

                    {/* Size Guide */}
                    <div className="bg-muted/50 rounded-lg p-4">
                      <h4 className="font-medium mb-2">Guía de tallas:</h4>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <div>S: 46-48 cm (ancho del pecho)</div>
                        <div>M: 50-52 cm (ancho del pecho)</div>
                        <div>L: 54-56 cm (ancho del pecho)</div>
                        <div>XL: 58-60 cm (ancho del pecho)</div>
                        <div>XXL: 62-64 cm (ancho del pecho)</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <Button size="lg" className="btn-primary h-14 text-lg">
                <ShoppingCart className="w-5 h-5 mr-3" />
                Agregar al Carrito - ${totalPrice.toFixed(2)}
              </Button>
              
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 btn-ghost">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reiniciar
                </Button>
                <Button variant="outline" className="flex-1 btn-ghost">
                  Guardar diseño
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};