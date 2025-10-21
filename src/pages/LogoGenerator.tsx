import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Download } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const LogoGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLogo, setGeneratedLogo] = useState<{
    description: string;
    style: string;
  } | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "Por favor, describe el diseño que quieres generar",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('generate-logo', {
        body: { 
          prompt: prompt,
          style: 'modern',
          colors: ['#FFD700', '#000000']
        }
      });

      if (error) {
        console.error('Error:', error);
        toast({
          title: "Error",
          description: "No se pudo generar el logo. Intenta de nuevo.",
          variant: "destructive",
        });
        setIsGenerating(false);
        return;
      }

      if (data?.success) {
        setGeneratedLogo({
          description: data.description,
          style: data.style
        });
        toast({
          title: "¡Logo generado!",
          description: "Tu diseño está listo",
        });
      } else {
        toast({
          title: "Error",
          description: data?.error || "No se pudo generar el logo",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error('Error generando logo:', err);
      toast({
        title: "Error",
        description: "Ocurrió un error inesperado",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-12">
        <h1 className="mb-8 text-4xl font-bold text-foreground">
          Generador de Logos IA
        </h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="rounded-lg border border-border bg-card p-6 shadow-[var(--shadow-card)]">
              <h2 className="mb-4 text-2xl font-semibold text-card-foreground">
                Describe tu Diseño
              </h2>
              <p className="mb-4 text-sm text-muted-foreground">
                Cuéntale a nuestra IA qué tipo de logo o diseño quieres para tu prenda
              </p>
              <Input
                placeholder="Ej: Un mono urbano con gorro amarillo..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="mb-4"
              />
              <Button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-[var(--shadow-yellow)]"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <span className="animate-spin mr-2">⚙️</span>
                    Generando...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-5 w-5" />
                    Generar Diseño
                  </>
                )}
              </Button>
            </div>

            <div className="rounded-lg border border-border bg-card p-6 shadow-[var(--shadow-card)]">
              <h3 className="mb-3 text-lg font-semibold text-card-foreground">
                Ejemplos de Prompts
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Un logo minimalista de montañas con el sol
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Un dragón en estilo japonés con colores vibrantes
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Texto "Street Style" con efecto graffiti
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Un tigre geométrico en blanco y negro
                </li>
              </ul>
            </div>
          </div>

          {/* Preview Section */}
          <div className="rounded-lg border border-border bg-card p-8 shadow-[var(--shadow-card)]">
            <h2 className="mb-4 text-2xl font-semibold text-card-foreground">
              Vista Previa
            </h2>
            <div className="flex aspect-square items-center justify-center rounded-lg bg-muted p-6">
              {isGenerating ? (
                <div className="text-center">
                  <div className="mb-4 animate-pulse text-6xl">✨</div>
                  <p className="text-muted-foreground">
                    Generando tu diseño con IA...
                  </p>
                </div>
              ) : generatedLogo ? (
                <div className="text-center w-full">
                  <div className="mb-4 text-4xl">🎨</div>
                  <div className="bg-card p-4 rounded-lg border border-border">
                    <h3 className="font-semibold mb-2 text-card-foreground">Logo Generado</h3>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                      {generatedLogo.description}
                    </p>
                    <div className="mt-3">
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                        Estilo: {generatedLogo.style}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="mb-4 text-6xl">🎨</div>
                  <p className="text-muted-foreground">
                    Tu diseño aparecerá aquí
                  </p>
                </div>
              )}
            </div>
            <div className="mt-6 space-y-3">
              <Button
                variant="outline"
                className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                disabled={!generatedLogo}
              >
                Aplicar a Prenda
              </Button>
              <Button
                variant="outline"
                className="w-full"
                disabled={!generatedLogo}
              >
                <Download className="mr-2 h-4 w-4" />
                Descargar Diseño
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LogoGenerator;
