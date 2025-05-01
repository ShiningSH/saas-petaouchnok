
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { CalendarIcon, Filter } from "lucide-react";
import { AdminCalendarFilters } from "@/types/admin";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface BookingsFilterProps {
  onFilterChange: (filters: AdminCalendarFilters) => void;
}

// Données fictives pour les équipements
const FACILITIES = [
  { id: "facility-1", name: "Tennis Municipal" },
  { id: "facility-2", name: "Gymnase Jean Moulin" },
  { id: "facility-3", name: "Piscine Olympique" }
];

// Statuts possibles des réservations
const STATUSES = [
  { value: "reserved", label: "Réservé" },
  { value: "paid", label: "En attente de paiement" },
  { value: "cancelled", label: "Annulé" },
  { value: "available", label: "Disponible" }
];

const BookingsFilter = ({ onFilterChange }: BookingsFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<AdminCalendarFilters>({
    defaultValues: {
      facilityId: undefined,
      startDate: undefined,
      endDate: undefined,
      status: undefined
    }
  });

  const handleSubmit = (data: AdminCalendarFilters) => {
    onFilterChange(data);
    setIsOpen(false);
  };

  const resetFilters = () => {
    form.reset();
    onFilterChange({});
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-9 border-petaouchnock-blue flex items-center gap-1">
          <Filter className="h-4 w-4" />
          <span>Filtres</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <h4 className="font-medium text-sm">Filtrer les réservations</h4>
            
            {/* Filtre par équipement */}
            <FormField
              control={form.control}
              name="facilityId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Équipement</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Tous les équipements" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {FACILITIES.map(facility => (
                        <SelectItem key={facility.id} value={facility.id}>
                          {facility.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            {/* Filtre par dates */}
            <div className="grid grid-cols-2 gap-2">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date début</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={`pl-3 text-left font-normal ${
                              !field.value ? "text-muted-foreground" : ""
                            }`}
                          >
                            {field.value ? (
                              format(field.value, "dd/MM/yyyy", { locale: fr })
                            ) : (
                              <span>Choisir</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date fin</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={`pl-3 text-left font-normal ${
                              !field.value ? "text-muted-foreground" : ""
                            }`}
                          >
                            {field.value ? (
                              format(field.value, "dd/MM/yyyy", { locale: fr })
                            ) : (
                              <span>Choisir</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />
            </div>

            {/* Filtre par statut */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Statut</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Tous les statuts" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {STATUSES.map(status => (
                        <SelectItem key={status.value} value={status.value}>
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <div className="flex justify-between pt-2">
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={resetFilters}
              >
                Réinitialiser
              </Button>
              <Button 
                type="submit" 
                size="sm"
                className="bg-petaouchnock-blue-dark hover:bg-petaouchnock-blue"
              >
                Appliquer
              </Button>
            </div>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
};

export default BookingsFilter;
