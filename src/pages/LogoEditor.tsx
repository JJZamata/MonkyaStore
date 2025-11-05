import { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import Navigation from "@/components/Navigation";
import Sidebar from '@/components/LogoEditor/Sidebar';
import EditorCanvas from '@/components/LogoEditor/EditorCanvas';
import HistoryPanel from '@/components/LogoEditor/HistoryPanel';
import Footer from '@/components/LogoEditor/Footer';
import logo06 from '@/assets/logo06.png';
import logo07 from '@/assets/logo07.png';

const LogoEditor = () => {
  const [mode, setMode] = useState<'generate' | 'edit' | 'select'>('generate');
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [referenceImages, setReferenceImages] = useState<File[]>([]);
  const [generatedImage, setGeneratedImage] = useState<string>();
  const [poloMockupImage, setPoloMockupImage] = useState<string>();
  const [generationDetails, setGenerationDetails] = useState<{
    prompt: string;
    dimensions: string;
    mode: string;
    timestamp: string;
  }>();

  const handleModeChange = (newMode: 'generate' | 'edit' | 'select') => {
    if (newMode === 'edit') {
      // Limpiar prompt y imágenes de referencia al cambiar a modo edit
      setPrompt('');
      setReferenceImages([]);
      setGeneratedImage(undefined);
      setPoloMockupImage(undefined);
      setGenerationDetails(undefined);
    }
    setMode(newMode);
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "Please describe what you want to create",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    // Simulación de tiempo de espera de 2-3 segundos
    const delay = 2000 + Math.random() * 1000; // Entre 2-3 segundos

    try {
      await new Promise(resolve => setTimeout(resolve, delay));

      // Determinar qué imagen mostrar según el modo actual
      let selectedImage: string;
      if (mode === 'generate') {
        selectedImage = logo06;
      } else if (mode === 'edit') {
        selectedImage = logo07;
      } else {
        selectedImage = logo06; // Default para select
      }

      setGeneratedImage(selectedImage);
      setGenerationDetails({
        prompt: prompt,
        dimensions: '1024x1024',
        mode: mode.charAt(0).toUpperCase() + mode.slice(1),
        timestamp: new Date().toLocaleString()
      });

      toast({
        title: "Success!",
        description: `Your image has been generated in ${mode} mode`,
      });
    } catch (err) {
      console.error('Error generating image:', err);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!generatedImage) return;

    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `monkya-ai-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Downloaded!",
      description: "Your image has been downloaded",
    });
  };

  const handleDuplicate = () => {
    toast({
      title: "Duplicated",
      description: "Image duplicated to history",
    });
  };

  const handleDelete = () => {
    setGeneratedImage(undefined);
    setGenerationDetails(undefined);

    toast({
      title: "Deleted",
      description: "Image removed from canvas",
    });
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
         <Navigation />
      {/* Main Content */}
      <div className="flex flex-1">
        <Sidebar
          mode={mode}
          onModeChange={handleModeChange}
          prompt={prompt}
          onPromptChange={setPrompt}
          onGenerate={handleGenerate}
          isGenerating={isGenerating}
          referenceImages={referenceImages}
          onReferenceImagesChange={setReferenceImages}
        />

        <EditorCanvas
          generatedImage={generatedImage}
          isGenerating={isGenerating}
          poloMockupImage={poloMockupImage}
          onPoloModeChange={setPoloMockupImage}
        />

        <HistoryPanel
          generatedImage={generatedImage}
          generationDetails={generationDetails}
          onDownload={handleDownload}
          onDuplicate={handleDuplicate}
          onDelete={handleDelete}
        />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LogoEditor;