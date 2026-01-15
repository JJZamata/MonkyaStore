import { Button } from "@/components/ui/button";

const ProductShowcase = () => {
  const sizes = ["S", "M", "L", "XL", "XXL"];
  const colors = [
    { name: "Beige", hex: "#F5F5DC" },
    { name: "Verde Petróleo", hex: "#2F4F4F" },
    { name: "Blanco", hex: "#FFFFFF" },
    { name: "Negro", hex: "#000000" },
  ];

  return (
    <div className="relative w-full overflow-hidden bg-[#FFD400] py-12 md:py-20">
      {/* Logo */}
      <div className="absolute left-4 top-4 z-10 md:left-8 md:top-8">
        <img
          src="/src/assets/monkya-logo.png"
          alt="Monkya Logo"
          className="h-12 w-auto md:h-16"
        />
      </div>

      <div className="container mx-auto px-4">
        {/* Large "MONKYA" text background - spans both columns */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <h2 className="select-none text-[10rem] font-black leading-none text-white/20 md:text-[15rem] lg:text-[20rem]">
            MONKYA
          </h2>
        </div>

        <div className="relative grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">
          {/* Left Column - Product Images */}
          <div className="relative flex items-center justify-center">

            {/* Product Images */}
            <div className="relative z-10 h-[400px] w-full md:h-[500px]">
              {/* T-shirt - positioned behind */}
              <div className="absolute left-[10%] top-[15%] w-[45%] transition-transform hover:scale-105 md:left-[5%] md:top-[10%] md:w-[50%]">
                <img
                  src="/images/Polera.png"
                  alt="Monkya T-shirt"
                  className="h-auto w-full drop-shadow-[0_15px_40px_rgba(0,0,0,0.4)]"
                />
              </div>

              {/* Hoodie - positioned in front */}
              <div className="absolute right-[5%] top-[20%] w-[50%] transition-transform hover:scale-105 md:right-[0%] md:top-[15%] md:w-[55%]">
                <img
                  src="/images/PolosMonkya02-x.png"
                  alt="Monkya Hoodie"
                  className="h-auto w-full drop-shadow-[0_15px_40px_rgba(0,0,0,0.4)]"
                />
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="absolute bottom-0 left-1/2 z-20 flex -translate-x-1/2 gap-4">
              <div className="h-16 w-16 cursor-pointer overflow-hidden rounded-lg bg-white/80 p-2 shadow-lg transition-all hover:bg-white md:h-20 md:w-20">
                <img
                  src="/images/PolosMonkya01.png"
                  alt="T-shirt thumbnail"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="h-16 w-16 cursor-pointer overflow-hidden rounded-lg bg-white/80 p-2 shadow-lg transition-all hover:bg-white md:h-20 md:w-20">
                <img
                  src="/images/PolosMonkya02.png"
                  alt="Hoodie thumbnail"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="h-16 w-16 cursor-pointer overflow-hidden rounded-lg bg-white/80 p-2 shadow-lg transition-all hover:bg-white md:h-20 md:w-20">
                <img
                  src="/images/PolosMonkya03.png"
                  alt="Product thumbnail 3"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="h-16 w-16 cursor-pointer overflow-hidden rounded-lg bg-white/80 p-2 shadow-lg transition-all hover:bg-white md:h-20 md:w-20">
                <img
                  src="/images/PolosMonkya04.png"
                  alt="Product thumbnail 4"
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
          </div>

          {/* Right Column - Product Information */}
          <div className="flex flex-col justify-center space-y-6 text-gray-900">
            {/* Title */}
            <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              Polos & Poleras Monkya
            </h1>

            {/* Price */}
            <p className="text-3xl font-bold md:text-4xl">17999 p</p>

            {/* Description */}
            <p className="text-base leading-relaxed md:text-lg">
              Disponibles en algodón Pima y 100% algodón para una comodidad duradera y
              suavidad premium. Experimenta la mezcla perfecta de estilo y calidad con
              nuestros diseños exclusivos inspirados en la tecnología.
            </p>

            {/* Sizes */}
            <div className="space-y-3">
              <h3 className="text-xl font-semibold md:text-2xl">Tamaño</h3>
              <div className="flex flex-wrap gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-gray-900 bg-transparent font-semibold transition-all hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div className="space-y-3">
              <h3 className="text-xl font-semibold md:text-2xl">Color</h3>
              <div className="flex flex-wrap gap-4">
                {colors.map((color) => (
                  <div
                    key={color.name}
                    className="flex items-center gap-2 cursor-pointer group"
                  >
                    <div
                      className="h-10 w-10 rounded-full border-2 border-gray-900 shadow-md transition-transform group-hover:scale-110"
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                    <span className="hidden text-sm font-medium md:inline">
                      {color.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <Button
                asChild
                className="h-14 rounded-full border-2 border-black bg-transparent px-12 text-lg font-bold text-black shadow-lg transition-all hover:bg-black hover:text-white hover:shadow-xl"
              >
                <a href="#">COMPRAR AHORA</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductShowcase;
