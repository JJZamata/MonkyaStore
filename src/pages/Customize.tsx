import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { toast } from "@/hooks/use-toast";

const colors = [
  { name: "Negro", value: "#1A1A1A" },
  { name: "Blanco", value: "#FFFFFF" },
  { name: "Amarillo", value: "#FFD700" },
  { name: "Rojo", value: "#DC2626" },
  { name: "Azul", value: "#2563EB" },
  { name: "Verde", value: "#16A34A" },
];

const Customize = () => {
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  const handleAddToCart = () => {
    toast({
      title: "¡Añadido al carrito!",
      description: `Camiseta personalizada en color ${selectedColor.name}`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-12">
        <h1 className="mb-8 text-4xl font-bold text-foreground">
          Personaliza tu Prenda
        </h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* 3D Preview */}
          <div className="rounded-lg border border-border bg-card p-8 shadow-[var(--shadow-card)]">
            <div className="flex aspect-square items-center justify-center rounded-lg" style={{ backgroundColor: selectedColor.value }}>
              <div className="text-center">
                <div className="mb-4 text-6xl">👕</div>
                <p className="text-sm font-medium" style={{ color: selectedColor.value === "#FFFFFF" ? "#1A1A1A" : "#FFFFFF" }}>
                  Vista 3D
                </p>
              </div>
            </div>
            <p className="mt-4 text-center text-sm text-muted-foreground">
              Selecciona un color para ver la vista previa
            </p>
          </div>

          {/* Customization Options */}
          <div className="space-y-6">
            <div className="rounded-lg border border-border bg-card p-6 shadow-[var(--shadow-card)]">
              <h2 className="mb-4 text-2xl font-semibold text-card-foreground">
                Opciones de Personalización
              </h2>

              <div className="mb-6">
                <h3 className="mb-3 text-lg font-medium text-card-foreground">
                  Elige tu Color
                </h3>
                <div className="flex flex-wrap gap-3">
                  {colors.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setSelectedColor(color)}
                      className={`h-12 w-12 rounded-full border-4 transition-all ${
                        selectedColor.value === color.value
                          ? "border-primary scale-110 shadow-[var(--shadow-yellow)]"
                          : "border-border hover:border-primary/50"
                      }`}
                      style={{ backgroundColor: color.value }}
                      aria-label={color.name}
                    />
                  ))}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Color seleccionado: {selectedColor.name}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="mb-3 text-lg font-medium text-card-foreground">
                  Talla
                </h3>
                <div className="grid grid-cols-5 gap-2">
                  {["XS", "S", "M", "L", "XL"].map((size) => (
                    <Button
                      key={size}
                      variant="outline"
                      className="hover:bg-primary hover:text-primary-foreground hover:border-primary"
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="border-t border-border pt-6">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-lg font-medium text-card-foreground">
                    Precio Total:
                  </span>
                  <span className="text-3xl font-bold text-primary">
                    24.99€
                  </span>
                </div>
                <Button
                  onClick={handleAddToCart}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-[var(--shadow-yellow)]"
                  size="lg"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Agregar al Carrito
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Customize;
