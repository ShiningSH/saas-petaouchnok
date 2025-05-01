
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Clock, User, Euro } from "lucide-react";
import { Facility } from "@/hooks/use-facilities";

interface FacilityInfoProps {
  facility: Facility;
}

const FacilityInfo = ({ facility }: FacilityInfoProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-bold text-petaouchnock-blue-dark mb-4">
          Informations
        </h2>
        <div className="space-y-4">
          <div className="flex items-start">
            <MapPin className="mr-3 text-petaouchnock-blue shrink-0 mt-1" size={18} />
            <div>
              <span className="font-medium block">Adresse:</span>
              <span className="text-gray-600">{facility.location}</span>
            </div>
          </div>
          
          <div className="flex items-start">
            <Clock className="mr-3 text-petaouchnock-blue shrink-0 mt-1" size={18} />
            <div>
              <span className="font-medium block">Horaires d'ouverture:</span>
              <span className="text-gray-600">
                Lun-Ven: 8h-20h<br />
                Sam-Dim: 9h-18h
              </span>
            </div>
          </div>
          
          <div className="flex items-start">
            <User className="mr-3 text-petaouchnock-blue shrink-0 mt-1" size={18} />
            <div>
              <span className="font-medium block">Équipements disponibles:</span>
              <span className="text-gray-600">
                Vestiaires, douches, parking, accès handicapés
              </span>
            </div>
          </div>
        </div>

        <h3 className="text-lg font-bold text-petaouchnock-blue-dark mt-8 mb-3 flex items-center">
          <Euro className="mr-2 text-petaouchnock-blue" size={18} />
          Tarifs (par heure)
        </h3>
        <div className="bg-gray-50 rounded-md p-4">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="font-medium">Résident:</span>
              <span>10€</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Association:</span>
              <span>8€</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">École:</span>
              <span>5€</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Externe:</span>
              <span>15€</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FacilityInfo;
