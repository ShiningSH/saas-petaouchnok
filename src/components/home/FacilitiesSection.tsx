
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// Types pour les équipements
interface Facility {
  id: string;
  name: string;
  type: string;
  description: string;
  imageUrl?: string;
}

// Données mockées pour les équipements (à remplacer par des données de l'API)
const mockFacilities: Facility[] = [
  {
    id: "1",
    name: "Gymnase Municipal",
    type: "gymnase",
    description: "Espace polyvalent pour basketball, volleyball et événements sportifs.",
    imageUrl: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2090&auto=format&fit=crop"
  },
  {
    id: "2",
    name: "Piscine Olympique",
    type: "piscine",
    description: "Bassin de 50m avec couloirs dédiés pour la natation sportive et de loisir.",
    imageUrl: "https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?q=80&w=2069&auto=format&fit=crop"
  },
  {
    id: "3",
    name: "Courts de Tennis",
    type: "tennis",
    description: "Terrains en terre battue et en dur, accessibles pour tous les niveaux.",
    imageUrl: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c1?q=80&w=1974&auto=format&fit=crop"
  },
  {
    id: "4",
    name: "Salle de Fitness",
    type: "fitness",
    description: "Équipements modernes de musculation et de cardio-training.",
    imageUrl: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "5",
    name: "Stade d'Athlétisme",
    type: "stade",
    description: "Piste d'athlétisme et terrain multisport pour les entraînements et compétitions.",
    imageUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "6",
    name: "Terrain de Football",
    type: "football",
    description: "Terrain gazonné pour matchs et entraînements de football.",
    imageUrl: "https://images.unsplash.com/photo-1459865264687-595d652de67e?q=80&w=2070&auto=format&fit=crop"
  }
];

const FacilitiesSection = () => {
  const [facilities, setFacilities] = useState<Facility[]>([]);

  // Simuler le chargement des données depuis l'API
  useEffect(() => {
    // Dans une vraie application, cela serait remplacé par un appel API
    setFacilities(mockFacilities);
  }, []);

  // Icônes par type d'équipement
  const getTypeStyle = (type: string) => {
    const styles = {
      gymnase: "bg-petaouchnock-blue/10 text-petaouchnock-blue",
      piscine: "bg-blue-100 text-blue-600",
      tennis: "bg-green-100 text-green-600",
      fitness: "bg-red-100 text-red-600",
      stade: "bg-yellow-100 text-yellow-700",
      football: "bg-petaouchnock-green/10 text-petaouchnock-green"
    };
    
    return styles[type as keyof typeof styles] || "bg-gray-100 text-gray-700";
  };

  return (
    <section className="py-16 bg-petaouchnock-gray">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-display font-bold text-center mb-3 text-petaouchnock-blue-dark">
          Nos équipements sportifs
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Découvrez tous les équipements sportifs disponibles à la réservation dans la ville de Pétaouchnock.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((facility) => (
            <div 
              key={facility.id} 
              className="bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group"
            >
              <div className="h-48 bg-gray-300 overflow-hidden">
                {facility.imageUrl ? (
                  <img 
                    src={facility.imageUrl} 
                    alt={facility.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                    <span className="text-gray-500">Image non disponible</span>
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-display font-semibold text-petaouchnock-blue-dark">
                    {facility.name}
                  </h3>
                  <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${getTypeStyle(facility.type)}`}>
                    {facility.type}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-5 line-clamp-2">
                  {facility.description}
                </p>
                
                <div className="flex justify-end">
                  <Link to={`/facilities/${facility.id}`}>
                    <Button className="bg-petaouchnock-blue hover:bg-petaouchnock-blue-dark text-white gap-2">
                      Réserver
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/facilities">
            <Button size="lg" variant="outline" className="border-petaouchnock-blue-dark text-petaouchnock-blue-dark hover:bg-petaouchnock-blue-dark hover:text-white">
              Voir tous les équipements
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FacilitiesSection;
