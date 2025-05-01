
import { useState, useEffect } from "react";

// Types
export interface Facility {
  id: string;
  name: string;
  type: string;
  description: string;
  location: string;
  image_url?: string;
  city_id: string;
  created_at: string;
}

// Données mockées en attendant l'intégration de Supabase
const mockFacilities: Facility[] = [
  {
    id: "1",
    name: "Gymnase Municipal",
    type: "gymnase",
    description: "Espace polyvalent pour basketball, volleyball et événements sportifs.",
    location: "1 Rue des Sports",
    image_url: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2090&auto=format&fit=crop",
    city_id: "1",
    created_at: "2023-01-01",
  },
  {
    id: "2",
    name: "Piscine Olympique",
    type: "piscine",
    description: "Bassin de 50m avec couloirs dédiés pour la natation sportive et de loisir.",
    location: "15 Avenue Neptune",
    image_url: "https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?q=80&w=2069&auto=format&fit=crop",
    city_id: "1",
    created_at: "2023-01-02",
  },
  {
    id: "3",
    name: "Courts de Tennis",
    type: "tennis",
    description: "Terrains en terre battue et en dur, accessibles pour tous les niveaux.",
    location: "7 Rue Roland Garros",
    image_url: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c1?q=80&w=1974&auto=format&fit=crop",
    city_id: "1",
    created_at: "2023-01-03",
  },
  {
    id: "4",
    name: "Salle de Fitness",
    type: "fitness",
    description: "Équipements modernes de musculation et de cardio-training.",
    location: "22 Rue du Sport",
    image_url: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2070&auto=format&fit=crop",
    city_id: "1",
    created_at: "2023-01-04",
  },
  {
    id: "5",
    name: "Stade d'Athlétisme",
    type: "stade",
    description: "Piste d'athlétisme et terrain multisport pour les entraînements et compétitions.",
    location: "10 Avenue Olympique",
    image_url: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=2070&auto=format&fit=crop",
    city_id: "1",
    created_at: "2023-01-05",
  },
  {
    id: "6",
    name: "Terrain de Football",
    type: "football",
    description: "Terrain gazonné pour matchs et entraînements de football.",
    location: "5 Rue du Stade",
    image_url: "https://images.unsplash.com/photo-1459865264687-595d652de67e?q=80&w=2070&auto=format&fit=crop",
    city_id: "1",
    created_at: "2023-01-06",
  },
];

export function useFacilities() {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        setLoading(true);
        // Simuler un délai pour le chargement
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Ici, nous utilisons les données mockées
        // Plus tard, nous remplacerons cela par un appel à l'API Supabase
        setFacilities(mockFacilities);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Une erreur est survenue'));
        console.error('Erreur lors du chargement des équipements:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFacilities();
  }, []);

  const getFacilityById = (id: string) => {
    return facilities.find(facility => facility.id === id) || null;
  };

  return {
    facilities,
    loading,
    error,
    getFacilityById
  };
}
