import { Link, useLocation } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import monkyaLogo from "@/assets/monkya-logo.png";

const Navigation = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-3">
          <img src={monkyaLogo} alt="MONKYA" className="h-10 w-10" />
          <span className="text-2xl font-bold text-secondary">MONKYA</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link
            to="/"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/") ? "text-primary" : "text-foreground"
            }`}
          >
            Inicio
          </Link>
          <Link
            to="/catalog"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/catalog") ? "text-primary" : "text-foreground"
            }`}
          >
            Catálogo
          </Link>
          <Link
            to="/customize"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/customize") ? "text-primary" : "text-foreground"
            }`}
          >
            Personalizar
          </Link>
          <Link
            to="/logo-generator"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive("/logo-generator") ? "text-primary" : "text-foreground"
            }`}
          >
            Generador IA
          </Link>

          <Button variant="outline" size="icon">
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
