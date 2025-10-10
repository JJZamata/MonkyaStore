import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  Mail, 
  MapPin, 
  Phone, 
  Package, 
  Palette, 
  LogOut, 
  Edit2,
  Eye,
  Truck,
  CheckCircle
} from 'lucide-react';

interface ProfileScreenProps {
  onLogout: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ onLogout }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: 'María García',
    email: 'maria.garcia@email.com',
    phone: '+34 612 345 678',
    address: 'Calle de la Moda, 123, 28010 Madrid'
  });

  // Datos simulados para el historial de pedidos
  const orderHistory = [
    {
      id: '#CM001',
      date: '15 Mar 2024',
      items: 'Polo Personalizado - Azul',
      status: 'delivered',
      total: '€29.99'
    },
    {
      id: '#CM002',
      date: '10 Mar 2024',
      items: 'Polera con Logo IA - Negro',
      status: 'shipped',
      total: '€34.99'
    },
    {
      id: '#CM003',
      date: '05 Mar 2024',
      items: '2x Polo Básico - Blanco, Gris',
      status: 'processing',
      total: '€49.98'
    }
  ];

  // Logos simulados creados con IA
  const savedLogos = [
    {
      id: 1,
      name: 'Logo Geométrico',
      prompt: 'Zorro minimalista azul',
      dateCreated: '12 Mar 2024'
    },
    {
      id: 2,
      name: 'Logo Empresa',
      prompt: 'Montaña estilo lineal',
      dateCreated: '08 Mar 2024'
    },
    {
      id: 3,
      name: 'Logo Personal',
      prompt: 'Iniciales MG elegantes',
      dateCreated: '01 Mar 2024'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      delivered: { variant: 'default', icon: CheckCircle, text: 'Entregado' },
      shipped: { variant: 'secondary', icon: Truck, text: 'Enviado' },
      processing: { variant: 'outline', icon: Package, text: 'Procesando' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant as any} className="flex items-center space-x-1">
        <Icon className="w-3 h-3" />
        <span>{config.text}</span>
      </Badge>
    );
  };

  const handleSave = () => {
    setIsEditing(false);
    // Aquí se guardarían los datos (simulado)
  };

  const handleProfileChange = (field: string, value: string) => {
    setUserProfile(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background pt-20 pb-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Profile Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gradient-primary mb-2">Mi Perfil</h1>
          <p className="text-muted-foreground">Gestiona tu información personal y pedidos</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Profile Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Info Card */}
            <Card className="card-elevated">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-primary" />
                  <span>Información Personal</span>
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                  className="btn-ghost"
                >
                  <Edit2 className="w-4 h-4 mr-2" />
                  {isEditing ? 'Guardar' : 'Editar'}
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar Section */}
                <div className="flex items-center space-x-4">
                  <Avatar className="w-20 h-20 shadow-medium">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-xl font-bold">
                      MG
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold">{userProfile.name}</h3>
                    <p className="text-muted-foreground">Miembro desde Febrero 2024</p>
                    {!isEditing && (
                      <Badge variant="secondary" className="mt-1">
                        Cliente Premium
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Profile Fields */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre Completo</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="name"
                        value={userProfile.name}
                        onChange={(e) => handleProfileChange('name', e.target.value)}
                        disabled={!isEditing}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Correo Electrónico</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="email"
                        value={userProfile.email}
                        onChange={(e) => handleProfileChange('email', e.target.value)}
                        disabled={!isEditing}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        value={userProfile.phone}
                        onChange={(e) => handleProfileChange('phone', e.target.value)}
                        disabled={!isEditing}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Dirección</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="address"
                        value={userProfile.address}
                        onChange={(e) => handleProfileChange('address', e.target.value)}
                        disabled={!isEditing}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order History */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Package className="w-5 h-5 text-primary" />
                  <span>Historial de Pedidos</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orderHistory.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="font-medium text-primary">{order.id}</span>
                          {getStatusBadge(order.status)}
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{order.items}</p>
                        <p className="text-xs text-muted-foreground">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{order.total}</p>
                        <Button variant="ghost" size="sm" className="mt-1">
                          <Eye className="w-3 h-3 mr-1" />
                          Ver
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Saved Logos */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Palette className="w-5 h-5 text-secondary" />
                  <span>Logos Creados</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {savedLogos.map((logo) => (
                    <div key={logo.id} className="p-3 bg-neutral-50 rounded-lg">
                      <h4 className="font-medium text-sm mb-1">{logo.name}</h4>
                      <p className="text-xs text-muted-foreground mb-2">"{logo.prompt}"</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{logo.dateCreated}</span>
                        <Button variant="ghost" size="sm">
                          <Eye className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle>Acciones Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start btn-ghost">
                  <Package className="w-4 h-4 mr-2" />
                  Ver Todos los Pedidos
                </Button>
                <Button variant="outline" className="w-full justify-start btn-ghost">
                  <Palette className="w-4 h-4 mr-2" />
                  Mis Diseños Guardados
                </Button>
                <Separator />
                <Button 
                  onClick={onLogout}
                  variant="outline" 
                  className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Cerrar Sesión
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};