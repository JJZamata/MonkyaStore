import { Download, Copy, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import monkyaPintor from '@/assets/MonkyaPintor.png';

interface HistoryPanelProps {
  generatedImage?: string;
  generationDetails?: {
    prompt: string;
    dimensions: string;
    mode: string;
    timestamp: string;
  };
  onDownload?: () => void;
  onDuplicate?: () => void;
  onDelete?: () => void;
}

const HistoryPanel = ({
  generatedImage,
  generationDetails,
  onDownload,
  onDuplicate,
  onDelete
}: HistoryPanelProps) => {
  const variants = [
    { id: 1, selected: true },
    { id: 2, selected: false },
    { id: 3, selected: false },
    { id: 4, selected: false },
  ];

  return (
    <div className="w-80 bg-black min-h-screen p-6">
      <h2 className="text-xl font-bold text-yellow-400 mb-6">Historial - Variantes</h2>

      {/* Current Generation */}
      <div className="mb-6">
        <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-400">Actual</span>
            <span className="text-xs bg-yellow-400 text-black px-2 py-1 rounded font-medium">
              #1
            </span>
          </div>

          <div className="aspect-square bg-black rounded-lg mb-3 overflow-hidden">
            {generatedImage ? (
              <img
                src={generatedImage}
                alt="Generated"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-600">
                <div className="text-center">
                  <img
                    src={monkyaPintor}
                    alt="Monkya Pintor"
                    className="w-12 h-12 mx-auto mb-2 object-contain opacity-70"
                  />
                  <p className="text-xs">Imagen no generada</p>
                </div>
              </div>
            )}
          </div>

          {/* Technical Details */}
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Dimensiones:</span>
              <span className="text-gray-300">{generationDetails?.dimensions || '1024x1024'}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-500">Modo:</span>
              <span className="text-gray-300">{generationDetails?.mode || 'Generate'}</span>
            </div>
          </div>

          {/* Generation Details */}
          <div className="bg-gray-950 rounded p-3 mb-4">
            <h4 className="text-xs font-medium text-gray-400 mb-2">Detalles</h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              {generationDetails?.prompt || 'No prompt yet'}
            </p>
            <p className="text-xs text-gray-600 mt-2">
              {generationDetails?.timestamp || new Date().toLocaleString()}
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={onDownload}
              disabled={!generatedImage}
              className="flex-1 bg-yellow-400 text-black hover:bg-yellow-500 disabled:bg-gray-800 disabled:text-gray-600"
            >
              <Download className="h-3 w-3 mr-1" />
              Enviar
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={onDuplicate}
              disabled={!generatedImage}
              className="px-3 border-gray-700 text-gray-400 hover:text-yellow-400 disabled:text-gray-600"
            >
              <Copy className="h-3 w-3" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={onDelete}
              disabled={!generatedImage}
              className="px-3 border-gray-700 text-gray-400 hover:text-red-400 disabled:text-gray-600"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>

      {/* Previous Variants */}
      <div>
        <h3 className="text-sm font-medium text-gray-400 mb-3">Previas generaciones</h3>
        <div className="space-y-2">
          {variants.slice(1).map((variant) => (
            <div
              key={variant.id}
              className={`bg-gray-900 rounded-lg p-3 border ${
                variant.selected ? 'border-yellow-400' : 'border-gray-800'
              } hover:border-gray-700 transition-colors cursor-pointer`}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-black rounded flex items-center justify-center">
                  <span className="text-gray-600 text-xs">#{variant.id}</span>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-400">Generación previa</p>
                  <p className="text-xs text-gray-600">2 hours ago</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HistoryPanel;