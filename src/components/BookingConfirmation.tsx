import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, MapPin, Clock, Users, CreditCard, User, IdCard } from "lucide-react";
import type { Booking } from "@/pages/Index";

interface BookingConfirmationProps {
  booking: Booking;
  onNewBooking: () => void;
}

const BookingConfirmation = ({ booking, onNewBooking }: BookingConfirmationProps) => {
  const totalPrice = booking.selectedSeats.length * booking.route.price;
  const bookingId = `BK${Date.now().toString().slice(-8)}`;

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="p-8">
        {/* Success Icon */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mb-4">
            <CheckCircle2 className="w-12 h-12 text-success" />
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Booking Confirmed!</h2>
          <p className="text-muted-foreground text-center">
            Your seat reservation has been successfully confirmed
          </p>
        </div>

        {/* Booking ID */}
        <div className="bg-primary/5 border-2 border-primary/20 rounded-lg p-4 mb-6 text-center">
          <span className="text-sm text-muted-foreground">Booking ID</span>
          <div className="text-2xl font-bold text-primary mt-1">{bookingId}</div>
        </div>

        {/* Booking Details */}
        <div className="space-y-4 mb-8">
          <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
            <User className="w-5 h-5 text-primary mt-0.5" />
            <div className="flex-1">
              <div className="text-sm text-muted-foreground">Passenger Name</div>
              <div className="font-semibold text-foreground">{booking.passengerName}</div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
            <IdCard className="w-5 h-5 text-primary mt-0.5" />
            <div className="flex-1">
              <div className="text-sm text-muted-foreground">
                {booking.userType === "student" ? "Registration Number" : "Employee ID"}
              </div>
              <div className="font-semibold text-foreground">{booking.userId}</div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
            <MapPin className="w-5 h-5 text-primary mt-0.5" />
            <div className="flex-1">
              <div className="text-sm text-muted-foreground">Route</div>
              <div className="font-semibold text-foreground">
                {booking.route.from} → {booking.route.to}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
            <Clock className="w-5 h-5 text-primary mt-0.5" />
            <div className="flex-1">
              <div className="text-sm text-muted-foreground">Departure Time</div>
              <div className="font-semibold text-foreground">{booking.route.time}</div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
            <Users className="w-5 h-5 text-primary mt-0.5" />
            <div className="flex-1">
              <div className="text-sm text-muted-foreground">Seat Numbers</div>
              <div className="flex flex-wrap gap-2 mt-1">
                {booking.selectedSeats.map((seat) => (
                  <Badge key={seat} className="bg-accent text-accent-foreground">
                    {seat}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
            <CreditCard className="w-5 h-5 text-primary mt-0.5" />
            <div className="flex-1">
              <div className="text-sm text-muted-foreground">Total Amount</div>
              <div className="text-2xl font-bold text-primary">${totalPrice}</div>
            </div>
          </div>
        </div>

        {/* Important Note */}
        <div className="bg-accent/10 border-l-4 border-accent rounded-r-lg p-4 mb-6">
          <p className="text-sm text-foreground">
            <span className="font-semibold">Important:</span> Please arrive at the boarding point at
            least 10 minutes before departure. Show this booking ID to the driver.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            onClick={onNewBooking}
            className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
            size="lg"
          >
            Book Another Seat
          </Button>
          <Button
            onClick={() => window.print()}
            variant="outline"
            size="lg"
            className="flex-1"
          >
            Print Ticket
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default BookingConfirmation;
