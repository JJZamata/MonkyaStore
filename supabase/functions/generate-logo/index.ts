import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, style, colors } = await req.json();
    
    if (!prompt || !prompt.trim()) {
      return new Response(
        JSON.stringify({ error: 'El prompt es requerido' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
    if (!GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY no está configurada');
      return new Response(
        JSON.stringify({ error: 'API key no configurada' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Construir un prompt mejorado basado en el estilo y colores
    const styleDescriptions: Record<string, string> = {
      minimalist: 'minimalista, líneas limpias y simples',
      geometric: 'geométrico, formas geométricas modernas',
      vintage: 'vintage, estilo retro clásico',
      modern: 'moderno, tendencias actuales',
      playful: 'divertido, colorido y expresivo',
      elegant: 'elegante, sofisticado y refinado'
    };

    const styleDesc = styleDescriptions[style] || 'moderno';
    const colorDesc = colors && colors.length > 0 
      ? `usando los colores ${colors.join(', ')}` 
      : '';

    const enhancedPrompt = `Genera un logo profesional para estampar en ropa. ${prompt}. Estilo: ${styleDesc} ${colorDesc}. El logo debe ser vectorial, de alta calidad, sin fondo, ideal para impresión en prendas.`;

    console.log('Generando logo con prompt:', enhancedPrompt);

    // Llamar a la API de Gemini para generar imagen
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: enhancedPrompt
            }]
          }],
          generationConfig: {
            temperature: 0.9,
            maxOutputTokens: 2048,
          }
        })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error de Gemini API:', response.status, errorText);
      return new Response(
        JSON.stringify({ 
          error: 'Error al generar el logo',
          details: errorText 
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const data = await response.json();
    console.log('Respuesta de Gemini recibida');

    // Extraer el texto generado (descripción del logo)
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!generatedText) {
      return new Response(
        JSON.stringify({ 
          error: 'No se pudo generar el logo',
          data 
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        description: generatedText,
        prompt: enhancedPrompt,
        style,
        colors
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error en generate-logo:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Error desconocido' 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
