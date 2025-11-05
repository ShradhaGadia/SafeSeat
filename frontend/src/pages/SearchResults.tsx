import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockTrains } from "@/data/mockData";
import { Clock, IndianRupee, Users } from "lucide-react";

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { from, to, date } = location.state || {};

  const handleSelectTrain = (trainId: string) => {
    const user = localStorage.getItem("currentUser");
    if (!user) {
      navigate("/auth");
      return;
    }
    navigate("/seat-selection", { state: { trainId, from, to, date } });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Available Trains</h1>
          <p className="text-muted-foreground">
            {from} → {to} | {date}
          </p>
        </div>

        <div className="space-y-4">
          {mockTrains.map((train) => (
            <Card key={train.id} className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold">{train.name}</h3>
                    <span className="text-muted-foreground">({train.number})</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Departure</p>
                      <p className="font-semibold text-lg">{train.departure}</p>
                      <p>{train.from}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-muted-foreground flex items-center justify-center gap-1">
                        <Clock className="h-4 w-4" />
                        {train.duration}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-muted-foreground">Arrival</p>
                      <p className="font-semibold text-lg">{train.arrival}</p>
                      <p>{train.to}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{train.availableSeats} seats available</span>
                  </div>
                  <div className="flex items-center gap-1 text-2xl font-bold">
                    <IndianRupee className="h-6 w-6" />
                    {train.price}
                  </div>
                  <Button onClick={() => handleSelectTrain(train.id)}>
                    Select Seats
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
