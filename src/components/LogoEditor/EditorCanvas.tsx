import { useState } from 'react';
import { ZoomIn, Undo, Redo, Layers, Shirt , Hexagon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import monkyaPintor from '@/assets/MonkyaPintor.png';
import poloMockup from '@/assets/PolosMonkya07v2.png';

interface EditorCanvasProps {
  generatedImage?: string;
  isGenerating: boolean;
  poloMockupImage?: string;
  onPoloModeChange?: (image: string) => void;
}

const EditorCanvas = ({ generatedImage, isGenerating, poloMockupImage, onPoloModeChange }: EditorCanvasProps) => {
  const [zoom, setZoom] = useState(100);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [viewMode, setViewMode] = useState<'logo' | 'polo'>('logo');

  const handleZoomIn = () => {
    setZoom(Math.min(200, zoom + 10));
  };

  const handleZoomOut = () => {
    setZoom(Math.max(50, zoom - 10));
  };

  return (
    <div className="flex-1 bg-[#111111] min-h-screen p-6 border-l-[1px] border-r-[1px] border-yellow-400">
      {/* Toolbar */}
      <div className="bg-black rounded-lg p-3 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-gray-900 rounded px-3 py-1">
            <Button
              size="sm"
              variant="ghost"
              onClick={handleZoomOut}
              className="h-6 w-6 p-0 text-gray-400 hover:text-yellow-400"
            >
              -
            </Button>
            <span className="text-sm text-gray-300 min-w-[50px] text-center">
              {zoom}%
            </span>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleZoomIn}
              className="h-6 w-6 p-0 text-gray-400 hover:text-yellow-400"
            >
              +
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            disabled={!canUndo}
            className="text-gray-400 hover:text-yellow-400 disabled:text-gray-600"
          >
            <Undo className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            disabled={!canRedo}
            className="text-gray-400 hover:text-yellow-400 disabled:text-gray-600"
          >
            <Redo className="h-4 w-4" />
          </Button>
          <div className="h-4 w-px bg-gray-700 mx-1" />
          <Button
            size="sm"
            variant="ghost"
            className="text-gray-400 hover:text-yellow-400"
          >
            <Layers className="h-4 w-4" />
            <span className="ml-1 text-sm">Masks</span>
          </Button>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="flex items-center justify-center min-h-[calc(100vh-250px)]">
        <div
          className="bg-[#110011] rounded-lg p-8 shadow-2xl flex items-center justify-center"
          style={{
            transform: `scale(${zoom / 100})`,
            transition: 'transform 0.2s ease'
          }}
        >
          <div className="w-96 h-96 bg-black rounded-lg flex items-center justify-center border border-gray-700 relative overflow-hidden">
            {isGenerating ? (
              <div className="absolute inset-0 flex items-center justify-center text-center">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mb-4" />
                  <p className="text-gray-400">Generando tu imagen...</p>
                </div>
              </div>
            ) : generatedImage ? (
              <div
                className={`w-full h-full relative ${viewMode === 'polo' ? 'rotate-vertical-center' : ''}`}
                style={{
                  animation: viewMode === 'polo' ? 'rotate-vertical-center 0.4s ease-in-out' : 'none'
                }}
              >
                {viewMode === 'logo' ? (
                  <div className="w-full h-full flex items-center justify-center p-8">
                    <img
                      src={generatedImage}
                      alt="Generated logo"
                      className="max-w-full max-h-full object-contain rounded-lg"
                    />
                  </div>
                ) : (
                  <div className="w-full h-full relative">
                    {/* Polo Shirt Mockup */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        {poloMockupImage ? (
                          // Si hay una imagen de mockup específica, mostrarla
                          <img
                            src={poloMockupImage}
                            alt="Polo with logo"
                            className="max-w-full max-h-full object-contain"
                            style={{
                              maxHeight: '350px',
                              filter: 'drop-shadow(0 0 15px rgba(247, 205, 69, 0.4))'
                            }}
                          />
                        ) : (
                          // Si no, usar el SVG original con el logo
                          <svg width="300" height="350" viewBox="0 0 300 350" fill="none" xmlns="http://www.w3.org/2000/svg">
                            {/* Shirt body */}
                            <path d="M75 80L50 120L50 320L250 320L250 120L225 80L200 100L100 100L75 80Z" fill="#1a1a1a" stroke="#333" strokeWidth="2"/>

                            {/* Collar */}
                            <path d="M100 100L110 120L190 120L200 100" fill="none" stroke="#333" strokeWidth="2"/>

                            {/* Sleeves */}
                            <path d="M50 120L20 160L40 180L75 150" fill="#1a1a1a" stroke="#333" strokeWidth="2"/>
                            <path d="M250 120L280 160L260 180L225 150" fill="#1a1a1a" stroke="#333" strokeWidth="2"/>

                            {/* Placket */}
                            <rect x="145" y="100" width="10" height="80" fill="#333"/>

                            {/* Logo placement area */}
                            <foreignObject x="100" y="140" width="100" height="100">
                              <div className="w-full h-full flex items-center justify-center">
                                <img
                                  src={generatedImage}
                                  alt="Logo on polo"
                                  className="max-w-full max-h-full object-contain"
                                  style={{ filter: 'drop-shadow(0 0 10px rgba(247, 205, 69, 0.3))' }}
                                />
                              </div>
                            </foreignObject>
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center text-gray-500">
                <img
                  src={monkyaPintor}
                  alt="Monkya Pintor"
                  className="w-12 h-12 mx-auto mb-4 object-contain opacity-70"
                />
                <p>Tu imagen generada aparecerá aquí</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* View Mode Toggle Buttons */}
      <div className="flex justify-center mt-6">
        <div className="bg-black rounded-lg p-1 flex gap-1">
          <Button
            size="sm"
            onClick={() => setViewMode('logo')}
            className={`px-4 py-2 rounded-md transition-all ${
              viewMode === 'logo'
                ? 'bg-yellow-400 text-black'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            <Hexagon className="h-4 w-4 mr-2" />
            Logo
          </Button>
          <Button
            size="sm"
            onClick={() => {
              setViewMode('polo');
              if (onPoloModeChange && generatedImage) {
                // Cuando se cambia a modo polo, cargar la imagen del mockup
                onPoloModeChange(poloMockup);
              }
            }}
            className={`px-4 py-2 rounded-md transition-all ${
              viewMode === 'polo'
                ? 'bg-yellow-400 text-black'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            <Shirt className="h-4 w-4 mr-2" />
            Polo
          </Button>
        </div>
      </div>

      {/* Add global styles for the animation */}
      <style jsx>{`
        @keyframes rotate-vertical-center {
          0% {
            transform: rotateY(0);
          }
          100% {
            transform: rotateY(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default EditorCanvas;