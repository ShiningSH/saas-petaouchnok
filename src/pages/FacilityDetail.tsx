
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { format, addDays, parse, isWithinInterval } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar } from "lucide-react";
import { useFacilities } from "@/hooks/use-facilities";
import FacilityBookingCalendar from "@/components/facility/FacilityBookingCalendar";
import FacilityNotFound from "@/components/facility/FacilityNotFound";
import FacilityInfo from "@/components/facility/FacilityInfo";

const FacilityDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, error, getFacilityById } = useFacilities();
  
  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <p className="text-lg text-gray-600">Chargement de l'équipement...</p>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  if (error) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-red-600">Erreur</h2>
          <p className="text-gray-600 mt-2">
            Une erreur est survenue lors du chargement de l'équipement.
          </p>
          <Button className="mt-6 bg-petaouchnock-blue" asChild>
            <Link to="/facilities">Voir tous les équipements</Link>
          </Button>
        </div>
      </MainLayout>
    );
  }

  const facility = id ? getFacilityById(id) : null;

  // Si l'équipement n'est pas trouvé
  if (!facility) {
    return <FacilityNotFound />;
  }

  return (
    <MainLayout>
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <h1 className="text-3xl font-bold text-petaouchnock-blue-dark">
            {facility.name}
          </h1>
          <div className="mt-2 md:mt-0 inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
            {facility.type}
          </div>
        </div>
        <p className="text-gray-600">{facility.description}</p>
      </div>

      {facility.image_url && (
        <div className="w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
          <img 
            src={facility.image_url} 
            alt={facility.name} 
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Informations sur l'équipement */}
        <div className="lg:col-span-1">
          <FacilityInfo facility={facility} />
        </div>

        {/* Réservation */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-petaouchnock-blue-dark mb-4 flex items-center">
                <Calendar className="mr-2 text-petaouchnock-blue" size={20} />
                Réserver cet équipement
              </h2>

              <FacilityBookingCalendar facilityId={facility.id} />
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default FacilityDetail;
