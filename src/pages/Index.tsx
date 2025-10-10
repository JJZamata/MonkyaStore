import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { ProductCatalog } from '@/components/ProductCatalog';
import { CustomizeSection } from '@/components/CustomizeSection';
import { AILogoSection } from '@/components/AILogoSection';
import { Footer } from '@/components/Footer';
import { LoginScreen } from '@/components/LoginScreen';
import { RegisterScreen } from '@/components/RegisterScreen';
import { ProfileScreen } from '@/components/ProfileScreen';
import { CheckoutScreen } from '@/components/CheckoutScreen';
import { OrderConfirmationScreen } from '@/components/OrderConfirmationScreen';
import { Product } from '@/components/ProductCard';

const Index = () => {
  const [currentSection, setCurrentSection] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();
  const [cartItems, setCartItems] = useState(2); // Simulamos 2 items en el carrito
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
            <ProductCatalog onCustomizeProduct={handleCustomizeProduct} />
          </div>
        );
      case 'customize':
        return (
          <div className="pt-16">
            <CustomizeSection 
              selectedProduct={selectedProduct}
              onCreateLogo={handleCreateLogo}
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
        if (!isLoggedIn) {
          return <LoginScreen onLogin={handleLogin} onRegister={handleGoToRegister} />;
        }
        return (
          <div className="pt-16 min-h-screen flex items-center justify-center">
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl mx-auto flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m-2.4 0L3 3z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gradient-primary">Tu Carrito</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Tienes {cartItems} productos listos para personalizar y comprar
              </p>
              <div className="space-y-3">
                <button 
                  onClick={handleGoToCheckout}
                  className="bg-gradient-to-r from-primary to-primary-light text-white px-8 py-3 rounded-xl font-medium hover:shadow-glow-primary transform hover:scale-105 transition-all duration-300"
                >
                  Proceder al Checkout
                </button>
                <p className="text-sm text-muted-foreground">
                  *Funcionalidad completa del carrito próximamente
                </p>
              </div>
            </div>
          </div>
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
        cartItems={cartItems}
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
