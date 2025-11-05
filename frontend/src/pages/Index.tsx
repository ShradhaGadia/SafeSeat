import Navbar from "@/components/Navbar";
import SearchForm from "@/components/SearchForm";
import { Card } from "@/components/ui/card";
import { Shield, CheckCircle, Clock, Info } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="max-width-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              Book Train Tickets with Women Safety First
            </h1>
            <p className="text-xl mb-8 opacity-90">
              India's first railway booking platform designed with female passenger safety in mind
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto mt-12">
            <SearchForm />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose SafeSeat?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6">
              <div className="bg-female-reserved rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-female-reserved-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Women Safety First</h3>
              <p className="text-muted-foreground">
                When a female passenger books a seat, the adjacent seat is automatically reserved for females only, ensuring comfortable and safe travel.
              </p>
            </Card>

            <Card className="p-6">
              <div className="bg-success rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6 text-success-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
              <p className="text-muted-foreground">
                Simple and intuitive interface to search trains, select seats with visual coach layout, and complete your booking in minutes.
              </p>
            </Card>

            <Card className="p-6">
              <div className="bg-warning rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-warning-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Instant Confirmation</h3>
              <p className="text-muted-foreground">
                Get immediate booking confirmation with PNR number. Track your bookings and manage them easily from your account.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Search Your Train</h4>
                  <p className="text-muted-foreground">
                    Enter your origin, destination, and travel date to find available trains.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Select Your Seats</h4>
                  <p className="text-muted-foreground">
                    Choose from available seats in our interactive AC 2-Tier coach layout. Seats are color-coded for easy identification.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Female Safety Feature Activates</h4>
                  <p className="text-muted-foreground">
                    When a female passenger books a seat, the immediately adjacent seat becomes reserved for females only. This ensures comfortable travel for all passengers.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">
                  4
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Complete Payment & Get Confirmation</h4>
                  <p className="text-muted-foreground">
                    Make secure payment and receive instant booking confirmation with your PNR number.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-female-reserved border-female-reserved-foreground">
              <div className="flex items-start gap-4">
                <Info className="h-6 w-6 text-female-reserved-foreground flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-2 text-female-reserved-foreground">
                    Important: Side Berths Exception
                  </h4>
                  <p className="text-female-reserved-foreground">
                    Side berths (SL/SU) do not have adjacent seat restrictions, as they are positioned separately in the coach layout.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2025 SafeSeat. Making railway travel safer for everyone.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
