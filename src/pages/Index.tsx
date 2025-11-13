import { useState } from "react";
import logo from "@/assets/takshashila-logo.png";
import Hero from "@/components/Hero";
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
  image?: string;
  stops?: string[];
};

export type UserType = "student" | "staff";

export type Booking = {
  route: Route;
  selectedSeats: string[];
  passengerName: string;
  userType: UserType;
  userId: string;
  boardingPoint: string;
  phoneNumber: string;
  email: string;
};

const Index = () => {
  const [step, setStep] = useState<"home" | "route" | "seat" | "confirmation">("home");
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [booking, setBooking] = useState<Booking | null>(null);

  const handleGetStarted = () => {
    setStep("route");
  };

  const handleRouteSelect = (route: Route) => {
    setSelectedRoute(route);
    setStep("seat");
  };

  const handleSeatConfirm = (
    seats: string[], 
    passengerName: string, 
    userType: UserType, 
    userId: string,
    boardingPoint: string,
    phoneNumber: string,
    email: string
  ) => {
    if (selectedRoute) {
      setBooking({
        route: selectedRoute,
        selectedSeats: seats,
        passengerName,
        userType,
        userId,
        boardingPoint,
        phoneNumber,
        email,
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
    setStep("home");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-xl supports-[backdrop-filter]:bg-card/60 shadow-2xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-white p-2 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
                <img src={logo} alt="Takshashila University" className="h-10 w-10 object-contain" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-destructive to-primary bg-clip-text text-transparent drop-shadow-md">
                  Takshashila Ride
                </h1>
                <p className="text-xs text-muted-foreground font-medium">Smart Bus Booking & Safety</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 text-sm">
              <span className="text-muted-foreground font-medium px-4 py-2 rounded-full bg-secondary/30 backdrop-blur-sm shadow-md">
                Safe • Reliable • Affordable
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={step === "home" ? "py-0" : "container mx-auto px-4 py-8"}>
        {step === "home" && <Hero onGetStarted={handleGetStarted} />}
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
