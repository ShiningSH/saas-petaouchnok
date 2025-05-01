
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";

// Données simulées - à remplacer par des données réelles de l'API
const mockFacilities = [
  {
    id: "1",
    name: "Gymnase Municipal",
    type: "gymnase",
    description: "Espace polyvalent pour basketball, volleyball et événements sportifs.",
    location: "1 Rue des Sports",
    image_url: "https://images.unsplash.com/photo-1609513677385-5d2b049d9431?q=80&w=2090&auto=format&fit=crop",
    city_id: "1",
    created_at: "2023-01-01",
  },
  {
    id: "2",
    name: "Piscine Olympique",
    type: "piscine",
    description: "Bassin de 50m avec couloirs dédiés pour la natation sportive et de loisir.",
    location: "25 Avenue de la Natation",
    image_url: "",
    city_id: "1",
    created_at: "2023-01-01",
  },
  {
    id: "3",
    name: "Terrain de Tennis",
    type: "tennis",
    description: "Courts en terre battue et en dur, accessibles pour tous les niveaux.",
    location: "Parc des Sports",
    image_url: "",
    city_id: "1",
    created_at: "2023-01-01",
  },
  {
    id: "4",
    name: "Stade Municipal",
    type: "stade",
    description: "Stade avec piste d'athlétisme et terrain de football.",
    location: "10 Boulevard des Olympiades",
    image_url: "",
    city_id: "1",
    created_at: "2023-01-01",
  },
  {
    id: "5",
    name: "Salle d'Escalade",
    type: "escalade",
    description: "Murs d'escalade pour tous les niveaux avec équipement disponible sur place.",
    location: "5 Rue de la Montagne",
    image_url: "",
    city_id: "1",
    created_at: "2023-01-01",
  },
];

const facilityTypes = [
  { value: "all", label: "Tous les types" },
  { value: "gymnase", label: "Gymnase" },
  { value: "piscine", label: "Piscine" },
  { value: "tennis", label: "Tennis" },
  { value: "stade", label: "Stade" },
  { value: "escalade", label: "Escalade" },
];

const Facilities = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [facilityType, setFacilityType] = useState("all");

  const filteredFacilities = mockFacilities.filter((facility) => {
    const matchesSearch = facility.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          facility.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = facilityType === "all" || facility.type === facilityType;
    return matchesSearch && matchesType;
  });

  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-petaouchnock-blue-dark mb-2">Équipements sportifs</h1>
        <p className="text-gray-600">
          Découvrez et réservez les équipements sportifs disponibles à Pétaouchnock.
        </p>
      </div>

      {/* Filtres */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              className="pl-10"
              placeholder="Rechercher un équipement"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <Select value={facilityType} onValueChange={setFacilityType}>
              <SelectTrigger>
                <SelectValue placeholder="Type d'équipement" />
              </SelectTrigger>
              <SelectContent>
                {facilityTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-end">
            <Button
              variant="ghost"
              className="text-petaouchnock-blue"
              onClick={() => {
                setSearchTerm("");
                setFacilityType("all");
              }}
            >
              Réinitialiser les filtres
            </Button>
          </div>
        </div>
      </div>

      {/* Liste des équipements */}
      {filteredFacilities.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFacilities.map((facility) => (
            <div key={facility.id} className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="h-48 bg-gray-300">
                {/* Placeholder d'image - à remplacer par de vraies images */}
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-bold text-petaouchnock-blue-dark">{facility.name}</h3>
                  <span className="inline-block bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">
                    {facilityTypes.find(t => t.value === facility.type)?.label || facility.type}
                  </span>
                </div>
                <p className="text-gray-600 mt-2 mb-2">{facility.description}</p>
                <p className="text-sm text-gray-500 mb-4">
                  <span className="font-medium">Adresse:</span> {facility.location}
                </p>
                <Link to={`/facilities/${facility.id}`}>
                  <Button className="w-full bg-petaouchnock-blue">Voir les disponibilités</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">Aucun équipement ne correspond à votre recherche.</p>
          <Button 
            className="mt-4 bg-petaouchnock-blue"
            onClick={() => {
              setSearchTerm("");
              setFacilityType("all");
            }}
          >
            Afficher tous les équipements
          </Button>
        </div>
      )}
    </MainLayout>
  );
};

export default Facilities;
