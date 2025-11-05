import { useState } from 'react';
import { Upload, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  mode: 'generate' | 'edit' | 'select';
  onModeChange: (mode: 'generate' | 'edit' | 'select') => void;
  prompt: string;
  onPromptChange: (prompt: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
  referenceImages: File[];
  onReferenceImagesChange: (images: File[]) => void;
}

const Sidebar = ({
  mode,
  onModeChange,
  prompt,
  onPromptChange,
  onGenerate,
  isGenerating,
  referenceImages,
  onReferenceImagesChange
}: SidebarProps) => {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (referenceImages.length + files.length <= 2) {
      onReferenceImagesChange([...referenceImages, ...files]);
    }
  };

  const removeImage = (index: number) => {
    const newImages = referenceImages.filter((_, i) => i !== index);
    onReferenceImagesChange(newImages);
  };

  const getPromptQuality = () => {
    const wordCount = prompt.trim().split(/\s+/).length;
    if (wordCount >= 15) return { text: 'Excellent prompt detail', color: 'text-green-400' };
    if (wordCount >= 10) return { text: 'Good prompt detail', color: 'text-yellow-400' };
    return { text: 'Add more details', color: 'text-gray-400' };
  };

  const promptQuality = getPromptQuality();

  return (
    <div className="w-80 bg-black min-h-screen p-6 flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="text-4xl"></div>
        <div>
          <h1 className="text-xl font-bold text-yellow-400">Monkya AI</h1>
          <p className="text-xs text-gray-400">Image Editor v1.0</p>
        </div>
      </div>

      {/* Mode Selector */}
      <div className="mb-6">
        <div className="flex gap-2">
          {(['generate', 'edit', 'select'] as const).map((m) => (
            <Button
              key={m}
              variant={mode === m ? 'default' : 'outline'}
              size="sm"
              onClick={() => onModeChange(m)}
              className={`flex-1 ${
                mode === m
                  ? 'bg-yellow-400 text-black hover:bg-yellow-500'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white border-gray-700'
              }`}
            >
              {m.charAt(0).toUpperCase() + m.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* Reference Images */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-300 mb-3">Imágenes de Referencia</h3>
        <div className="grid grid-cols-2 gap-2 mb-3">
          {referenceImages.map((image, index) => (
            <div key={index} className="relative group">
              <img
                src={URL.createObjectURL(image)}
                alt={`Reference ${index + 1}`}
                className="w-full h-20 object-cover rounded border border-gray-700"
              />
              <Button
                size="sm"
                variant="destructive"
                onClick={() => removeImage(index)}
                className="absolute -top-2 -right-2 w-6 h-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
          {referenceImages.length < 2 && (
            <label className="border-2 border-dashed border-gray-700 rounded h-20 flex items-center justify-center cursor-pointer hover:border-yellow-400 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                disabled={referenceImages.length >= 2}
              />
              <Upload className="h-4 w-4 text-gray-500" />
            </label>
          )}
        </div>
      </div>

      {/* Prompt Input */}
      <div className="mb-4">
        <textarea
          placeholder="Describe que es lo que quieres crear..."
          value={prompt}
          onChange={(e) => onPromptChange(e.target.value)}
          className="w-full h-32 p-3 bg-gray-900 border border-gray-700 rounded text-white placeholder-gray-500 resize-none focus:outline-none focus:border-yellow-400"
        />
        <div className="mt-2 flex items-center justify-between">
          <span className={`text-xs ${promptQuality.color}`}>
            {promptQuality.text}
          </span>
          <span className="text-xs text-gray-500">
            {prompt.trim().split(/\s+/).length} words
          </span>
        </div>
      </div>

      {/* Generate Button */}
      <Button
        onClick={onGenerate}
        disabled={isGenerating || !prompt.trim()}
        className="w-full bg-yellow-400 text-black hover:bg-yellow-500 font-semibold py-3 mb-6"
      >
        {isGenerating ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
            Generando...
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            Generar
          </div>
        )}
      </Button>

      {/* Bottom Options */}
      <div className="mt-auto space-y-2">
        <button className="text-sm text-gray-400 hover:text-yellow-400 transition-colors">
          Show Advanced Controls
        </button>
        <button className="text-sm text-gray-400 hover:text-yellow-400 transition-colors">
          Clear Session
        </button>
      </div>
    </div>
  );
};

export default Sidebar;