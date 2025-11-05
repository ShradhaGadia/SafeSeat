import { Train, User, Booking } from "@/types/booking";

export const mockTrains: Train[] = [
  {
    id: "1",
    number: "12301",
    name: "Rajdhani Express",
    from: "New Delhi",
    to: "Mumbai Central",
    departure: "16:55",
    arrival: "08:35",
    duration: "15h 40m",
    price: 2500,
    availableSeats: 48,
  },
  {
    id: "2",
    number: "12423",
    name: "Rajdhani Express",
    from: "New Delhi",
    to: "Dibrugarh",
    departure: "15:30",
    arrival: "10:05",
    duration: "42h 35m",
    price: 3200,
    availableSeats: 52,
  },
];

export const mockUsers: User[] = [
  {
    id: "1",
    name: "Priya Sharma",
    email: "priya@example.com",
    phone: "9876543210",
    gender: "female",
  },
  {
    id: "2",
    name: "Rahul Kumar",
    email: "rahul@example.com",
    phone: "9876543211",
    gender: "male",
  },
];

export const mockBookings: Booking[] = [];

// Function to generate seat layout for AC 2-Tier coach
export const generateCoachSeats = () => {
  const seats = [];
  let seatNumber = 1;

  // 8 compartments
  for (let comp = 1; comp <= 8; comp++) {
    // Each compartment has 8 seats (except last one)
    if (comp === 8) {
      // Last compartment: 2 side berths only
      seats.push({
        id: `seat-${seatNumber}`,
        number: seatNumber++,
        type: "SL" as const,
        isAvailable: true,
        isReservedForFemale: false,
        compartment: comp,
      });
      seats.push({
        id: `seat-${seatNumber}`,
        number: seatNumber++,
        type: "SU" as const,
        isAvailable: true,
        isReservedForFemale: false,
        compartment: comp,
      });
    } else {
      // Regular compartment: 2 lower, 2 middle, 2 upper, 1 side lower, 1 side upper
      for (let i = 0; i < 2; i++) {
        seats.push({
          id: `seat-${seatNumber}`,
          number: seatNumber++,
          type: "LB" as const,
          isAvailable: true,
          isReservedForFemale: false,
          compartment: comp,
        });
      }
      for (let i = 0; i < 2; i++) {
        seats.push({
          id: `seat-${seatNumber}`,
          number: seatNumber++,
          type: "MB" as const,
          isAvailable: true,
          isReservedForFemale: false,
          compartment: comp,
        });
      }
      for (let i = 0; i < 2; i++) {
        seats.push({
          id: `seat-${seatNumber}`,
          number: seatNumber++,
          type: "UB" as const,
          isAvailable: true,
          isReservedForFemale: false,
          compartment: comp,
        });
      }
      seats.push({
        id: `seat-${seatNumber}`,
        number: seatNumber++,
        type: "SL" as const,
        isAvailable: true,
        isReservedForFemale: false,
        compartment: comp,
      });
      seats.push({
        id: `seat-${seatNumber}`,
        number: seatNumber++,
        type: "SU" as const,
        isAvailable: true,
        isReservedForFemale: false,
        compartment: comp,
      });
    }
  }

  return seats;
};
