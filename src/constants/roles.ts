
import { UserRole } from "../types";

export const USER_ROLES: { [key in UserRole]: string } = {
  admin: "Administrateur",
  school: "École",
  association: "Association",
  resident: "Résident",
  external: "Externe"
};

export const ROLE_DESCRIPTIONS: { [key in UserRole]: string } = {
  admin: "Gestion complète des équipements et des réservations",
  school: "Écoles et établissements éducatifs",
  association: "Associations et clubs sportifs",
  resident: "Habitants de Pétaouchnock",
  external: "Utilisateurs externes à la ville"
};
