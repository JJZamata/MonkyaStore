import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  CreditCard, 
  MapPin, 
  Phone, 
  User, 
  Mail, 
  Truck, 
  Shield, 
  Lock,
  Wallet,
  Home
} from 'lucide-react';

interface CheckoutScreenProps {
  onOrderComplete: () => void;
}

export const CheckoutScreen: React.FC<CheckoutScreenProps> = ({ onOrderComplete }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: ''
  });
  const [cardInfo, setCardInfo] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });

  // Datos simulados del carrito
  const cartItems = [
    {
      id: 1,
      name: 'Polo Personalizado',
      color: 'Azul Marino',
      size: 'M',
      customization: 'Logo Zorro Geométrico',
      quantity: 1,
      price: 29.99,
      image: '/placeholder.svg'
    },
    {
      id: 2,
      name: 'Polera Básica',
      color: 'Negro',
      size: 'L',
      customization: 'Sin personalización',
      quantity: 2,
      price: 19.99,
      image: '/placeholder.svg'
    }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 4.99;
  const total = subtotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulación de procesamiento de pago
    setTimeout(() => {
      onOrderComplete();
    }, 2000);
  };

  const handleInputChange = (section: 'shipping' | 'card', field: string, value: string) => {
    if (section === 'shipping') {
      setShippingInfo(prev => ({ ...prev, [field]: value }));
    } else {
      setCardInfo(prev => ({ ...prev, [field]: value }));
    }
  };

  return (
    <div className="min-h-screen bg-background pt-20 pb-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gradient-primary mb-2">Finalizar Compra</h1>
          <p className="text-muted-foreground">Completa tu pedido de manera segura</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Left Column - Forms */}
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Information */}
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Truck className="w-5 h-5 text-primary" />
                    <span>Información de Envío</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nombre Completo *</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="name"
                          placeholder="Tu nombre completo"
                          value={shippingInfo.name}
                          onChange={(e) => handleInputChange('shipping', 'name', e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Correo Electrónico *</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="tu@email.com"
                          value={shippingInfo.email}
                          onChange={(e) => handleInputChange('shipping', 'email', e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Teléfono *</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="phone"
                          placeholder="+34 612 345 678"
                          value={shippingInfo.phone}
                          onChange={(e) => handleInputChange('shipping', 'phone', e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="postalCode">Código Postal *</Label>
                      <Input
                        id="postalCode"
                        placeholder="28001"
                        value={shippingInfo.postalCode}
                        onChange={(e) => handleInputChange('shipping', 'postalCode', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="address">Dirección Completa *</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="address"
                          placeholder="Calle, número, piso, puerta"
                          value={shippingInfo.address}
                          onChange={(e) => handleInputChange('shipping', 'address', e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="city">Ciudad *</Label>
                      <Input
                        id="city"
                        placeholder="Madrid"
                        value={shippingInfo.city}
                        onChange={(e) => handleInputChange('shipping', 'city', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card className="card-elevated">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CreditCard className="w-5 h-5 text-primary" />
                    <span>Método de Pago</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-2 p-4 border rounded-xl hover:bg-neutral-50 transition-colors cursor-pointer">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex-1 cursor-pointer">
                        <div className="flex items-center space-x-3">
                          <CreditCard className="w-5 h-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">Tarjeta de Crédito/Débito</p>
                            <p className="text-sm text-muted-foreground">Visa, Mastercard, American Express</p>
                          </div>
                        </div>
                      </Label>
                      <Badge variant="secondary">Recomendado</Badge>
                    </div>

                    <div className="flex items-center space-x-2 p-4 border rounded-xl hover:bg-neutral-50 transition-colors cursor-pointer">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <Label htmlFor="paypal" className="flex-1 cursor-pointer">
                        <div className="flex items-center space-x-3">
                          <Wallet className="w-5 h-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">PayPal</p>
                            <p className="text-sm text-muted-foreground">Paga de forma segura con tu cuenta PayPal</p>
                          </div>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2 p-4 border rounded-xl hover:bg-neutral-50 transition-colors cursor-pointer">
                      <RadioGroupItem value="cash" id="cash" />
                      <Label htmlFor="cash" className="flex-1 cursor-pointer">
                        <div className="flex items-center space-x-3">
                          <Home className="w-5 h-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">Pago Contra Entrega</p>
                            <p className="text-sm text-muted-foreground">Paga en efectivo al recibir tu pedido</p>
                          </div>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>

                  {/* Card Details */}
                  {paymentMethod === 'card' && (
                    <div className="space-y-4 pt-4 border-t">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="md:col-span-2 space-y-2">
                          <Label htmlFor="cardNumber">Número de Tarjeta *</Label>
                          <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={cardInfo.number}
                            onChange={(e) => handleInputChange('card', 'number', e.target.value)}
                            maxLength={19}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="expiry">Fecha de Expiración *</Label>
                          <Input
                            id="expiry"
                            placeholder="MM/AA"
                            value={cardInfo.expiry}
                            onChange={(e) => handleInputChange('card', 'expiry', e.target.value)}
                            maxLength={5}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV *</Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            value={cardInfo.cvv}
                            onChange={(e) => handleInputChange('card', 'cvv', e.target.value)}
                            maxLength={4}
                            required
                          />
                        </div>

                        <div className="md:col-span-2 space-y-2">
                          <Label htmlFor="cardName">Nombre en la Tarjeta *</Label>
                          <Input
                            id="cardName"
                            placeholder="Como aparece en tu tarjeta"
                            value={cardInfo.name}
                            onChange={(e) => handleInputChange('card', 'name', e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Order Summary */}
            <div className="space-y-6">
              {/* Order Summary */}
              <Card className="card-elevated sticky top-24">
                <CardHeader>
                  <CardTitle>Resumen del Pedido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Cart Items */}
                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex space-x-3 p-3 bg-neutral-50 rounded-lg">
                        <div className="w-12 h-12 bg-neutral-200 rounded-lg flex-shrink-0"></div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate">{item.name}</h4>
                          <p className="text-xs text-muted-foreground">{item.color} • {item.size}</p>
                          <p className="text-xs text-muted-foreground">{item.customization}</p>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-xs">Cant: {item.quantity}</span>
                            <span className="font-medium text-sm">€{(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Price Breakdown */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>€{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Envío</span>
                      <span>€{shipping.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span className="text-primary">€{total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Place Order Button */}
                  <Button type="submit" className="w-full btn-primary h-12 font-medium">
                    <Lock className="w-4 h-4 mr-2" />
                    Finalizar Compra
                  </Button>

                  {/* Security Badge */}
                  <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
                    <Shield className="w-4 h-4" />
                    <span>Pago 100% seguro y protegido</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};