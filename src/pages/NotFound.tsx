
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const NotFound = () => {
  const location = window.location.pathname;

  useEffect(() => {
    console.error(
      "404 Erreur: L'utilisateur a tenté d'accéder à une route inexistante:",
      location
    );
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="text-center max-w-md">
        <h1 className="text-5xl font-bold text-petaouchnock-blue-dark mb-4">404</h1>
        <p className="text-2xl font-bold text-gray-800 mb-2">Page introuvable</p>
        <p className="text-gray-600 mb-8">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/">
            <Button className="bg-petaouchnock-blue w-full">
              Retour à l'accueil
            </Button>
          </Link>
          <Link to="/facilities">
            <Button variant="outline" className="border-petaouchnock-blue text-petaouchnock-blue w-full">
              Voir les équipements
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
