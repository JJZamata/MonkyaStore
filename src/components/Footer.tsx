import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { 
  Palette, 
  Instagram, 
  Facebook, 
  Twitter, 
  Mail, 
  Phone, 
  MapPin,
  Heart
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-neutral-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">
              Mantente al día con las últimas tendencias
            </h3>
            <p className="text-neutral-400 mb-6">
              Recibe ofertas exclusivas, nuevos diseños y tips de personalización directamente en tu inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder="Tu correo electrónico"
                className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-400"
              />
              <Button className="btn-secondary whitespace-nowrap">
                Suscribirme
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Palette className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gradient-primary">CustomWear</h2>
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed">
              La plataforma líder en personalización de ropa con tecnología de IA. 
              Crea diseños únicos que reflejen tu estilo personal.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="sm" className="text-neutral-400 hover:text-white p-2">
                <Instagram className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-neutral-400 hover:text-white p-2">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-neutral-400 hover:text-white p-2">
                <Twitter className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Productos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                  Polos Personalizables
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                  Poleras Únicas
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                  Diseños con IA
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                  Colecciones Limitadas
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                  Ropa Corporativa
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Soporte</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                  Centro de Ayuda
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                  Guía de Tallas
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                  Envíos y Devoluciones
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                  Preguntas Frecuentes
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contacto</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-neutral-400 mt-0.5 flex-shrink-0" />
                <span className="text-neutral-400">
                  Av. Principal 123<br />
                  Lima, Perú 15001
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                <span className="text-neutral-400">+51 1 234-5678</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                <span className="text-neutral-400">hola@customwear.com</span>
              </div>
            </div>
            <div className="bg-neutral-800 rounded-lg p-4">
              <p className="text-xs text-neutral-400 mb-2">Horarios de atención:</p>
              <p className="text-sm text-white">
                Lunes - Viernes: 9AM - 6PM<br />
                Sábados: 10AM - 4PM
              </p>
            </div>
          </div>
        </div>
      </div>

      <Separator className="bg-neutral-800" />

      {/* Bottom Bar */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-neutral-400">
            <span>© 2024 CustomWear. Todos los derechos reservados.</span>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-white transition-colors">
                Términos y Condiciones
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Política de Privacidad
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Cookies
              </a>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-neutral-400">
            <span>Hecho con</span>
            <Heart className="w-4 h-4 text-destructive fill-current" />
            <span>en Perú</span>
          </div>
        </div>
      </div>
    </footer>
  );
};