
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CheckCircle, X, MapPin, Calendar, Clock, User, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Facility, TimeSlot } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { UserRole } from "@/types";

interface BookingConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  facility: Facility;
  selectedSlot: TimeSlot | null;
}

// Simulation d'un utilisateur connecté ou non
// À remplacer par l'intégration avec votre système d'authentification
const MOCK_USER = {
  id: "user1",
  role: "resident" as UserRole,
  email: "resident@example.com",
  full_name: "Jean Dupont",
  isLoggedIn: true
};

// Simulation de tarifs selon le rôle utilisateur
const PRICING = {
  resident: 10,
  school: 5,
  association: 8,
  external: 15
};

const BookingConfirmationDialog = ({
  isOpen,
  onClose,
  facility,
  selectedSlot
}: BookingConfirmationDialogProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>(MOCK_USER.role);
  const { toast } = useToast();
  const navigate = useNavigate();

  const price = PRICING[userRole] || PRICING.external;
  
  if (!selectedSlot) {
    return null;
  }

  const handleConfirmBooking = async () => {
    setIsProcessing(true);
    
    try {
      // Ici, vous intégrerez l'appel API pour enregistrer la réservation
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simuler un délai réseau
      
      if (userRole === 'external' || userRole === 'resident') {
        // Redirection vers le paiement (à implémenter)
        // Pour l'instant, on va juste simuler un succès
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      setShowSuccess(true);
      toast({
        title: "Réservation confirmée",
        description: "Votre réservation a été enregistrée avec succès.",
      });
      
    } catch (error) {
      console.error("Erreur lors de la réservation:", error);
      toast({
        title: "Erreur de réservation",
        description: "Une erreur est survenue lors de la réservation. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    onClose();
    navigate("/facilities");
  };

  const startTime = new Date(selectedSlot.start_time);
  const endTime = new Date(selectedSlot.end_time);
  const durationHours = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);
  const totalPrice = price * durationHours;

  // Personnalisation des couleurs de tarification par rôle
  const getRoleColorClass = (role: UserRole) => {
    switch (role) {
      case 'resident':
        return 'bg-petaouchnock-blue/10 text-petaouchnock-blue';
      case 'school':
        return 'bg-petaouchnock-yellow/10 text-petaouchnock-yellow';
      case 'association':
        return 'bg-petaouchnock-green/10 text-petaouchnock-green';
      case 'external':
        return 'bg-red-100 text-red-500';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <>
      <Dialog open={isOpen && !showSuccess} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md md:max-w-lg">
          <DialogHeader className="border-b pb-4">
            <DialogTitle className="text-xl text-center font-display font-bold text-petaouchnock-blue-dark">
              Confirmation de réservation
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="bg-petaouchnock-cream p-4 rounded-lg">
              <h3 className="font-display font-semibold text-petaouchnock-blue-dark mb-3 flex items-center">
                <Calendar className="w-4 h-4 mr-2" /> 
                Récapitulatif
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start">
                  <span className="font-medium w-24">Équipement:</span>
                  <span>{facility.name}</span>
                </div>
                
                <div className="flex items-start">
                  <span className="font-medium w-24">Adresse:</span>
                  <div className="flex items-center">
                    <MapPin className="h-3 w-3 mr-1 text-petaouchnock-blue" />
                    <span>{facility.location}</span>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <span className="font-medium w-24">Date:</span>
                  <span>{format(startTime, "EEEE d MMMM yyyy", { locale: fr })}</span>
                </div>
                
                <div className="flex items-start">
                  <span className="font-medium w-24">Horaire:</span>
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1 text-petaouchnock-blue" />
                    <span>
                      {format(startTime, "HH:mm")} - {format(endTime, "HH:mm")}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <span className="font-medium w-24">Durée:</span>
                  <span>{durationHours} heure{durationHours > 1 ? 's' : ''}</span>
                </div>
              </div>
            </div>

            <div className="bg-petaouchnock-cream p-4 rounded-lg">
              <h3 className="font-display font-semibold text-petaouchnock-blue-dark mb-3 flex items-center">
                <User className="w-4 h-4 mr-2" />
                Informations utilisateur
              </h3>
              
              {MOCK_USER.isLoggedIn ? (
                <div className="space-y-3 text-sm">
                  <div className="flex items-start">
                    <span className="font-medium w-24">Nom:</span>
                    <span>{MOCK_USER.full_name}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="font-medium w-24">Type:</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${getRoleColorClass(userRole)}`}>
                      {userRole}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-2">
                  <p className="text-gray-600 mb-4">Veuillez vous connecter pour continuer</p>
                  <div className="flex gap-3 justify-center">
                    <Button variant="outline" size="sm" onClick={() => navigate("/login")}>
                      Se connecter
                    </Button>
                    <Button size="sm" className="bg-petaouchnock-green" onClick={() => navigate("/register")}>
                      S'inscrire
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-petaouchnock-cream p-4 rounded-lg">
              <h3 className="font-display font-semibold text-petaouchnock-blue-dark mb-3 flex items-center">
                <CreditCard className="w-4 h-4 mr-2" />
                Tarification
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Tarif horaire:</span>
                  <span className="font-medium">{price}€/heure</span>
                </div>
                <div className="flex justify-between font-semibold text-lg border-t border-gray-200 pt-3">
                  <span>Total:</span>
                  <span className="text-petaouchnock-blue-dark">{totalPrice}€</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {userRole === 'external' || userRole === 'resident' 
                    ? "Le paiement sera requis pour confirmer votre réservation." 
                    : "Aucun paiement immédiat requis. La facturation sera effectuée selon les modalités habituelles."}
                </p>
              </div>
            </div>
          </div>

          <DialogFooter className="flex sm:justify-between border-t pt-4">
            <Button 
              variant="outline" 
              type="button" 
              onClick={onClose} 
              disabled={isProcessing}
              className="border-gray-300"
            >
              <X className="mr-1 h-4 w-4" />
              Annuler
            </Button>
            <Button 
              type="button" 
              className="bg-petaouchnock-green hover:bg-petaouchnock-green-dark"
              disabled={isProcessing || !MOCK_USER.isLoggedIn}
              onClick={handleConfirmBooking}
            >
              <CheckCircle className="mr-1 h-4 w-4" />
              {isProcessing ? "Traitement en cours..." : "Confirmer ma réservation"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showSuccess}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <AlertDialogTitle className="text-center font-display text-xl text-petaouchnock-blue-dark">
              Votre créneau est réservé
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center space-y-2">
              <p>Votre réservation pour <span className="font-medium">{facility.name}</span> le <span className="font-medium">{format(startTime, "d MMMM yyyy", { locale: fr })}</span> de <span className="font-medium">{format(startTime, "HH:mm")}</span> à <span className="font-medium">{format(endTime, "HH:mm")}</span> a été confirmée.</p>
              <p>Un email de confirmation a été envoyé à <span className="font-medium">{MOCK_USER.email}</span>.</p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex justify-center">
            <AlertDialogAction 
              onClick={handleCloseSuccess}
              className="bg-petaouchnock-blue hover:bg-petaouchnock-blue-dark"
            >
              Retour aux équipements
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default BookingConfirmationDialog;
