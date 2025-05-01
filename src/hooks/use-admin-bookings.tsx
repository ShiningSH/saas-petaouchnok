
import { useState } from "react";
import { CalendarEvent, AdminCalendarFilters } from "@/types/admin";
import { format, addHours, setHours, setMinutes } from "date-fns";

// Fonction utilitaire pour créer un événement du calendrier
const createEvent = (
  id: string,
  title: string,
  start: Date,
  durationHours: number,
  facilityId: string,
  userId: string,
  status: 'reserved' | 'paid' | 'cancelled' | 'available',
  bookingId?: string
): CalendarEvent => {
  const end = addHours(start, durationHours);
  
  // Couleurs selon le statut
  let color;
  switch (status) {
    case 'reserved':
      color = '#18A76B'; // Vert (réservé)
      break;
    case 'paid':
      color = '#FFBA00'; // Jaune (en attente de paiement)
      break;
    case 'cancelled':
      color = '#E94235'; // Rouge (annulé)
      break;
    case 'available':
      color = '#2B78C5'; // Bleu (disponible)
      break;
    default:
      color = '#8E9196'; // Gris par défaut
  }
  
  return { id, title, start, end, facilityId, userId, status, bookingId, color };
};

// Données de test pour le développement
const generateMockBookings = (): CalendarEvent[] => {
  const today = new Date();
  const setTime = (date: Date, hours: number, minutes = 0) => {
    const newDate = new Date(date);
    return setMinutes(setHours(newDate, hours), minutes);
  };
  
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const nextWeek = new Date(today);
  nextWeek.setDate(nextWeek.getDate() + 7);
  
  return [
    createEvent(
      '1',
      'Tennis - École Jean Moulin',
      setTime(yesterday, 10),
      2,
      'facility-1',
      'user-1',
      'reserved',
      'booking-1'
    ),
    createEvent(
      '2',
      'Gymnase - Club de Basket',
      setTime(today, 14),
      1.5,
      'facility-2',
      'user-2',
      'paid',
      'booking-2'
    ),
    createEvent(
      '3',
      'Piscine - Cours privé',
      setTime(tomorrow, 9),
      1,
      'facility-3',
      'user-3',
      'cancelled',
      'booking-3'
    ),
    createEvent(
      '4',
      'Tennis - Créneau libre',
      setTime(nextWeek, 16),
      1,
      'facility-1',
      '',
      'available'
    ),
    createEvent(
      '5',
      'Gymnase - Association sportive',
      setTime(tomorrow, 18),
      2,
      'facility-2',
      'user-4',
      'reserved',
      'booking-4'
    ),
  ];
};

export function useAdminBookings() {
  const [bookings, setBookings] = useState<CalendarEvent[]>(generateMockBookings());
  const [filters, setFilters] = useState<AdminCalendarFilters>({});
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Filtrer les réservations selon les critères
  const filteredBookings = bookings.filter(booking => {
    // Filtre par équipement
    if (filters.facilityId && booking.facilityId !== filters.facilityId) {
      return false;
    }
    
    // Filtre par date
    if (filters.startDate && booking.start < filters.startDate) {
      return false;
    }
    
    if (filters.endDate && booking.end > filters.endDate) {
      return false;
    }
    
    // Filtre par statut
    if (filters.status && booking.status !== filters.status) {
      return false;
    }
    
    // Pas encore implémenté: filtre par rôle d'utilisateur (nécessiterait plus de détails)
    
    return true;
  });
  
  // Ajout d'une nouvelle réservation
  const addBooking = (newBooking: Omit<CalendarEvent, 'id'>) => {
    const id = `booking-${bookings.length + 1}`;
    const booking = { ...newBooking, id };
    setBookings([...bookings, booking]);
    return booking;
  };
  
  // Mise à jour d'une réservation existante
  const updateBooking = (id: string, updatedBooking: Partial<CalendarEvent>) => {
    setBookings(bookings.map(booking => 
      booking.id === id ? { ...booking, ...updatedBooking } : booking
    ));
  };
  
  // Suppression d'une réservation
  const deleteBooking = (id: string) => {
    setBookings(bookings.filter(booking => booking.id !== id));
  };
  
  // Gestion de l'ouverture du modal
  const openModal = (event?: CalendarEvent) => {
    if (event) {
      setSelectedEvent(event);
    } else {
      setSelectedEvent(null);
    }
    setIsModalOpen(true);
  };
  
  // Fermeture du modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };
  
  return {
    bookings: filteredBookings,
    filters,
    setFilters,
    addBooking,
    updateBooking,
    deleteBooking,
    selectedEvent,
    isModalOpen,
    openModal,
    closeModal
  };
}
