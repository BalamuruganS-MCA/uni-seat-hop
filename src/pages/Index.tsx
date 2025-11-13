import { useState } from "react";
import { Bus } from "lucide-react";
import RouteSelection from "@/components/RouteSelection";
import SeatSelection from "@/components/SeatSelection";
import BookingConfirmation from "@/components/BookingConfirmation";

export type Route = {
  id: string;
  from: string;
  to: string;
  time: string;
  availableSeats: number;
  totalSeats: number;
  price: number;
};

export type Booking = {
  route: Route;
  selectedSeats: string[];
  passengerName: string;
  studentId: string;
};

const Index = () => {
  const [step, setStep] = useState<"route" | "seat" | "confirmation">("route");
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [booking, setBooking] = useState<Booking | null>(null);

  const handleRouteSelect = (route: Route) => {
    setSelectedRoute(route);
    setStep("seat");
  };

  const handleSeatConfirm = (seats: string[], passengerName: string, studentId: string) => {
    if (selectedRoute) {
      setBooking({
        route: selectedRoute,
        selectedSeats: seats,
        passengerName,
        studentId,
      });
      setStep("confirmation");
    }
  };

  const handleBackToRoutes = () => {
    setSelectedRoute(null);
    setStep("route");
  };

  const handleNewBooking = () => {
    setSelectedRoute(null);
    setBooking(null);
    setStep("route");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-gradient-to-br from-primary to-destructive p-2.5 shadow-lg">
                <Bus className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-destructive bg-clip-text text-transparent">
                  UniTransit
                </h1>
                <p className="text-xs text-muted-foreground">Book Your Campus Ride</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Safe • Reliable • Affordable</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {step === "route" && <RouteSelection onRouteSelect={handleRouteSelect} />}
        {step === "seat" && selectedRoute && (
          <SeatSelection
            route={selectedRoute}
            onConfirm={handleSeatConfirm}
            onBack={handleBackToRoutes}
          />
        )}
        {step === "confirmation" && booking && (
          <BookingConfirmation booking={booking} onNewBooking={handleNewBooking} />
        )}
      </main>
    </div>
  );
};

export default Index;
