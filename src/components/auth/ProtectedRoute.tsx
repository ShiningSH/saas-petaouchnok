import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";
import { UserRole } from "@/types";
import { useLocation } from "react-router-dom";


// Simulation d'un hook d'authentification - À remplacer par l'authentification réelle
const useAuth = () => {
  // Pour le développement, nous simulons un utilisateur admin
  return {
    isAuthenticated: true,
    user: {
      id: "admin-id",
      email: "admin@petaouchnock.fr",
      full_name: "Administrateur",
      role: "admin" as UserRole,
      created_at: new Date().toISOString(),
      city_id: "city-id"
    }
  };
};

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: UserRole;
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();  // Récupère la location actuelle

  // Si l'utilisateur n'est pas authentifié, rediriger vers la page de connexion
  if (!isAuthenticated) {
    toast.error("Vous devez être connecté pour accéder à cette page.");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Si un rôle spécifique est requis et que l'utilisateur n'a pas ce rôle
  if (requiredRole && user?.role !== requiredRole) {
    toast.error("Vous n'avez pas les autorisations nécessaires.");
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
