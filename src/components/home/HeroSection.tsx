
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Search } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative">
      {/* Bannière avec image de fond */}
      <div className="h-[500px] md:h-[600px] bg-cover bg-center relative overflow-hidden" 
        style={{ backgroundImage: "linear-gradient(rgba(0, 51, 102, 0.5), rgba(0, 51, 102, 0.6)), url('https://images.unsplash.com/photo-1526676307800-f62d2fe8b1a7?q=80&w=2833&auto=format&fit=crop')" }}
      >
        {/* Overlay pour améliorer la lisibilité du texte */}
        <div className="absolute inset-0 bg-gradient-to-r from-petaouchnock-blue-dark/70 to-transparent"></div>
        
        {/* Contenu de la bannière */}
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-6 md:px-8">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight">
                Réservez votre créneau sportif dès maintenant
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl">
                Découvrez tous les équipements sportifs de Pétaouchnock et réservez facilement en ligne
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link to="/facilities">
                  <Button size="lg" className="bg-petaouchnock-green hover:bg-petaouchnock-green-dark text-white gap-2 rounded-lg">
                    <Search className="h-4 w-4" />
                    Voir les équipements
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="lg" variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white/10 gap-2 rounded-lg">
                    <Calendar className="h-4 w-4" />
                    Créer un compte
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Vague décorative en bas */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="w-full h-auto fill-white">
          <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,42.7C1120,32,1280,32,1360,32L1440,32L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
