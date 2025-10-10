import monkyaLogo from "@/assets/monkya-logo.png";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="col-span-1 md:col-span-2">
            <div className="mb-4 flex items-center gap-3">
              <img src={monkyaLogo} alt="MONKYA" className="h-12 w-12" />
              <span className="text-3xl font-bold text-primary">MONKYA</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Diseña tu estilo único. Ropa personalizada de alta calidad con diseño asistido por IA.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Enlaces</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:text-primary transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a href="/catalog" className="hover:text-primary transition-colors">
                  Catálogo
                </a>
              </li>
              <li>
                <a href="/customize" className="hover:text-primary transition-colors">
                  Personalizar
                </a>
              </li>
              <li>
                <a href="/logo-generator" className="hover:text-primary transition-colors">
                  Generador IA
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Contacto</h3>
            <ul className="space-y-2 text-sm">
              <li>info@monkya.com</li>
              <li>+34 900 123 456</li>
              <li>Barcelona, España</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 MONKYA. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
