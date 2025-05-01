
import { useState } from 'react';
import { useAdminBookings } from '@/hooks/use-admin-bookings';
import BookingsCalendar from '@/components/admin/BookingsCalendar';
import BookingsFilter from '@/components/admin/BookingsFilter';
import BookingModal from '@/components/admin/BookingModal';
import { Button } from '@/components/ui/button';
import { CalendarViewType } from '@/types/admin';
import { CalendarDays, Plus } from 'lucide-react';

const AdminCalendar = () => {
  const [view, setView] = useState<CalendarViewType>('week');
  const {
    bookings,
    setFilters,
    addBooking,
    updateBooking,
    deleteBooking,
    selectedEvent,
    isModalOpen,
    openModal,
    closeModal
  } = useAdminBookings();

  const handleViewToggle = () => {
    setView(view === 'week' ? 'month' : 'week');
  };

  const handleDateSelect = (start: Date, end: Date) => {
    openModal();
  };

  const handleEventClick = (event: any) => {
    openModal(event);
  };

  const handleSaveBooking = (bookingData: any) => {
    if (selectedEvent) {
      updateBooking(selectedEvent.id, bookingData);
    } else {
      addBooking(bookingData);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-petaouchnock-blue-dark">Agenda des Réservations</h1>
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <BookingsFilter onFilterChange={setFilters} />
          
          <Button
            variant="outline"
            size="sm"
            className="h-9 border-petaouchnock-blue"
            onClick={handleViewToggle}
          >
            <CalendarDays className="h-4 w-4 mr-1" />
            {view === 'week' ? 'Vue mois' : 'Vue semaine'}
          </Button>
          
          <Button
            onClick={() => openModal()}
            size="sm"
            className="ml-auto sm:ml-0 h-9 bg-petaouchnock-green hover:bg-petaouchnock-green-dark"
          >
            <Plus className="h-4 w-4 mr-1" />
            Ajouter
          </Button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="mb-4">
          <div className="flex items-center text-sm">
            <span className="inline-block w-3 h-3 rounded-full bg-[#18A76B] mr-2"></span>
            <span className="mr-4">Réservé</span>
            
            <span className="inline-block w-3 h-3 rounded-full bg-[#FFBA00] mr-2"></span>
            <span className="mr-4">En attente de paiement</span>
            
            <span className="inline-block w-3 h-3 rounded-full bg-[#E94235] mr-2"></span>
            <span className="mr-4">Annulé</span>
            
            <span className="inline-block w-3 h-3 rounded-full bg-[#2B78C5] mr-2"></span>
            <span>Disponible</span>
          </div>
        </div>
        
        <div className="h-[calc(100vh-300px)]">
          <BookingsCalendar
            events={bookings}
            view={view}
            onEventClick={handleEventClick}
            onDateSelect={handleDateSelect}
          />
        </div>
      </div>

      <BookingModal
        isOpen={isModalOpen}
        onClose={closeModal}
        booking={selectedEvent || undefined}
        onSave={handleSaveBooking}
        onDelete={selectedEvent ? deleteBooking : undefined}
      />
    </div>
  );
};

export default AdminCalendar;
