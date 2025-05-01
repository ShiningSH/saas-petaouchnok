
export type UserRole = 'admin' | 'school' | 'association' | 'resident' | 'external';

export interface User {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  phone?: string;
  city_id: string;
  created_at: string;
}

export interface City {
  id: string;
  name: string;
  slug: string;
}

export interface Facility {
  id: string;
  name: string;
  type: string;
  description: string;
  location: string;
  image_url: string;
  city_id: string;
  created_at: string;
}

export interface TimeSlot {
  id: string;
  facility_id: string;
  start_time: string;
  end_time: string;
  is_available: boolean;
}

export interface Booking {
  id: string;
  user_id: string;
  facility_id: string;
  time_slot_id: string;
  price: number;
  status: 'reserved' | 'paid' | 'cancelled';
  payment_id?: string;
  created_at: string;
}

export interface PricingRule {
  id: string;
  role: UserRole;
  facility_type: string;
  price_per_hour: number;
}
