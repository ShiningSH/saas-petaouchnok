
import { Link } from "react-router-dom";
import AuthForm from "@/components/auth/AuthForm";

const Register = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-center text-petaouchnock-blue-dark">
          Ville de Pétaouchnock
        </h1>
        <p className="text-center text-gray-600">
          Réservation d'équipements sportifs
        </p>
      </div>
      <AuthForm type="register" />
      <p className="mt-6 text-center text-gray-600">
        Vous avez déjà un compte?{" "}
        <Link to="/login" className="text-petaouchnock-blue font-medium hover:underline">
          Se connecter
        </Link>
      </p>
    </div>
  );
};

export default Register;
