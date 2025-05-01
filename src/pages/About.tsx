
import MainLayout from "@/components/layout/MainLayout";

const About = () => {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-petaouchnock-blue-dark mb-6">
          À propos du système de réservation
        </h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700">
            Bienvenue sur la plateforme de réservation d'équipements sportifs de la ville de Pétaouchnock. 
            Notre système permet aux résidents, associations, écoles et visiteurs de réserver facilement 
            des créneaux horaires pour accéder aux installations sportives de la ville.
          </p>
          
          <h2 className="text-2xl font-bold text-petaouchnock-blue-dark mt-8 mb-4">
            Notre mission
          </h2>
          <p className="text-gray-700">
            La ville de Pétaouchnock s'engage à promouvoir l'activité physique et le bien-être de ses citoyens 
            en facilitant l'accès aux infrastructures sportives. Notre plateforme de réservation en ligne 
            vise à simplifier ce processus et à optimiser l'utilisation des équipements municipaux.
          </p>
          
          <h2 className="text-2xl font-bold text-petaouchnock-blue-dark mt-8 mb-4">
            Comment ça marche
          </h2>
          <ol className="list-decimal pl-6 space-y-2 text-gray-700">
            <li>
              <strong>Créez un compte</strong> - Inscrivez-vous en tant que résident, école, association ou utilisateur externe.
            </li>
            <li>
              <strong>Parcourez les équipements</strong> - Consultez la liste des installations disponibles dans la ville.
            </li>
            <li>
              <strong>Vérifiez les disponibilités</strong> - Consultez le calendrier pour voir les créneaux libres.
            </li>
            <li>
              <strong>Réservez et payez</strong> - Sélectionnez votre créneau et procédez au paiement sécurisé en ligne.
            </li>
            <li>
              <strong>Recevez votre confirmation</strong> - Votre réservation est confirmée par email avec tous les détails.
            </li>
          </ol>
          
          <h2 className="text-2xl font-bold text-petaouchnock-blue-dark mt-8 mb-4">
            Tarifs adaptés
          </h2>
          <p className="text-gray-700">
            Les tarifs varient selon votre statut et le type d'équipement. Les résidents de Pétaouchnock, 
            les associations locales et les écoles bénéficient de tarifs préférentiels par rapport aux 
            utilisateurs externes.
          </p>
          
          <h2 className="text-2xl font-bold text-petaouchnock-blue-dark mt-8 mb-4">
            Politique d'annulation
          </h2>
          <p className="text-gray-700">
            Les réservations peuvent être annulées jusqu'à 24 heures avant le créneau réservé pour un 
            remboursement complet. Les annulations effectuées moins de 24 heures à l'avance ne sont 
            pas remboursables.
          </p>
          
          <h2 className="text-2xl font-bold text-petaouchnock-blue-dark mt-8 mb-4">
            Nous contacter
          </h2>
          <p className="text-gray-700">
            Si vous avez des questions ou besoin d'assistance, n'hésitez pas à nous contacter :
          </p>
          <ul className="list-disc pl-6 space-y-1 text-gray-700">
            <li>Email : sports@petaouchnock.fr</li>
            <li>Téléphone : 01 23 45 67 89</li>
            <li>Adresse : Service des Sports, Mairie de Pétaouchnock, 1 Place de la Mairie, 75000 Pétaouchnock</li>
          </ul>
        </div>
      </div>
    </MainLayout>
  );
};

export default About;
