import { useRef, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import frLocale from "@fullcalendar/core/locales/fr";
import { CalendarEvent, CalendarViewType } from '@/types/admin';

interface BookingsCalendarProps {
  events: CalendarEvent[];
  view: CalendarViewType;
  onEventClick: (event: CalendarEvent) => void;
  onDateSelect: (start: Date, end: Date) => void;
}

const BookingsCalendar = ({ events, view, onEventClick, onDateSelect }: BookingsCalendarProps) => {
  const calendarRef = useRef<FullCalendar | null>(null);

  // Conversion des événements au format FullCalendar
  const formattedEvents = events.map(event => ({
    id: event.id,
    title: event.title,
    start: event.start,
    end: event.end,
    backgroundColor: event.color,
    borderColor: event.color,
    extendedProps: {
      facilityId: event.facilityId,
      userId: event.userId,
      status: event.status,
      bookingId: event.bookingId
    },
  }));

  // Mettre à jour la vue lorsqu'elle change
  useEffect(() => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      if (view === 'week') {
        calendarApi.changeView('timeGridWeek');
      } else if (view === 'month') {
        calendarApi.changeView('dayGridMonth');
      }
    }
  }, [view]);

  const handleEventClick = (info: any) => {
    const { id, title, start, end, extendedProps } = info.event;
    const { facilityId, userId, status, bookingId } = extendedProps;
    
    onEventClick({
      id,
      title,
      start,
      end,
      facilityId,
      userId,
      status,
      bookingId,
    });
  };

  const handleDateSelect = (info: any) => {
    onDateSelect(info.start, info.end);
  };

  return (
    <div className="h-full bg-white rounded-lg shadow-sm p-1 md:p-4">
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={view === 'week' ? 'timeGridWeek' : 'dayGridMonth'}
        headerToolbar={{
          left: 'title',
          center: '',
          right: 'prev,next'
        }}
        locale={frLocale}
        events={formattedEvents}
        eventClick={handleEventClick}
        selectable={true}
        select={handleDateSelect}
        selectMirror={true}
        dayMaxEvents={true}
        allDaySlot={false}
        nowIndicator={true}
        slotMinTime="08:00:00"
        slotMaxTime="22:00:00"
        height="auto"
        expandRows={true}
        stickyHeaderDates={true}
        eventTimeFormat={{
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }}
        slotLabelFormat={{
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }}
        businessHours={{
          daysOfWeek: [1, 2, 3, 4, 5, 6],
          startTime: '08:00',
          endTime: '20:00',
        }}
      />
    </div>
  );
};

export default BookingsCalendar;
