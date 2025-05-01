
import { Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";

const FacilityNotFound = () => {
  return (
    <MainLayout>
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800">Équipement non trouvé</h2>
        <p className="text-gray-600 mt-2">
          L'équipement que vous recherchez n'existe pas ou a été supprimé.
        </p>
        <Button className="mt-6 bg-petaouchnock-blue" asChild>
          <Link to="/facilities">Voir tous les équipements</Link>
        </Button>
      </div>
    </MainLayout>
  );
};

export default FacilityNotFound;
