import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { 
  Menu, 
  ShoppingCart, 
  User, 
  Palette, 
  Home, 
  Grid3X3,
  Sparkles 
} from 'lucide-react';

interface NavbarProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
  cartItems?: number;
  isLoggedIn?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentSection, 
  onSectionChange, 
  cartItems = 0,
  isLoggedIn = false
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Inicio', icon: Home },
    { id: 'catalog', label: 'Catálogo', icon: Grid3X3 },
    { id: 'customize', label: 'Personaliza', icon: Palette },
    { id: 'ai-logo', label: 'Logo IA', icon: Sparkles },
  ];

  const handleNavClick = (sectionId: string) => {
    onSectionChange(sectionId);
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-soft">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Palette className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gradient-primary">
              FlexWear
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={currentSection === item.id ? 'default' : 'ghost'}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center space-x-2 transition-smooth ${
                    currentSection === item.id 
                      ? 'btn-primary' 
                      : 'hover:bg-accent hover:text-accent-foreground'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Button>
              );
            })}
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleNavClick('cart')}
              className="relative btn-ghost"
            >
              <ShoppingCart className="w-4 h-4" />
              {cartItems > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center text-xs"
                >
                  {cartItems}
                </Badge>
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleNavClick(isLoggedIn ? 'profile' : 'login')}
              className="btn-ghost"
            >
              <User className="w-4 h-4" />
              <span className="ml-2 hidden lg:block">
                {isLoggedIn ? 'Perfil' : 'Acceder'}
              </span>
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Button
                        key={item.id}
                        variant={currentSection === item.id ? 'default' : 'ghost'}
                        onClick={() => handleNavClick(item.id)}
                        className={`flex items-center justify-start space-x-3 w-full h-12 ${
                          currentSection === item.id ? 'btn-primary' : 'btn-ghost'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="text-base">{item.label}</span>
                      </Button>
                    );
                  })}
                  
                  <div className="border-t border-border pt-4 space-y-3">
                    <Button
                      variant="outline"
                      onClick={() => handleNavClick('cart')}
                      className="flex items-center justify-start space-x-3 w-full h-12 btn-ghost relative"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      <span className="text-base">Carrito</span>
                      {cartItems > 0 && (
                        <Badge variant="destructive" className="ml-auto">
                          {cartItems}
                        </Badge>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleNavClick(isLoggedIn ? 'profile' : 'login')}
                      className="flex items-center justify-start space-x-3 w-full h-12 btn-ghost"
                    >
                      <User className="w-5 h-5" />
                      <span className="text-base">
                        {isLoggedIn ? 'Mi Perfil' : 'Iniciar Sesión'}
                      </span>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};