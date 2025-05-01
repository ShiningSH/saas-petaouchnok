
import { Facility, TimeSlot, User, Booking } from "@/types";

export type CalendarViewType = "week" | "month";

export type BookingWithDetails = Booking & {
  facility: Facility;
  time_slot: TimeSlot;
  user: User;
};

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  facilityId: string;
  userId: string;
  status: 'reserved' | 'paid' | 'cancelled' | 'available';
  bookingId?: string;
  color?: string;
}

export interface AdminCalendarFilters {
  facilityId?: string;
  userRole?: string;
  startDate?: Date;
  endDate?: Date;
  status?: string;
}
