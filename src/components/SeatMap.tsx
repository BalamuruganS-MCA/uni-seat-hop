import { cn } from "@/lib/utils";

interface SeatMapProps {
  totalSeats: number;
  bookedSeats: number;
  selectedSeats: string[];
  onSeatToggle: (seatId: string) => void;
}

const SeatMap = ({ totalSeats, bookedSeats, selectedSeats, onSeatToggle }: SeatMapProps) => {
  // Generate seat layout (4 seats per row, 2-2 configuration with aisle)
  const rows = Math.ceil(totalSeats / 4);
  const bookedSeatNumbers = new Set(
    Array.from({ length: bookedSeats }, (_, i) => `${i + 1}`)
  );

  const renderSeat = (seatNumber: string) => {
    const isBooked = bookedSeatNumbers.has(seatNumber);
    const isSelected = selectedSeats.includes(seatNumber);

    return (
      <button
        key={seatNumber}
        onClick={() => !isBooked && onSeatToggle(seatNumber)}
        disabled={isBooked}
        className={cn(
          "w-12 h-12 rounded-lg border-2 transition-all duration-200 font-semibold text-sm",
          "hover:scale-105 active:scale-95",
          isBooked &&
            "bg-seat-booked border-seat-booked opacity-50 cursor-not-allowed",
          !isBooked &&
            !isSelected &&
            "bg-success border-success hover:bg-success/80 text-success-foreground cursor-pointer",
          isSelected &&
            "bg-accent border-accent text-accent-foreground shadow-lg scale-105"
        )}
      >
        {seatNumber}
      </button>
    );
  };

  return (
    <div className="space-y-6">
      {/* Driver seat indicator */}
      <div className="flex justify-end items-center gap-2 mb-4 pb-4 border-b-2 border-primary">
        <div className="w-16 h-12 rounded-lg bg-primary/10 border-2 border-primary flex items-center justify-center">
          <span className="text-xs font-semibold text-primary">Driver</span>
        </div>
      </div>

      {/* Seat rows */}
      <div className="space-y-3">
        {Array.from({ length: rows }, (_, rowIndex) => {
          const rowStartSeat = rowIndex * 4 + 1;
          const leftSeats = [rowStartSeat, rowStartSeat + 1]
            .filter((n) => n <= totalSeats)
            .map(String);
          const rightSeats = [rowStartSeat + 2, rowStartSeat + 3]
            .filter((n) => n <= totalSeats)
            .map(String);

          return (
            <div key={rowIndex} className="flex justify-center items-center gap-6">
              {/* Left side seats */}
              <div className="flex gap-2">
                {leftSeats.map((seat) => renderSeat(seat))}
              </div>

              {/* Aisle */}
              <div className="w-12"></div>

              {/* Right side seats */}
              <div className="flex gap-2">
                {rightSeats.map((seat) => renderSeat(seat))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SeatMap;
