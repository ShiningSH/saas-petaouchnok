
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, User, LogIn, LogOut } from "lucide-react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Ceci sera remplacé par la vérification d'authentification réelle
  const isAuthenticated = false;

  return (
    <nav className="bg-petaouchnock-blue-dark text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center space-x-2">
            <Link to="/" className="flex items-center">
              <img 
                src="/lovable-uploads/aa748680-a193-4233-a46f-961ae78e353b.png" 
                alt="Pétaouchnock Sports" 
                className="h-9 w-auto mr-2"
              />
              <span className="text-xl font-display font-bold tracking-tight hidden sm:block">
                Pétaouchnock Sports
              </span>
            </Link>
          </div>

          {/* Menu principal (Desktop) */}
          <div className="hidden md:flex items-center space-x-1">
            <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-petaouchnock-blue hover:text-white transition-colors">
              Accueil
            </Link>
            <Link to="/facilities" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-petaouchnock-blue hover:text-white transition-colors">
              Équipements
            </Link>
            <Link to="/about" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-petaouchnock-blue hover:text-white transition-colors">
              À propos
            </Link>

            {isAuthenticated ? (
              <div className="ml-4 flex items-center space-x-2">
                <Link to="/dashboard">
                  <Button variant="outline" size="sm" className="bg-transparent border-white text-white hover:bg-white hover:text-petaouchnock-blue-dark">
                    <User className="mr-1 h-4 w-4" />
                    Mon compte
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                  <LogOut className="mr-1 h-4 w-4" />
                  Déconnexion
                </Button>
              </div>
            ) : (
              <div className="ml-4 flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="outline" size="sm" className="bg-transparent border-white text-white hover:bg-white hover:text-petaouchnock-blue-dark">
                    <LogIn className="mr-1 h-4 w-4" />
                    Connexion
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm" className="bg-petaouchnock-green hover:bg-petaouchnock-green-dark">
                    Inscription
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Bouton Menu Mobile */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              className="text-white hover:bg-petaouchnock-blue" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu />
            </Button>
          </div>
        </div>

        {/* Menu Mobile */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 space-y-1 animate-fade-in">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-petaouchnock-blue hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Accueil
            </Link>
            <Link 
              to="/facilities" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-petaouchnock-blue hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Équipements
            </Link>
            <Link 
              to="/about" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-petaouchnock-blue hover:text-white transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              À propos
            </Link>

            <div className="pt-4 pb-3 border-t border-petaouchnock-blue">
              {isAuthenticated ? (
                <div className="space-y-2">
                  <Link 
                    to="/dashboard" 
                    className="block w-full"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button 
                      variant="outline" 
                      className="w-full bg-transparent border-white text-white hover:bg-white hover:text-petaouchnock-blue-dark"
                    >
                      <User className="mr-1 h-4 w-4" />
                      Mon compte
                    </Button>
                  </Link>
                  <Button 
                    variant="ghost" 
                    className="w-full text-white hover:bg-white/20"
                  >
                    <LogOut className="mr-1 h-4 w-4" />
                    Déconnexion
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link 
                    to="/login" 
                    className="block w-full" 
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button 
                      variant="outline" 
                      className="w-full bg-transparent border-white text-white hover:bg-white hover:text-petaouchnock-blue-dark"
                    >
                      <LogIn className="mr-1 h-4 w-4" />
                      Connexion
                    </Button>
                  </Link>
                  <Link 
                    to="/register" 
                    className="block w-full" 
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button 
                      className="w-full bg-petaouchnock-green hover:bg-petaouchnock-green-dark"
                    >
                      Inscription
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
