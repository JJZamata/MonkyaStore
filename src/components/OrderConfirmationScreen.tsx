import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  CheckCircle, 
  Package, 
  Truck, 
  Home, 
  Eye, 
  Download,
  ArrowLeft,
  Clock,
  Mail
} from 'lucide-react';

interface OrderConfirmationScreenProps {
  onContinueShopping: () => void;
  onViewOrders: () => void;
}

export const OrderConfirmationScreen: React.FC<OrderConfirmationScreenProps> = ({ 
  onContinueShopping, 
  onViewOrders 
}) => {
  const orderNumber = 'CM' + Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  const estimatedDelivery = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  });

  // Datos simulados del pedido
  const orderItems = [
    {
      id: 1,
      name: 'Polo Personalizado',
      color: 'Azul Marino',
      size: 'M',
      customization: 'Logo Zorro Geométrico',
      quantity: 1,
      price: 29.99
    },
    {
      id: 2,
      name: 'Polera Básica',
      color: 'Negro',
      size: 'L',
      customization: 'Sin personalización',
      quantity: 2,
      price: 19.99
    }
  ];

  const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 4.99;
  const total = subtotal + shipping;

  const orderStatus = [
    {
      step: 1,
      title: 'Pedido Confirmado',
      description: 'Tu pedido ha sido recibido y confirmado',
      completed: true,
      icon: CheckCircle
    },
    {
      step: 2,
      title: 'En Producción',
      description: 'Estamos personalizando tu prenda',
      completed: false,
      icon: Package,
      estimatedTime: '1-2 días'
    },
    {
      step: 3,
      title: 'Enviado',
      description: 'Tu pedido está en camino',
      completed: false,
      icon: Truck,
      estimatedTime: '2-3 días'
    },
    {
      step: 4,
      title: 'Entregado',
      description: 'Tu pedido ha llegado a destino',
      completed: false,
      icon: Home,
      estimatedTime: estimatedDelivery
    }
  ];

  return (
    <div className="min-h-screen bg-background pt-20 pb-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-success to-success/80 rounded-full mb-6 shadow-large animate-fade-in">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-success mb-2 animate-slide-up">
            ¡Pedido Confirmado!
          </h1>
          <p className="text-lg text-muted-foreground animate-fade-in">
            Gracias por tu compra, tu pedido #{orderNumber} está en proceso
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Status Timeline */}
            <Card className="card-elevated">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-6">Estado del Pedido</h3>
                <div className="space-y-6">
                  {orderStatus.map((status, index) => {
                    const Icon = status.icon;
                    return (
                      <div key={status.step} className="flex items-start space-x-4">
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                          status.completed 
                            ? 'bg-success border-success text-white' 
                            : 'border-neutral-300 text-neutral-400'
                        }`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className={`font-medium ${status.completed ? 'text-success' : 'text-muted-foreground'}`}>
                              {status.title}
                            </h4>
                            {status.completed && (
                              <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                                Completado
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {status.description}
                          </p>
                          {status.estimatedTime && !status.completed && (
                            <div className="flex items-center space-x-1 mt-2">
                              <Clock className="w-3 h-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">
                                Estimado: {status.estimatedTime}
                              </span>
                            </div>
                          )}
                        </div>
                        {index < orderStatus.length - 1 && (
                          <div className={`w-px h-8 ml-5 ${
                            status.completed ? 'bg-success' : 'bg-neutral-200'
                          }`} />
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Order Details */}
            <Card className="card-elevated">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Detalles del Pedido</h3>
                <div className="space-y-4">
                  {orderItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 bg-neutral-50 rounded-xl">
                      <div className="w-16 h-16 bg-neutral-200 rounded-lg flex-shrink-0"></div>
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <div className="flex items-center space-x-3 text-sm text-muted-foreground mt-1">
                          <span>{item.color}</span>
                          <span>•</span>
                          <span>Talla {item.size}</span>
                          <span>•</span>
                          <span>Cantidad: {item.quantity}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{item.customization}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">€{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                {/* Price Summary */}
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
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span className="text-primary">€{total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Actions */}
          <div className="space-y-6">
            {/* Order Info */}
            <Card className="card-elevated">
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold mb-4">Información de tu Pedido</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Número de pedido:</span>
                    <span className="font-medium">#{orderNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Fecha:</span>
                    <span className="font-medium">{new Date().toLocaleDateString('es-ES')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Entrega estimada:</span>
                    <span className="font-medium text-primary">{estimatedDelivery}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card className="card-elevated">
              <CardContent className="p-6 space-y-3">
                <Button 
                  onClick={onViewOrders}
                  className="w-full btn-primary"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Ver Mis Pedidos
                </Button>
                
                <Button 
                  variant="outline"
                  className="w-full btn-ghost"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Descargar Factura
                </Button>
                
                <Button 
                  onClick={onContinueShopping}
                  variant="outline"
                  className="w-full btn-ghost"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Continuar Comprando
                </Button>
              </CardContent>
            </Card>

            {/* Support */}
            <Card className="card-elevated">
              <CardContent className="p-6 text-center">
                <Mail className="w-8 h-8 text-primary mx-auto mb-3" />
                <h4 className="font-medium mb-2">¿Necesitas Ayuda?</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Te hemos enviado un email de confirmación con todos los detalles.
                </p>
                <Button variant="outline" size="sm" className="btn-ghost">
                  Contactar Soporte
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};