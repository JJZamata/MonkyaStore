import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Star, Sparkles } from 'lucide-react';
import heroBanner from '@/assets/hero-banner.jpg';

interface HeroSectionProps {
  onCustomizeClick: () => void;
  onCatalogClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ 
  onCustomizeClick, 
  onCatalogClick 
}) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBanner} 
          alt="Modelos con ropa personalizable" 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/60 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          {/* Badge */}
          <Badge 
            variant="secondary" 
            className="mb-6 px-4 py-2 bg-secondary/20 text-secondary border-secondary/30 animate-float"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Diseño personalizado con IA
          </Badge>

          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-slide-up">
            Crea tu{' '}
            <span className="text-gradient-primary">Estilo Único</span>
            <br />
            con Ropa{' '}
            <span className="text-gradient-secondary">Personalizable</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-slide-up [animation-delay:0.2s]">
            Diseña polos y poleras únicos con nuestro editor avanzado y tecnología de IA. 
            Desde logos personalizados hasta colores perfectos, tu imaginación es el límite.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center items-center gap-6 mb-10 text-sm animate-slide-up [animation-delay:0.4s]">
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-warning fill-warning" />
              <span className="text-foreground font-medium">4.9/5 · 2,500+ reseñas</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-border"></div>
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-foreground font-medium">+10,000 diseños creados</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-border"></div>
            <div className="text-foreground font-medium">
              Envío gratuito desde $50
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up [animation-delay:0.6s]">
            <Button 
              size="lg" 
              onClick={onCustomizeClick}
              className="btn-primary px-8 py-4 text-lg font-semibold shadow-glow-primary"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Empieza a Personalizar
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              onClick={onCatalogClick}
              className="btn-ghost px-8 py-4 text-lg font-semibold"
            >
              Ver Catálogo
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 animate-slide-up [animation-delay:0.8s]">
            <div className="card-elevated p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">IA Generativa</h3>
              <p className="text-muted-foreground text-sm">
                Crea logos únicos con inteligencia artificial avanzada
              </p>
            </div>

            <div className="card-elevated p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-secondary to-secondary-light rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a4 4 0 004-4V5z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">Vista 3D</h3>
              <p className="text-muted-foreground text-sm">
                Visualiza tu diseño en tiempo real antes de ordenar
              </p>
            </div>

            <div className="card-elevated p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-success to-warning rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg mb-2">Envío Rápido</h3>
              <p className="text-muted-foreground text-sm">
                Producción y entrega en 3-5 días hábiles
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-float [animation-delay:1s]"></div>
      <div className="absolute bottom-40 right-20 w-32 h-32 bg-secondary/10 rounded-full blur-xl animate-float [animation-delay:2s]"></div>
    </section>
  );
};