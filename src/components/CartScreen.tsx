import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight,
  ShoppingBag
} from 'lucide-react';

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  type: 'polo' | 'polera';
  color: string;
  colorName: string;
  size: string;
  price: number;
  quantity: number;
  image: string;
  customization?: {
    logo?: string;
    logoPosition?: string;
  };
}

interface CartScreenProps {
  cartItems: CartItem[];
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onGoToCheckout: () => void;
  onContinueShopping: () => void;
}

export const CartScreen: React.FC<CartScreenProps> = ({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onGoToCheckout,
  onContinueShopping
}) => {
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = cartItems.length > 0 ? 4.99 : 0;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-background pt-20 pb-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Tu <span className="text-gradient-primary">Carrito</span>
          </h1>
          <p className="text-muted-foreground">
            {cartItems.length} {cartItems.length === 1 ? 'producto' : 'productos'} en tu carrito
          </p>
        </div>

        {cartItems.length === 0 ? (
          // Empty Cart State
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-2xl mx-auto flex items-center justify-center mb-6">
              <ShoppingBag className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-3">Tu carrito está vacío</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              ¡Descubre nuestra colección y comienza a personalizar tus prendas favoritas!
            </p>
            <Button onClick={onContinueShopping} size="lg" className="btn-primary">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Ir al Catálogo
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id} className="card-elevated">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div 
                        className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl flex-shrink-0 overflow-hidden"
                        style={{ backgroundColor: item.color }}
                      >
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover mix-blend-multiply"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg line-clamp-1">{item.name}</h3>
                            <p className="text-sm text-muted-foreground capitalize">{item.type}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onRemoveItem(item.id)}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10 flex-shrink-0"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>

                        {/* Product Details */}
                        <div className="space-y-1 mb-3">
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-muted-foreground">Color:</span>
                            <div className="flex items-center gap-1">
                              <div 
                                className="w-4 h-4 rounded-full border border-border"
                                style={{ backgroundColor: item.color }}
                              />
                              <span>{item.colorName}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-muted-foreground">Talla:</span>
                            <span>{item.size}</span>
                          </div>
                          {item.customization?.logo && (
                            <Badge variant="secondary" className="mt-1 bg-primary/10 text-primary">
                              Personalizado
                            </Badge>
                          )}
                        </div>

                        {/* Quantity & Price */}
                        <div className="flex items-center justify-between">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              disabled={item.quantity <= 1}
                              className="h-8 w-8 p-0"
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                              className="h-8 w-8 p-0"
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <div className="font-bold text-lg text-primary">
                              ${(item.price * item.quantity).toFixed(2)}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              ${item.price.toFixed(2)} c/u
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="card-elevated sticky top-24">
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-bold text-xl mb-4">Resumen del Pedido</h3>

                  {/* Price Breakdown */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal ({cartItems.length} items)</span>
                      <span className="font-medium">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Envío</span>
                      <span className="font-medium">${shipping.toFixed(2)}</span>
                    </div>

                    <Separator />

                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-primary">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <Button 
                    onClick={onGoToCheckout}
                    size="lg"
                    className="w-full btn-primary h-12 font-medium"
                  >
                    Proceder al Checkout
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>

                  {/* Continue Shopping */}
                  <Button
                    onClick={onContinueShopping}
                    variant="outline"
                    className="w-full btn-ghost"
                  >
                    Continuar Comprando
                  </Button>

                  {/* Free Shipping Notice */}
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mt-4">
                    <p className="text-sm text-center">
                      <span className="font-semibold text-primary">🎉 Envío gratis</span>
                      <br />
                      <span className="text-muted-foreground">en pedidos superiores a $50</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};