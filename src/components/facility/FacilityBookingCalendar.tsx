import { useState } from "react";
import { format, addDays } from "date-fns";
import { fr } from "date-fns/locale";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Clock, CheckCircle } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import BookingConfirmationDialog from "@/components/booking/BookingConfirmationDialog";
import { TimeSlot } from "@/types";

// Créneaux horaires simulés
const generateTimeSlots = () => {
  const slots = [];
  const today = new Date();

  for (let i = 0; i < 14; i++) {
    const currentDate = addDays(today, i);
    const daySlots = [];

    for (let hour = 8; hour < 20; hour++) {
      const startTime = new Date(currentDate);
      startTime.setHours(hour, 0, 0);

      const endTime = new Date(currentDate);
      endTime.setHours(hour + 1, 0, 0);

      const isAvailable = Math.random() > 0.3;

      daySlots.push({
        id: `slot-${i}-${hour}`,
        facility_id: "1",
        start_time: startTime.toISOString(),
        end_time: endTime.toISOString(),
        is_available: isAvailable,
      });
    }

    slots.push({
      date: currentDate,
      slots: daySlots,
    });
  }

  return slots;
};

const timeSlots = generateTimeSlots();

interface FacilityBookingCalendarProps {
  facilityId: string;
}

const FacilityBookingCalendar = ({ facilityId }: FacilityBookingCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const facility = {
    id: facilityId,
    name: "Gymnase Municipal",
    type: "Gymnase",
    description: "Un gymnase moderne avec tout l'équipement nécessaire",
    location: "123 Rue des Sports, Pétaouchnock",
    image_url: "/placeholder.svg",
    city_id: "1",
    created_at: new Date().toISOString()
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      setSelectedSlot(null);
    }
  };

  const handleSlotSelect = (slotId: string) => {
    setSelectedSlot(slotId);
  };

  const handleBooking = () => {
    setIsConfirmationOpen(true);
  };

  const handleCloseConfirmation = () => {
    setIsConfirmationOpen(false);
  };

  const slotsForSelectedDate = selectedDate
    ? timeSlots.find(
        (day) => format(day.date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")
      )?.slots || []
    : [];

  const selectedTimeSlot = slotsForSelectedDate.find(slot => slot.id === selectedSlot) || null;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 bg-petaouchnock-blue-dark text-white">
              <h3 className="text-lg font-display font-semibold flex items-center">
                <CalendarIcon className="mr-2" />
                Sélectionnez une date
              </h3>
            </div>

            <div className="p-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal border-gray-300"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 text-petaouchnock-blue" />
                    {selectedDate ? (
                      format(selectedDate, "EEEE d MMMM yyyy", { locale: fr })
                    ) : (
                      <span>Choisir une date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto bg-white" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleDateSelect}
                    fromDate={new Date()}
                    toDate={addDays(new Date(), 30)}
                    initialFocus
                    locale={fr}
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 bg-petaouchnock-blue-dark text-white">
          <h3 className="text-lg font-display font-semibold flex items-center">
            <Clock className="mr-2" />
            Créneaux disponibles
          </h3>
        </div>

        <div className="p-6">
          {slotsForSelectedDate.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {slotsForSelectedDate.map((slot) => (
                <div
                  key={slot.id}
                  className={`p-3 border rounded-md text-center cursor-pointer transition-all ${
                    slot.is_available
                      ? selectedSlot === slot.id
                        ? "border-2 border-petaouchnock-green bg-petaouchnock-green text-white shadow-md"
                        : "border border-petaouchnock-green bg-petaouchnock-green-light hover:bg-petaouchnock-green"
                      : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  }`}
                  onClick={() => {
                    if (slot.is_available) {
                      handleSlotSelect(slot.id);
                    }
                  }}
                >
                  <div className="font-medium">
                    {format(new Date(slot.start_time), "HH:mm")} - {format(new Date(slot.end_time), "HH:mm")}
                  </div>
                  <div className="text-xs mt-1 flex items-center justify-center">
                    {slot.is_available ? (
                      <span className="flex items-center text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Disponible
                      </span>
                    ) : (
                      <span>Réservé</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center py-8">
              Aucun créneau disponible pour cette date.
            </p>
          )}
        </div>
      </div>

      <div className="mt-8">
        <Button
          className="w-full bg-petaouchnock-green hover:bg-petaouchnock-green-dark text-white font-medium"
          disabled={!selectedSlot}
          onClick={handleBooking}
          size="lg"
        >
          {selectedSlot ? "Réserver ce créneau" : "Sélectionnez un créneau pour réserver"}
        </Button>
        {!selectedSlot && (
          <p className="text-sm text-gray-600 text-center mt-2">
            Veuillez sélectionner un créneau disponible pour continuer.
          </p>
        )}
      </div>

      <BookingConfirmationDialog
        isOpen={isConfirmationOpen}
        onClose={handleCloseConfirmation}
        facility={facility}
        selectedSlot={selectedTimeSlot}
      />
    </div>
  );
};

export default FacilityBookingCalendar;
