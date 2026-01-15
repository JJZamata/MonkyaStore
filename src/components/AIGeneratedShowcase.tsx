import { Button } from "@/components/ui/button";

const AIGeneratedShowcase = () => {
  const products = [
    {
      id: 1,
      theme: "Circuito Cyber",
      price: "10000 p",
      image: "/images/MonkyaIA1.png",
      prompt:
        "Genera un logo estilo tech inspirado en placas de circuitos y caminos digitales en tonos cian y negro con patrones geométricos.",
      gradient: "from-cyan-500 to-blue-600",
      bgText: "CYBER",
    },
    {
      id: 2,
      theme: "Patrón Neural",
      price: "15000 p",
      image: "/images/MonkyaIA2.png",
      prompt:
        "Crea un diseño futurista inspirado en redes neuronales y algoritmos de machine learning en tonos morados y blancos con conexiones abstractas.",
      gradient: "from-purple-500 to-indigo-600",
      bgText: "NEURAL",
    },
    {
      id: 3,
      theme: "Flujo de Código",
      price: "20000 p",
      image: "/images/MonkyaIA3.png",
      prompt:
        "Diseña un logo tech moderno con fragmentos de código y flujos de datos en tonos turquesa y verde con una estética dinámica.",
      gradient: "from-teal-500 to-cyan-600",
      bgText: "CODE",
    },
  ];

  return (
    <div className="w-full bg-[#FFD400] py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
            Diseños Generados con IA
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-800">
            Cada diseño es único, creado mediante prompts de inteligencia artificial,
            llevando la tecnología de vanguardia a la moda.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${product.gradient} p-6 shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)]`}
            >
              {/* Background Text */}
              <div className="absolute right-0 top-0 overflow-hidden opacity-10">
                <h3 className="select-none text-[8rem] font-black leading-none text-white">
                  {product.bgText}
                </h3>
              </div>

              {/* Logo - Top Left */}
              <div className="relative z-10 mb-4 flex items-center justify-between">
                <img
                  src="/src/assets/monkya-logo.png"
                  alt="Monkya"
                  className="h-8 w-auto brightness-0 invert"
                />
                <span className="text-xl font-bold text-white">
                  {product.price}
                </span>
              </div>

              {/* Theme Title */}
              <h3 className="relative z-10 mb-2 text-2xl font-bold text-white md:text-3xl">
                {product.theme}
              </h3>

              {/* AI Prompt Description */}
              <p className="relative z-10 mb-6 min-h-[80px] text-sm leading-relaxed text-white/90 md:text-base">
                {product.prompt}
              </p>

              {/* Product Image - Floating/3D Effect */}
              <div className="relative z-20 my-8 flex justify-center">
                <div className="relative h-[280px] w-full md:h-[320px]">
                  <img
                    src={product.image}
                    alt={product.theme}
                    className="absolute left-1/2 top-1/2 h-auto w-[85%] -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_25px_35px_rgba(0,0,0,0.4)] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                  />
                </div>
              </div>

              {/* Customize Button */}
              <div className="relative z-10 mt-6">
                <Button
                  asChild
                  className="w-full rounded-full bg-white/20 py-6 text-lg font-bold text-white backdrop-blur-sm transition-all hover:bg-white/30 hover:shadow-lg"
                >
                  <a href="#">PERSONALIZAR</a>
                </Button>
              </div>

              {/* Decorative Corner Element */}
              <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-2xl"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="mb-6 text-xl font-semibold text-gray-900">
            ¿Quieres crear tu propio diseño generado con IA?
          </p>
          <Button
            asChild
            className="h-14 rounded-full bg-gray-900 px-10 text-lg font-bold text-white shadow-xl transition-all hover:bg-gray-800 hover:shadow-2xl"
          >
            <a href="#">EMPEZAR A DISEÑAR</a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIGeneratedShowcase;
