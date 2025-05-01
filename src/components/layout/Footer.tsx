
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-petaouchnock-cream border-t border-gray-200 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <img 
                src="/lovable-uploads/aa748680-a193-4233-a46f-961ae78e353b.png" 
                alt="Pétaouchnock Sports" 
                className="h-12 w-auto mr-2"
              />
              <h3 className="text-lg font-display font-bold text-petaouchnock-blue-dark">
                Pétaouchnock Sports
              </h3>
            </div>
            <p className="text-gray-600 mb-4">
              Système de réservation d'équipements sportifs municipaux pour la ville de Pétaouchnock.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-display font-bold text-petaouchnock-blue-dark mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/facilities" className="text-gray-600 hover:text-petaouchnock-blue transition-colors">
                  Équipements
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-petaouchnock-blue transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-petaouchnock-blue transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-display font-bold text-petaouchnock-blue-dark mb-4">Contact</h3>
            <address className="not-italic text-gray-600 space-y-2">
              <p className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-petaouchnock-blue" />
                <span>1 Place de la Mairie, 75000 Pétaouchnock</span>
              </p>
              <p className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-petaouchnock-blue" />
                <a href="mailto:contact@petaouchnock.fr" className="hover:text-petaouchnock-blue transition-colors">
                  contact@petaouchnock.fr
                </a>
              </p>
              <p className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-petaouchnock-blue" />
                <a href="tel:0123456789" className="hover:text-petaouchnock-blue transition-colors">
                  01 23 45 67 89
                </a>
              </p>
            </address>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200 text-center text-gray-600">
          <p>© {currentYear} Ville de Pétaouchnock. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
