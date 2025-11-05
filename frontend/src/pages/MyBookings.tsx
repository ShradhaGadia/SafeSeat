import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockBookings } from "@/data/mockData";
import { Ticket } from "lucide-react";

const MyBookings = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("currentUser") || "{}");

  if (!user.id) {
    navigate("/auth");
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Bookings</h1>

        {mockBookings.length === 0 ? (
          <Card className="p-12 text-center">
            <Ticket className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-semibold mb-2">No Bookings Yet</h2>
            <p className="text-muted-foreground mb-6">
              Start your journey by booking your first train ticket
            </p>
            <Button onClick={() => navigate("/")}>Book Now</Button>
          </Card>
        ) : (
          <div className="space-y-4">
            {mockBookings.map((booking) => (
              <Card key={booking.id} className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-primary text-primary-foreground px-3 py-1 rounded text-sm font-semibold">
                        PNR: {booking.pnr}
                      </span>
                      <span
                        className={`px-3 py-1 rounded text-sm font-semibold ${
                          booking.status === "confirmed"
                            ? "bg-success text-success-foreground"
                            : "bg-destructive text-destructive-foreground"
                        }`}
                      >
                        {booking.status.toUpperCase()}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-1">
                      {booking.trainName} ({booking.trainNumber})
                    </h3>
                    <p className="text-muted-foreground mb-2">
                      {booking.from} → {booking.to}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Date: </span>
                        <span className="font-semibold">{booking.date}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Seats: </span>
                        <span className="font-semibold">
                          {booking.passengers.map((p) => p.seatNumber).join(", ")}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Passengers: </span>
                        <span className="font-semibold">{booking.passengers.length}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold mb-2">₹{booking.totalAmount}</p>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
