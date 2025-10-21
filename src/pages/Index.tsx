import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { ProductCatalog } from '@/components/ProductCatalog';
import { CustomizeSection } from '@/components/CustomizeSection';
import { AILogoSection } from '@/components/AILogoSection';
import Footer from '@/components/Footer';
import { LoginScreen } from '@/components/LoginScreen';
import { RegisterScreen } from '@/components/RegisterScreen';
import { ProfileScreen } from '@/components/ProfileScreen';
import { CheckoutScreen } from '@/components/CheckoutScreen';
import { OrderConfirmationScreen } from '@/components/OrderConfirmationScreen';
import { Product } from '@/components/ProductCard';
import { CartScreen, CartItem } from '@/components/CartScreen';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const [currentSection, setCurrentSection] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSectionChange = (section: string) => {
    setCurrentSection(section);
    // Smooth scroll to top when changing sections
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCustomizeClick = () => {
    setCurrentSection('customize');
  };

  const handleCatalogClick = () => {
    setCurrentSection('catalog');
  };

  const handleCustomizeProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentSection('customize');
  };

  const handleCreateLogo = () => {
    setCurrentSection('ai-logo');
  };

  const handleApplyLogo = (logoData: any) => {
    // Apply logo to customization and go back to customize section
    setCurrentSection('customize');
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentSection('home');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentSection('home');
  };

  const handleRegister = () => {
    setIsLoggedIn(true);
    setCurrentSection('home');
  };

  const handleGoToLogin = () => {
    setCurrentSection('login');
  };

  const handleGoToRegister = () => {
    setCurrentSection('register');
  };

  const handleGoToCheckout = () => {
    setCurrentSection('checkout');
  };

  const handleOrderComplete = () => {
    setCurrentSection('order-confirmation');
  };

  const handleViewOrders = () => {
    setCurrentSection('profile');
  };

  const handleAddToCart = (item: Omit<CartItem, 'id'>) => {
    const newItem: CartItem = {
      ...item,
      id: `${item.productId}-${Date.now()}-${Math.random()}`
    };
    setCartItems(prev => [...prev, newItem]);
    toast({
      title: "¡Añadido al carrito!",
      description: `${item.name} - ${item.colorName} (${item.size})`,
    });
  };

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    setCartItems(prev => 
      prev.map(item => 
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (itemId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
    toast({
      title: "Producto eliminado",
      description: "El producto ha sido eliminado del carrito",
    });
  };

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'home':
        return (
          <HeroSection 
            onCustomizeClick={handleCustomizeClick}
            onCatalogClick={handleCatalogClick}
          />
        );
      case 'catalog':
        return (
          <div className="pt-16">
            <ProductCatalog 
              onCustomizeProduct={handleCustomizeProduct}
              onAddToCart={handleAddToCart}
            />
          </div>
        );
      case 'customize':
        return (
          <div className="pt-16">
            <CustomizeSection 
              selectedProduct={selectedProduct}
              onCreateLogo={handleCreateLogo}
              onAddToCart={handleAddToCart}
            />
          </div>
        );
      case 'ai-logo':
        return (
          <div className="pt-16">
            <AILogoSection onApplyLogo={handleApplyLogo} />
          </div>
        );
      case 'cart':
        return (
          <CartScreen 
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveFromCart}
            onGoToCheckout={() => {
              if (!isLoggedIn) {
                setCurrentSection('login');
              } else {
                handleGoToCheckout();
              }
            }}
            onContinueShopping={() => setCurrentSection('catalog')}
          />
        );
      case 'profile':
        if (!isLoggedIn) {
          return <LoginScreen onLogin={handleLogin} onRegister={handleGoToRegister} />;
        }
        return <ProfileScreen onLogout={handleLogout} />;
      case 'login':
        return <LoginScreen onLogin={handleLogin} onRegister={handleGoToRegister} />;
      case 'register':
        return <RegisterScreen onRegister={handleRegister} onLogin={handleGoToLogin} />;
      case 'checkout':
        if (!isLoggedIn) {
          return <LoginScreen onLogin={handleLogin} onRegister={handleGoToRegister} />;
        }
        return <CheckoutScreen onOrderComplete={handleOrderComplete} />;
      case 'order-confirmation':
        return (
          <OrderConfirmationScreen 
            onContinueShopping={() => setCurrentSection('home')}
            onViewOrders={handleViewOrders}
          />
        );
      default:
        return (
          <HeroSection 
            onCustomizeClick={handleCustomizeClick}
            onCatalogClick={handleCatalogClick}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar 
        currentSection={currentSection}
        onSectionChange={handleSectionChange}
        cartItems={cartItems.length}
        isLoggedIn={isLoggedIn}
      />
      
      <main>
        {renderCurrentSection()}
      </main>

      <Footer />
    </div>
  );
};

export default Index;
