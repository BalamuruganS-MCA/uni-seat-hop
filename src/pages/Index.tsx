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
      <header className="border-b border-border bg-card shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-primary p-2.5">
              <Bus className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">UniTransit</h1>
              <p className="text-sm text-muted-foreground">University Bus Reservation</p>
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
