import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, View, Truck } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-image.jpg";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${heroImage})`,
            filter: "brightness(0.7)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 to-secondary/50" />

        <div className="container relative mx-auto px-4 py-32 text-center">
          <h1 className="mb-6 text-5xl font-bold text-secondary-foreground md:text-7xl">
            Tu Estilo,{" "}
            <span className="text-primary">Único</span>
          </h1>
          <p className="mb-8 text-xl text-secondary-foreground md:text-2xl">
            Crea ropa personalizada con diseño asistido por IA
          </p>
          <Link to="/customize">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-[var(--shadow-yellow)] text-lg px-8 py-6"
            >
              Empieza a Personalizar
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="rounded-lg border border-border bg-card p-8 text-center shadow-[var(--shadow-card)] transition-all hover:shadow-[var(--shadow-yellow)]">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary">
              <Sparkles className="h-8 w-8 text-primary-foreground" />
            </div>
            <h3 className="mb-3 text-2xl font-bold text-card-foreground">
              IA Generativa
            </h3>
            <p className="text-muted-foreground">
              Genera logos y diseños únicos con inteligencia artificial
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-8 text-center shadow-[var(--shadow-card)] transition-all hover:shadow-[var(--shadow-yellow)]">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary">
              <View className="h-8 w-8 text-primary-foreground" />
            </div>
            <h3 className="mb-3 text-2xl font-bold text-card-foreground">
              Vista 3D
            </h3>
            <p className="text-muted-foreground">
              Visualiza tu prenda en tiempo real con nuestro personalizador 3D
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-8 text-center shadow-[var(--shadow-card)] transition-all hover:shadow-[var(--shadow-yellow)]">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary">
              <Truck className="h-8 w-8 text-primary-foreground" />
            </div>
            <h3 className="mb-3 text-2xl font-bold text-card-foreground">
              Envío Rápido
            </h3>
            <p className="text-muted-foreground">
              Recibe tu diseño personalizado en 3-5 días hábiles
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 text-4xl font-bold text-foreground">
            ¿Listo para crear algo increíble?
          </h2>
          <p className="mb-8 text-xl text-muted-foreground">
            Explora nuestro catálogo o empieza a diseñar ahora
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link to="/catalog">
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                Ver Catálogo
              </Button>
            </Link>
            <Link to="/logo-generator">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Generador de Logos IA
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
