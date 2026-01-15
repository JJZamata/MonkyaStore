import { Link, useLocation } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import monkyaLogo from "@/assets/monkya-logo.png";

const Navigation = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-yellow-400/20 bg-gradient-to-r from-black via-black to-gray-900">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-3">
          <img src={monkyaLogo} alt="MONKYA" className="h-10 w-10" />
          <span className="text-2xl font-bold text-yellow-400">MONKYA</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link
            to="/"
            className={`text-sm font-medium transition-colors hover:text-yellow-300 ${
              isActive("/") ? "text-yellow-400" : "text-yellow-400"
            }`}
          >
            Inicio
          </Link>
          <Link
            to="/catalog"
            className={`text-sm font-medium transition-colors hover:text-yellow-300 ${
              isActive("/catalog") ? "text-yellow-400" : "text-yellow-400"
            }`}
          >
            Catálogo
          </Link>
          <Link
            to="/customize"
            className={`text-sm font-medium transition-colors hover:text-yellow-300 ${
              isActive("/customize") ? "text-yellow-400" : "text-yellow-400"
            }`}
          >
            Personalizar
          </Link>
          <Link
            to="/logo-generator"
            className={`text-sm font-medium transition-colors hover:text-yellow-300 ${
              isActive("/logo-generator") ? "text-yellow-400" : "text-yellow-400"
            }`}
          >
            Generador IA
          </Link>

          <Button variant="ghost" size="icon" className="bg-transparent border border-yellow-400 text-yellow-400 hover:bg-yellow-400/10 hover:text-yellow-300">
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
