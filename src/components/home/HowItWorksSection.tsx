
import { CheckCircle, Calendar, CreditCard } from "lucide-react";

const HowItWorksSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-display font-bold text-center mb-4 text-petaouchnock-blue-dark">
          Comment ça fonctionne
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Réserver un équipement sportif à Pétaouchnock n'a jamais été aussi simple
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-md text-center border-t-4 border-petaouchnock-yellow hover-scale card-shadow">
            <div className="w-16 h-16 bg-petaouchnock-yellow/20 rounded-full flex items-center justify-center mx-auto mb-5 text-petaouchnock-yellow">
              <CheckCircle size={32} />
            </div>
            <h3 className="text-xl font-display font-semibold mb-3 text-petaouchnock-blue-dark">Créez votre compte</h3>
            <p className="text-gray-600">
              Inscrivez-vous en quelques clics et précisez votre profil pour bénéficier du tarif adapté à votre statut.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-md text-center border-t-4 border-petaouchnock-blue hover-scale card-shadow">
            <div className="w-16 h-16 bg-petaouchnock-blue/20 rounded-full flex items-center justify-center mx-auto mb-5 text-petaouchnock-blue">
              <Calendar size={32} />
            </div>
            <h3 className="text-xl font-display font-semibold mb-3 text-petaouchnock-blue-dark">Choisissez un créneau</h3>
            <p className="text-gray-600">
              Parcourez la liste des équipements disponibles, sélectionnez une date et un horaire qui vous conviennent.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-md text-center border-t-4 border-petaouchnock-green hover-scale card-shadow">
            <div className="w-16 h-16 bg-petaouchnock-green/20 rounded-full flex items-center justify-center mx-auto mb-5 text-petaouchnock-green">
              <CreditCard size={32} />
            </div>
            <h3 className="text-xl font-display font-semibold mb-3 text-petaouchnock-blue-dark">Réservez et payez</h3>
            <p className="text-gray-600">
              Confirmez votre réservation et effectuez le paiement en ligne en toute sécurité via notre plateforme.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
