import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Sparkles, 
  Wand2, 
  Download, 
  RefreshCw, 
  Copy,
  Heart,
  Star,
  Palette
} from 'lucide-react';

const presetStyles = [
  { id: 'minimalist', name: 'Minimalista', description: 'Líneas limpias y simplicidad' },
  { id: 'geometric', name: 'Geométrico', description: 'Formas geométricas modernas' },
  { id: 'vintage', name: 'Vintage', description: 'Estilo retro y clásico' },
  { id: 'modern', name: 'Moderno', description: 'Tendencias actuales' },
  { id: 'playful', name: 'Divertido', description: 'Colorido y expresivo' },
  { id: 'elegant', name: 'Elegante', description: 'Sofisticado y refinado' }
];

const colorSchemes = [
  { name: 'Azul y Blanco', colors: ['#007AFF', '#FFFFFF'] },
  { name: 'Negro y Dorado', colors: ['#000000', '#FFD700'] },
  { name: 'Verde y Blanco', colors: ['#059669', '#FFFFFF'] },
  { name: 'Rojo y Negro', colors: ['#DC2626', '#000000'] },
  { name: 'Morado y Plata', colors: ['#7C3AED', '#C0C0C0'] },
  { name: 'Multicolor', colors: ['#FF6B6B', '#4ECDC4', '#45B7D1'] }
];

const sampleLogos = [
  { id: '1', prompt: 'Un zorro geométrico minimalista en azul', style: 'geometric' },
  { id: '2', prompt: 'Logo de montaña elegante para outdoor', style: 'minimalist' },
  { id: '3', prompt: 'Tipografía moderna para marca de tech', style: 'modern' },
  { id: '4', prompt: 'Símbolo de café vintage circular', style: 'vintage' }
];

interface AILogoSectionProps {
  onApplyLogo: (logoData: any) => void;
}

export const AILogoSection: React.FC<AILogoSectionProps> = ({ onApplyLogo }) => {
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('minimalist');
  const [selectedColors, setSelectedColors] = useState(colorSchemes[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLogos, setGeneratedLogos] = useState<any[]>([]);
  const [favoriteLogos, setFavoriteLogos] = useState<Set<string>>(new Set());

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    
    // Simular generación de logos
    setTimeout(() => {
      const newLogos = [
        {
          id: Date.now().toString(),
          prompt,
          style: selectedStyle,
          colors: selectedColors.colors,
          imageUrl: `/api/placeholder/400/400?text=Logo1`,
          timestamp: new Date()
        },
        {
          id: (Date.now() + 1).toString(),
          prompt,
          style: selectedStyle,
          colors: selectedColors.colors,
          imageUrl: `/api/placeholder/400/400?text=Logo2`,
          timestamp: new Date()
        }
      ];
      
      setGeneratedLogos(prev => [...newLogos, ...prev]);
      setIsGenerating(false);
    }, 3000);
  };

  const handleToggleFavorite = (logoId: string) => {
    setFavoriteLogos(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(logoId)) {
        newFavorites.delete(logoId);
      } else {
        newFavorites.add(logoId);
      }
      return newFavorites;
    });
  };

  const handleUsePrompt = (samplePrompt: string, style: string) => {
    setPrompt(samplePrompt);
    setSelectedStyle(style);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 px-4 py-2 bg-primary/10 text-primary border-primary/20">
            <Sparkles className="w-4 h-4 mr-2" />
            Inteligencia Artificial
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Crea Logos <span className="text-gradient-primary">Únicos</span> con IA
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Describe tu idea y nuestra IA generará logos profesionales perfectos para tu prenda personalizada
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Logo Generator */}
          <div className="xl:col-span-2 space-y-6">
            <Tabs defaultValue="create" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="create">Crear Logo</TabsTrigger>
                <TabsTrigger value="gallery">Mi Galería</TabsTrigger>
              </TabsList>

              <TabsContent value="create" className="space-y-6">
                <Card className="card-elevated">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Wand2 className="w-5 h-5" />
                      Generador de Logos IA
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Prompt Input */}
                    <div>
                      <label className="text-sm font-medium mb-3 block">
                        Describe tu logo ideal:
                      </label>
                      <Textarea
                        placeholder="Ej: Un logo minimalista con un zorro geométrico en tonos azules, moderno y elegante para una marca de tecnología..."
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="min-h-[100px] resize-none"
                      />
                      <p className="text-xs text-muted-foreground mt-2">
                        Sé específico: menciona formas, estilo, colores y el sentimiento que quieres transmitir
                      </p>
                    </div>

                    {/* Style Selection */}
                    <div>
                      <label className="text-sm font-medium mb-3 block">Estilo:</label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {presetStyles.map((style) => (
                          <button
                            key={style.id}
                            onClick={() => setSelectedStyle(style.id)}
                            className={`p-3 rounded-lg border text-left transition-all duration-200 hover:shadow-md ${
                              selectedStyle === style.id
                                ? 'border-primary bg-primary/10 shadow-glow-primary'
                                : 'border-border hover:border-primary/50 bg-card'
                            }`}
                          >
                            <div className="font-semibold text-sm">{style.name}</div>
                            <div className="text-xs text-muted-foreground">{style.description}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Color Scheme */}
                    <div>
                      <label className="text-sm font-medium mb-3 block">Esquema de colores:</label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {colorSchemes.map((scheme) => (
                          <button
                            key={scheme.name}
                            onClick={() => setSelectedColors(scheme)}
                            className={`p-3 rounded-lg border transition-all duration-200 hover:shadow-md ${
                              selectedColors.name === scheme.name
                                ? 'border-primary shadow-glow-primary'
                                : 'border-border hover:border-primary/50'
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              {scheme.colors.map((color, index) => (
                                <div
                                  key={index}
                                  className="w-4 h-4 rounded-full border border-border"
                                  style={{ backgroundColor: color }}
                                />
                              ))}
                            </div>
                            <div className="text-xs font-medium">{scheme.name}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Generate Button */}
                    <Button
                      onClick={handleGenerate}
                      disabled={!prompt.trim() || isGenerating}
                      className="w-full btn-primary h-12 text-lg"
                    >
                      {isGenerating ? (
                        <>
                          <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                          Generando logos mágicos...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5 mr-2" />
                          Generar Logos con IA
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>

                {/* Sample Prompts */}
                <Card className="card-elevated">
                  <CardHeader>
                    <CardTitle className="text-lg">Ideas para inspirarte</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {sampleLogos.map((sample) => (
                        <button
                          key={sample.id}
                          onClick={() => handleUsePrompt(sample.prompt, sample.style)}
                          className="p-3 text-left border border-border rounded-lg hover:border-primary/50 hover:bg-accent/50 transition-all duration-200"
                        >
                          <div className="text-sm font-medium mb-1">{sample.prompt}</div>
                          <Badge variant="outline" className="text-xs">
                            {presetStyles.find(s => s.id === sample.style)?.name}
                          </Badge>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="gallery">
                <Card className="card-elevated">
                  <CardHeader>
                    <CardTitle>Mis Logos Generados</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {generatedLogos.length === 0 ? (
                      <div className="text-center py-12">
                        <Palette className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Aún no has creado logos</h3>
                        <p className="text-muted-foreground mb-6">
                          Usa el generador de IA para crear tus primeros logos únicos
                        </p>
                        <Button variant="outline" onClick={() => setPrompt('')}>
                          Empezar a crear
                        </Button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {generatedLogos.map((logo) => (
                          <div key={logo.id} className="group relative">
                            <div className="aspect-square bg-muted rounded-lg p-4 flex items-center justify-center border border-border hover:border-primary/50 transition-all duration-200">
                              <div className="text-center">
                                <Sparkles className="w-8 h-8 text-primary mx-auto mb-2" />
                                <div className="text-sm font-medium">Logo generado</div>
                                <div className="text-xs text-muted-foreground mt-1">
                                  {logo.style}
                                </div>
                              </div>
                            </div>
                            
                            <div className="absolute top-2 right-2 flex gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleToggleFavorite(logo.id)}
                                className={`w-8 h-8 p-0 bg-card/80 backdrop-blur-sm ${
                                  favoriteLogos.has(logo.id) ? 'text-destructive' : 'text-muted-foreground'
                                }`}
                              >
                                <Heart className={`w-4 h-4 ${favoriteLogos.has(logo.id) ? 'fill-current' : ''}`} />
                              </Button>
                            </div>

                            <div className="absolute inset-0 bg-black/60 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                              <div className="flex gap-2">
                                <Button size="sm" onClick={() => onApplyLogo(logo)}>
                                  Usar
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Download className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Tips & Features */}
          <div className="space-y-6">
            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="text-lg">Tips para mejores resultados</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <Star className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium">Sé específico</div>
                      <div className="text-muted-foreground">Describe formas, colores y estilo en detalle</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Star className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium">Menciona el uso</div>
                      <div className="text-muted-foreground">Indica si es para ropa, empresa, evento, etc.</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Star className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-medium">Experimenta</div>
                      <div className="text-muted-foreground">Prueba diferentes estilos y esquemas de color</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-elevated">
              <CardHeader>
                <CardTitle className="text-lg">Características IA</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Generación instantánea</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  <span>Múltiples variaciones</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span>Alta resolución</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-warning rounded-full"></div>
                  <span>Formatos vectoriales</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};