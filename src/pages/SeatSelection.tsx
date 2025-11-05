import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { generateCoachSeats, mockTrains } from "@/data/mockData";
import { Seat, Gender } from "@/types/booking";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { CheckCircle2, UserCircle2, Shield, Info } from "lucide-react";

const SeatSelection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { trainId, from, to, date } = location.state || {};
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [user, setUser] = useState<any>(null);

  const train = mockTrains.find((t) => t.id === trainId);

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    }
    setSeats(generateCoachSeats());
  }, []);

  const getAdjacentSeats = (seatNumber: number, seatType: string): number[] => {
    // Side berths (SL/SU) have no adjacent seats
    if (seatType === "SL" || seatType === "SU") {
      return [];
    }

    const seat = seats.find((s) => s.number === seatNumber);
    if (!seat) return [];

    const compartmentSeats = seats.filter(
      (s) => s.compartment === seat.compartment && s.type !== "SL" && s.type !== "SU"
    );

    // Find seats in the same row (LB with LB, MB with MB, UB with UB)
    const sameTypeSeats = compartmentSeats.filter((s) => s.type === seat.type);
    const currentIndex = sameTypeSeats.findIndex((s) => s.number === seatNumber);

    const adjacent: number[] = [];
    if (currentIndex > 0) {
      adjacent.push(sameTypeSeats[currentIndex - 1].number);
    }
    if (currentIndex < sameTypeSeats.length - 1) {
      adjacent.push(sameTypeSeats[currentIndex + 1].number);
    }

    return adjacent;
  };

  const handleSeatClick = (seatNumber: number) => {
    const seat = seats.find((s) => s.number === seatNumber);
    if (!seat || !seat.isAvailable) return;

    // If seat is reserved for female and user is not female
    if (seat.isReservedForFemale && user?.gender !== "female") {
      toast.error("This seat is reserved for female passengers only");
      return;
    }

    if (selectedSeats.includes(seatNumber)) {
      // Deselect seat
      const updatedSeats = seats.map((s) => {
        if (s.number === seatNumber) {
          const adjacentSeats = getAdjacentSeats(seatNumber, s.type);
          
          // Remove female reservation from adjacent seats if user is female
          adjacentSeats.forEach((adjNum) => {
            const adjSeat = seats.find((seat) => seat.number === adjNum);
            if (adjSeat && adjSeat.isReservedForFemale && !adjSeat.passengerGender) {
              adjSeat.isReservedForFemale = false;
            }
          });
          
          return { ...s, passengerGender: undefined };
        }
        return s;
      });
      
      setSeats(updatedSeats);
      setSelectedSeats(selectedSeats.filter((n) => n !== seatNumber));
    } else {
      // Select seat
      const updatedSeats = seats.map((s) => {
        if (s.number === seatNumber) {
          return { ...s, passengerGender: user.gender };
        }
        return s;
      });

      // If user is female, mark adjacent seats as female-only
      if (user.gender === "female") {
        const adjacentSeats = getAdjacentSeats(seatNumber, seat.type);
        adjacentSeats.forEach((adjNum) => {
          const adjSeat = updatedSeats.find((s) => s.number === adjNum);
          if (adjSeat && adjSeat.isAvailable) {
            adjSeat.isReservedForFemale = true;
          }
        });
      }

      setSeats(updatedSeats);
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const getSeatColor = (seat: Seat) => {
    if (selectedSeats.includes(seat.number)) {
      return "bg-success text-success-foreground hover:bg-success border-success shadow-lg scale-105";
    }
    if (!seat.isAvailable) {
      return "bg-muted/50 text-muted-foreground cursor-not-allowed opacity-60";
    }
    if (seat.isReservedForFemale) {
      return "bg-female-reserved text-female-reserved-foreground hover:bg-female-reserved/90 border-female-reserved-foreground/20";
    }
    return "bg-card hover:bg-primary/10 border-2 border-border hover:border-primary/40 hover:shadow-md";
  };

  const getSeatIcon = (seat: Seat) => {
    if (selectedSeats.includes(seat.number)) {
      return <CheckCircle2 className="h-4 w-4 mb-1" />;
    }
    if (seat.isReservedForFemale) {
      return <Shield className="h-4 w-4 mb-1" />;
    }
    return null;
  };

  const getSeatLabel = (type: string) => {
    const labels: Record<string, string> = {
      LB: "Lower",
      MB: "Middle",
      UB: "Upper",
      SL: "Side L",
      SU: "Side U",
    };
    return labels[type] || type;
  };

  const handleProceed = () => {
    if (selectedSeats.length === 0) {
      toast.error("Please select at least one seat");
      return;
    }

    const selectedSeatDetails = seats.filter((s) => selectedSeats.includes(s.number));
    navigate("/booking-confirmation", {
      state: {
        train,
        selectedSeats: selectedSeatDetails,
        from,
        to,
        date,
        user,
      },
    });
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6 animate-fade-in">
            <h1 className="text-3xl font-bold mb-2">Select Your Seats</h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="font-medium text-foreground">{train?.name}</span>
              <span>({train?.number})</span>
              <span>•</span>
              <span>{from} → {to}</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="p-6 animate-fade-in">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">AC 2-Tier Coach Layout</h2>
                  <Badge variant="outline" className="gap-1">
                    <UserCircle2 className="h-3 w-3" />
                    {user?.gender === "female" ? "Female Passenger" : "Male Passenger"}
                  </Badge>
                </div>
                
                {/* Enhanced Legend */}
                <Card className="p-4 mb-6 bg-muted/50">
                  <div className="flex items-center gap-2 mb-3">
                    <Info className="h-4 w-4 text-primary" />
                    <h3 className="font-semibold text-sm">Seat Legend</h3>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-card border-2 border-border rounded flex items-center justify-center">
                        <span className="text-xs font-semibold">01</span>
                      </div>
                      <span className="text-xs">Available</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-success rounded flex items-center justify-center shadow-lg">
                        <CheckCircle2 className="h-4 w-4 text-success-foreground" />
                      </div>
                      <span className="text-xs">Selected</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-female-reserved rounded flex items-center justify-center">
                        <Shield className="h-4 w-4 text-female-reserved-foreground" />
                      </div>
                      <span className="text-xs">Female Only</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-muted/50 rounded opacity-60">
                        <span className="text-xs font-semibold flex items-center justify-center h-full">XX</span>
                      </div>
                      <span className="text-xs">Booked</span>
                    </div>
                  </div>
                </Card>

                {/* Enhanced Seat Layout */}
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((comp, index) => {
                    const compartmentSeats = seats.filter((s) => s.compartment === comp);
                    const isLastCompartment = comp === 8;
                    
                    return (
                      <div 
                        key={comp} 
                        className="border-2 border-primary/20 rounded-xl p-4 bg-gradient-to-br from-card to-muted/20 hover:border-primary/40 transition-colors animate-fade-in"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <Badge variant="secondary" className="font-semibold">
                            Compartment {comp}
                          </Badge>
                          {isLastCompartment && (
                            <Badge variant="outline" className="text-xs">Side Berths Only</Badge>
                          )}
                        </div>
                        
                        <div className={cn(
                          "grid gap-2",
                          isLastCompartment ? "grid-cols-2" : "grid-cols-4 md:grid-cols-8"
                        )}>
                          {compartmentSeats.map((seat) => {
                            const isDisabled = !seat.isAvailable || (seat.isReservedForFemale && user?.gender !== "female");
                            
                            return (
                              <Tooltip key={seat.id}>
                                <TooltipTrigger asChild>
                                  <button
                                    onClick={() => handleSeatClick(seat.number)}
                                    disabled={isDisabled}
                                    className={cn(
                                      "relative p-3 rounded-lg font-bold transition-all duration-200 min-h-[60px] flex flex-col items-center justify-center",
                                      getSeatColor(seat),
                                      !isDisabled && "hover:scale-105 active:scale-95",
                                      "group"
                                    )}
                                  >
                                    {getSeatIcon(seat)}
                                    <span className="text-base">{seat.number}</span>
                                    <span className="text-[10px] font-normal opacity-70 mt-0.5">
                                      {getSeatLabel(seat.type)}
                                    </span>
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <div className="text-xs">
                                    <p className="font-semibold">Seat {seat.number}</p>
                                    <p>{getSeatLabel(seat.type)} Berth</p>
                                    {seat.isReservedForFemale && (
                                      <p className="text-female-reserved-foreground">Reserved for Female</p>
                                    )}
                                    {!seat.isAvailable && <p>Already Booked</p>}
                                  </div>
                                </TooltipContent>
                              </Tooltip>
                            );
                          })}
                        </div>
                        
                        {/* Aisle indicator for non-last compartments */}
                        {!isLastCompartment && (
                          <div className="mt-2 text-center">
                            <div className="inline-block px-3 py-1 bg-muted/50 rounded-full text-xs text-muted-foreground">
                              ← Aisle →
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-4 animate-fade-in" style={{ animationDelay: "100ms" }}>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  Booking Summary
                </h2>
                
                {user?.gender === "female" && (
                  <Card className="p-3 mb-4 bg-female-reserved/20 border-female-reserved-foreground/20">
                    <div className="flex items-start gap-2">
                      <Shield className="h-4 w-4 text-female-reserved-foreground mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-female-reserved-foreground">
                        Your adjacent seats will be reserved for female passengers
                      </p>
                    </div>
                  </Card>
                )}
                
                <div className="space-y-4">
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-2">Selected Seats</p>
                    {selectedSeats.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {selectedSeats.map((seatNum) => (
                          <Badge key={seatNum} variant="default" className="text-base font-bold">
                            {seatNum}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground italic">No seats selected</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center py-2">
                      <span className="text-sm text-muted-foreground">Base Fare</span>
                      <span className="font-semibold">₹{train?.price || 0}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-sm text-muted-foreground">Passengers</span>
                      <Badge variant="outline">{selectedSeats.length}</Badge>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t-2">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm font-medium text-muted-foreground">Total Amount</span>
                      <div className="text-right">
                        <p className="text-3xl font-bold text-primary">
                          ₹{(train?.price || 0) * selectedSeats.length}
                        </p>
                        {selectedSeats.length > 0 && (
                          <p className="text-xs text-muted-foreground">
                            ₹{train?.price} × {selectedSeats.length}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <Button
                  onClick={handleProceed}
                  className="w-full mt-4 h-12 text-base font-semibold hover-scale"
                  disabled={selectedSeats.length === 0}
                  size="lg"
                >
                  {selectedSeats.length === 0 ? "Select Seats to Continue" : "Proceed to Payment"}
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default SeatSelection;
