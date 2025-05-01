
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { CalendarIcon, Clock } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarEvent } from "@/types/admin";
import { toast } from "sonner";

// Données fictives pour les équipements
const FACILITIES = [
  { id: "facility-1", name: "Tennis Municipal" },
  { id: "facility-2", name: "Gymnase Jean Moulin" },
  { id: "facility-3", name: "Piscine Olympique" }
];

// Données fictives pour les utilisateurs
const USERS = [
  { id: "user-1", name: "École Jean Moulin", role: "school" },
  { id: "user-2", name: "Club de Basket", role: "association" },
  { id: "user-3", name: "Pierre Dupont", role: "resident" },
  { id: "user-4", name: "Association Sportive", role: "association" }
];

// Statuts possibles des réservations
const STATUSES = [
  { value: "reserved", label: "Réservé" },
  { value: "paid", label: "En attente de paiement" },
  { value: "cancelled", label: "Annulé" },
  { value: "available", label: "Disponible" }
];

// Horaires disponibles (pour la démonstration)
const AVAILABLE_HOURS = Array.from({ length: 13 }, (_, i) => i + 8).map(hour => ({
  value: hour.toString().padStart(2, "0") + ":00",
  label: `${hour}:00`
}));

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking?: CalendarEvent;
  onSave: (booking: Partial<CalendarEvent>) => void;
  onDelete?: (id: string) => void;
}

const BookingModal = ({ isOpen, onClose, booking, onSave, onDelete }: BookingModalProps) => {
  // État pour stocker les données du formulaire
  const [formData, setFormData] = useState({
    title: "",
    facilityId: "",
    userId: "",
    status: "reserved",
    date: new Date(),
    startTime: "10:00",
    duration: 1
  });

  // Mettre à jour les données du formulaire lorsque la réservation change
  useEffect(() => {
    if (booking) {
      setFormData({
        title: booking.title,
        facilityId: booking.facilityId,
        userId: booking.userId,
        status: booking.status,
        date: booking.start,
        startTime: format(booking.start, "HH:mm"),
        duration: (booking.end.getTime() - booking.start.getTime()) / (1000 * 60 * 60)
      });
    } else {
      // Réinitialiser le formulaire pour une nouvelle réservation
      setFormData({
        title: "",
        facilityId: "",
        userId: "",
        status: "reserved",
        date: new Date(),
        startTime: "10:00",
        duration: 1
      });
    }
  }, [booking]);

  // Gérer les changements dans les champs du formulaire
  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Soumettre le formulaire
  const handleSubmit = () => {
    // Créer une date de début à partir de la date et de l'heure
    const [hours, minutes] = formData.startTime.split(":").map(Number);
    const start = new Date(formData.date);
    start.setHours(hours, minutes, 0, 0);
    
    // Calculer la date de fin en ajoutant la durée
    const end = new Date(start);
    end.setHours(start.getHours() + formData.duration);
    
    const bookingData = {
      title: formData.title,
      facilityId: formData.facilityId,
      userId: formData.userId,
      status: formData.status as 'reserved' | 'paid' | 'cancelled' | 'available',
      start,
      end
    };
    
    onSave(bookingData);
    toast.success(booking ? "Réservation mise à jour" : "Réservation créée");
    onClose();
  };

  // Supprimer la réservation
  const handleDelete = () => {
    if (booking && onDelete) {
      onDelete(booking.id);
      toast.success("Réservation supprimée");
      onClose();
    }
  };

  // Trouver le nom de l'équipement et de l'utilisateur
  const facilityName = FACILITIES.find(f => f.id === formData.facilityId)?.name || "";
  const userName = USERS.find(u => u.id === formData.userId)?.name || "";

  // Titre du modal
  const modalTitle = booking ? "Modifier la réservation" : "Nouvelle réservation";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{modalTitle}</DialogTitle>
          <DialogDescription>
            {booking 
              ? "Modifiez les détails de la réservation ci-dessous."
              : "Ajoutez une nouvelle réservation au calendrier."}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          {/* Titre de la réservation */}
          <div className="grid gap-2">
            <Label htmlFor="title">Titre</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={e => handleChange("title", e.target.value)}
              placeholder="Ex: Tennis - Club de Basket"
            />
          </div>
          
          {/* Équipement */}
          <div className="grid gap-2">
            <Label htmlFor="facility">Équipement</Label>
            <Select
              value={formData.facilityId}
              onValueChange={value => handleChange("facilityId", value)}
            >
              <SelectTrigger id="facility">
                <SelectValue placeholder="Sélectionnez un équipement" />
              </SelectTrigger>
              <SelectContent>
                {FACILITIES.map(facility => (
                  <SelectItem key={facility.id} value={facility.id}>
                    {facility.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Utilisateur */}
          <div className="grid gap-2">
            <Label htmlFor="user">Utilisateur</Label>
            <Select
              value={formData.userId}
              onValueChange={value => handleChange("userId", value)}
            >
              <SelectTrigger id="user">
                <SelectValue placeholder="Sélectionnez un utilisateur" />
              </SelectTrigger>
              <SelectContent>
                {USERS.map(user => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.name} ({user.role})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Date */}
          <div className="grid gap-2">
            <Label htmlFor="date">Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                  id="date"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.date
                    ? format(formData.date, "EEEE d MMMM yyyy", { locale: fr })
                    : "Sélectionnez une date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto bg-white">
                <Calendar
                  mode="single"
                  selected={formData.date}
                  onSelect={(date) => date && handleChange("date", date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          {/* Heure et durée */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="startTime">Heure de début</Label>
              <Select
                value={formData.startTime}
                onValueChange={value => handleChange("startTime", value)}
              >
                <SelectTrigger id="startTime" className="w-full">
                  <SelectValue placeholder="Heure" />
                </SelectTrigger>
                <SelectContent>
                  {AVAILABLE_HOURS.map(hour => (
                    <SelectItem key={hour.value} value={hour.value}>
                      {hour.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="duration">Durée (heures)</Label>
              <Select
                value={String(formData.duration)}
                onValueChange={value => handleChange("duration", Number(value))}
              >
                <SelectTrigger id="duration" className="w-full">
                  <SelectValue placeholder="Durée" />
                </SelectTrigger>
                <SelectContent>
                  {[0.5, 1, 1.5, 2, 2.5, 3].map(duration => (
                    <SelectItem key={duration} value={String(duration)}>
                      {duration} h
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Statut */}
          <div className="grid gap-2">
            <Label htmlFor="status">Statut</Label>
            <Select
              value={formData.status}
              onValueChange={value => handleChange("status", value)}
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="Sélectionnez un statut" />
              </SelectTrigger>
              <SelectContent>
                {STATUSES.map(status => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <DialogFooter className="flex justify-between sm:justify-between">
          {booking && onDelete && (
            <Button variant="destructive" onClick={handleDelete} type="button">
              Supprimer
            </Button>
          )}
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose} type="button">
              Annuler
            </Button>
            <Button 
              onClick={handleSubmit} 
              type="button"
              className="bg-petaouchnock-blue-dark hover:bg-petaouchnock-blue"
            >
              {booking ? "Mettre à jour" : "Ajouter"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
