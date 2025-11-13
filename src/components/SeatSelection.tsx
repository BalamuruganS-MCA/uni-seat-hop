import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, User } from "lucide-react";
import { toast } from "sonner";
import SeatMap from "@/components/SeatMap";
import type { Route, UserType } from "@/pages/Index";

interface SeatSelectionProps {
  route: Route;
  onConfirm: (seats: string[], passengerName: string, userType: UserType, userId: string) => void;
  onBack: () => void;
}

const SeatSelection = ({ route, onConfirm, onBack }: SeatSelectionProps) => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [passengerName, setPassengerName] = useState("");
  const [userType, setUserType] = useState<UserType>("student");
  const [userId, setUserId] = useState("");

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
    if (!userId.trim()) {
      toast.error(`Please enter your ${userType === "student" ? "registration number" : "employee ID"}`);
      return;
    }
    onConfirm(selectedSeats, passengerName, userType, userId);
  };

  const totalPrice = selectedSeats.length * route.price;

  return (
    <div className="max-w-6xl mx-auto">
      <Button
        variant="ghost"
        onClick={onBack}
        className="mb-6 hover:bg-secondary text-foreground"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Buses
      </Button>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Seat Map */}
        <div className="lg:col-span-2">
          <Card className="p-6 shadow-lg">
            <div className="mb-6 pb-4 border-b">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-2xl font-bold text-foreground">Select Your Seats</h2>
                <Badge variant="outline" className="text-primary border-primary">
                  {route.time}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="font-semibold text-foreground">{route.from}</span>
                <ArrowLeft className="h-4 w-4 rotate-180 text-primary" />
                <span className="font-semibold text-foreground">{route.to}</span>
              </div>
            </div>

            <SeatMap
              totalSeats={route.totalSeats}
              bookedSeats={route.totalSeats - route.availableSeats}
              selectedSeats={selectedSeats}
              onSeatToggle={handleSeatToggle}
            />

            {/* Legend */}
            <div className="flex flex-wrap items-center gap-6 mt-6 pt-6 border-t border-border">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-md bg-success border-2 border-success"></div>
                <span className="text-sm font-medium text-foreground">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-md bg-primary border-2 border-primary"></div>
                <span className="text-sm font-medium text-foreground">Selected</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-md bg-muted border-2 border-border opacity-50"></div>
                <span className="text-sm font-medium text-foreground">Booked</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Booking Summary */}
        <div className="lg:col-span-1">
          <Card className="p-6 sticky top-6 shadow-lg border-2">
            <h3 className="text-xl font-bold text-foreground mb-6">Passenger Details</h3>

            <div className="space-y-4 mb-6">
              <div>
                <Label className="text-sm font-semibold mb-3 block">
                  User Type *
                </Label>
                <RadioGroup value={userType} onValueChange={(value) => setUserType(value as UserType)}>
                  <div className="flex items-center space-x-2 mb-2">
                    <RadioGroupItem value="student" id="student" />
                    <Label htmlFor="student" className="font-normal cursor-pointer">Student</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="staff" id="staff" />
                    <Label htmlFor="staff" className="font-normal cursor-pointer">Staff</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="name" className="text-sm font-semibold">
                  Full Name *
                </Label>
                <Input
                  id="name"
                  placeholder="Enter full name"
                  value={passengerName}
                  onChange={(e) => setPassengerName(e.target.value)}
                  className="mt-1.5 border-2 focus:border-primary"
                />
              </div>

              <div>
                <Label htmlFor="userId" className="text-sm font-semibold">
                  {userType === "student" ? "Registration Number" : "Employee ID"} *
                </Label>
                <Input
                  id="userId"
                  placeholder={userType === "student" ? "Enter registration number" : "Enter employee ID"}
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className="mt-1.5 border-2 focus:border-primary"
                />
              </div>
            </div>

            <div className="space-y-3 mb-6 p-4 bg-gradient-to-br from-muted to-muted/50 rounded-lg border">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground font-medium">Seat(s):</span>
                <span className="font-bold text-foreground">
                  {selectedSeats.length > 0 ? selectedSeats.join(", ") : "None"}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground font-medium">Base Fare:</span>
                <span className="font-semibold text-foreground">${route.price} × {selectedSeats.length}</span>
              </div>
              <div className="h-px bg-border my-2"></div>
              <div className="flex justify-between items-center">
                <span className="font-bold text-foreground text-lg">Total Amount:</span>
                <span className="text-3xl font-bold text-primary">${totalPrice}</span>
              </div>
            </div>

            <Button
              onClick={handleConfirm}
              disabled={selectedSeats.length === 0 || !passengerName || !userId}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-lg text-base"
              size="lg"
            >
              Proceed to Book
            </Button>
            
            {selectedSeats.length === 0 && (
              <p className="text-xs text-muted-foreground text-center mt-3">
                Please select at least one seat
              </p>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;
