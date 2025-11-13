import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, User } from "lucide-react";
import { toast } from "sonner";
import SeatMap from "@/components/SeatMap";
import type { Route } from "@/pages/Index";

interface SeatSelectionProps {
  route: Route;
  onConfirm: (seats: string[], passengerName: string, studentId: string) => void;
  onBack: () => void;
}

const SeatSelection = ({ route, onConfirm, onBack }: SeatSelectionProps) => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [passengerName, setPassengerName] = useState("");
  const [studentId, setStudentId] = useState("");

  const handleSeatToggle = (seatId: string) => {
    setSelectedSeats((prev) =>
      prev.includes(seatId) ? prev.filter((id) => id !== seatId) : [...prev, seatId]
    );
  };

  const handleConfirm = () => {
    if (selectedSeats.length === 0) {
      toast.error("Please select at least one seat");
      return;
    }
    if (!passengerName.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (!studentId.trim()) {
      toast.error("Please enter your student ID");
      return;
    }
    onConfirm(selectedSeats, passengerName, studentId);
  };

  const totalPrice = selectedSeats.length * route.price;

  return (
    <div className="max-w-5xl mx-auto">
      <Button
        variant="ghost"
        onClick={onBack}
        className="mb-6 hover:bg-secondary"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Routes
      </Button>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Seat Map */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">Select Your Seats</h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">{route.from}</span>
                <span>→</span>
                <span className="font-medium text-foreground">{route.to}</span>
                <Badge variant="secondary" className="ml-2">
                  {route.time}
                </Badge>
              </div>
            </div>

            <SeatMap
              totalSeats={route.totalSeats}
              bookedSeats={route.totalSeats - route.availableSeats}
              selectedSeats={selectedSeats}
              onSeatToggle={handleSeatToggle}
            />

            {/* Legend */}
            <div className="flex flex-wrap items-center gap-4 mt-6 pt-6 border-t border-border">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-success border-2 border-success"></div>
                <span className="text-sm text-muted-foreground">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-accent border-2 border-accent"></div>
                <span className="text-sm text-muted-foreground">Selected</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-seat-booked border-2 border-seat-booked opacity-50"></div>
                <span className="text-sm text-muted-foreground">Booked</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Booking Summary */}
        <div className="lg:col-span-1">
          <Card className="p-6 sticky top-6">
            <h3 className="text-xl font-bold text-foreground mb-4">Booking Details</h3>

            <div className="space-y-4 mb-6">
              <div>
                <Label htmlFor="name" className="text-sm font-medium">
                  Full Name
                </Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  value={passengerName}
                  onChange={(e) => setPassengerName(e.target.value)}
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="studentId" className="text-sm font-medium">
                  Student ID
                </Label>
                <Input
                  id="studentId"
                  placeholder="Enter your student ID"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="mt-1.5"
                />
              </div>
            </div>

            <div className="space-y-3 mb-6 p-4 bg-muted rounded-lg">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Selected Seats:</span>
                <span className="font-medium text-foreground">
                  {selectedSeats.length > 0 ? selectedSeats.join(", ") : "None"}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Price per seat:</span>
                <span className="font-medium text-foreground">${route.price}</span>
              </div>
              <div className="h-px bg-border my-2"></div>
              <div className="flex justify-between">
                <span className="font-semibold text-foreground">Total:</span>
                <span className="text-2xl font-bold text-primary">${totalPrice}</span>
              </div>
            </div>

            <Button
              onClick={handleConfirm}
              disabled={selectedSeats.length === 0 || !passengerName || !studentId}
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
              size="lg"
            >
              Confirm Booking
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;
