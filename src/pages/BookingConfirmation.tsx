import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { mockBookings } from "@/data/mockData";
import { Booking } from "@/types/booking";

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { train, selectedSeats, from, to, date, user } = location.state || {};

  const generatePNR = () => {
    return Math.floor(1000000000 + Math.random() * 9000000000).toString();
  };

  useEffect(() => {
    if (!train || !selectedSeats || !user) {
      navigate("/");
      return;
    }

    // Create booking
    const pnr = generatePNR();
    const booking: Booking = {
      id: String(mockBookings.length + 1),
      pnr,
      trainId: train.id,
      trainNumber: train.number,
      trainName: train.name,
      from,
      to,
      date,
      passengers: selectedSeats.map((seat: any) => ({
        name: user.name,
        age: 30,
        gender: user.gender,
        seatNumber: seat.number,
        seatType: seat.type,
      })),
      totalAmount: train.price * selectedSeats.length,
      bookingDate: new Date().toISOString(),
      status: "confirmed",
    };

    mockBookings.push(booking);
    localStorage.setItem("latestBooking", JSON.stringify(booking));
  }, []);

  const booking = JSON.parse(localStorage.getItem("latestBooking") || "{}");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="p-8">
            <div className="text-center mb-8">
              <div className="bg-success rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-success-foreground" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
              <p className="text-muted-foreground">
                Your ticket has been booked successfully
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between py-3 border-b">
                <span className="text-muted-foreground">PNR Number</span>
                <span className="font-bold text-lg">{booking.pnr}</span>
              </div>
              <div className="flex justify-between py-3 border-b">
                <span className="text-muted-foreground">Train</span>
                <span className="font-semibold">
                  {booking.trainName} ({booking.trainNumber})
                </span>
              </div>
              <div className="flex justify-between py-3 border-b">
                <span className="text-muted-foreground">Journey</span>
                <span className="font-semibold">
                  {booking.from} → {booking.to}
                </span>
              </div>
              <div className="flex justify-between py-3 border-b">
                <span className="text-muted-foreground">Date</span>
                <span className="font-semibold">{booking.date}</span>
              </div>
              <div className="flex justify-between py-3 border-b">
                <span className="text-muted-foreground">Seats</span>
                <span className="font-semibold">
                  {booking.passengers?.map((p: any) => p.seatNumber).join(", ")}
                </span>
              </div>
              <div className="flex justify-between py-3 border-b">
                <span className="text-muted-foreground">Passenger Name</span>
                <span className="font-semibold">{user?.name}</span>
              </div>
              <div className="flex justify-between py-3 border-b">
                <span className="text-muted-foreground">Total Amount</span>
                <span className="font-bold text-xl">₹{booking.totalAmount}</span>
              </div>
              <div className="flex justify-between py-3">
                <span className="text-muted-foreground">Status</span>
                <span className="font-semibold text-success">Confirmed</span>
              </div>
            </div>

            <div className="flex gap-4">
              <Button onClick={() => navigate("/bookings")} className="flex-1">
                View My Bookings
              </Button>
              <Button onClick={() => navigate("/")} variant="outline" className="flex-1">
                Book Another Ticket
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
