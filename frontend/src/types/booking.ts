export type Gender = "male" | "female" | "other";

export type SeatType = "LB" | "MB" | "UB" | "SL" | "SU";

export interface Seat {
  id: string;
  number: number;
  type: SeatType;
  isAvailable: boolean;
  isReservedForFemale: boolean;
  compartment: number;
  passengerName?: string;
  passengerGender?: Gender;
}

export interface Train {
  id: string;
  number: string;
  name: string;
  from: string;
  to: string;
  departure: string;
  arrival: string;
  duration: string;
  price: number;
  availableSeats: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  gender: Gender;
}

export interface Booking {
  id: string;
  pnr: string;
  trainId: string;
  trainNumber: string;
  trainName: string;
  from: string;
  to: string;
  date: string;
  passengers: Array<{
    name: string;
    age: number;
    gender: Gender;
    seatNumber: number;
    seatType: SeatType;
  }>;
  totalAmount: number;
  bookingDate: string;
  status: "confirmed" | "cancelled" | "waiting";
}
