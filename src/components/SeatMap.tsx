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
          "w-14 h-14 rounded-md border-2 transition-all duration-200 font-bold text-sm relative",
          "hover:scale-110 active:scale-95",
          isBooked &&
            "bg-muted border-border opacity-40 cursor-not-allowed",
          !isBooked &&
            !isSelected &&
            "bg-success border-success hover:bg-success/90 text-success-foreground cursor-pointer shadow-sm hover:shadow-md",
          isSelected &&
            "bg-primary border-primary text-primary-foreground shadow-lg scale-110 ring-2 ring-primary/30"
        )}
      >
        <span>{seatNumber}</span>
      </button>
    );
  };

  return (
    <div className="space-y-6 bg-gradient-to-b from-muted/30 to-transparent p-6 rounded-lg">
      {/* Driver section */}
      <div className="flex justify-end items-center gap-3 pb-6 border-b-2 border-primary/20">
        <div className="flex items-center gap-2">
          <div className="w-8 h-2 bg-primary rounded-full"></div>
          <span className="text-xs font-medium text-muted-foreground">Steering</span>
        </div>
        <div className="w-20 h-14 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 border-2 border-primary/30 flex items-center justify-center">
          <span className="text-sm font-bold text-primary">Driver</span>
        </div>
      </div>

      {/* Seat rows */}
      <div className="space-y-4">
        {Array.from({ length: rows }, (_, rowIndex) => {
          const rowStartSeat = rowIndex * 4 + 1;
          const leftSeats = [rowStartSeat, rowStartSeat + 1]
            .filter((n) => n <= totalSeats)
            .map(String);
          const rightSeats = [rowStartSeat + 2, rowStartSeat + 3]
            .filter((n) => n <= totalSeats)
            .map(String);

          return (
            <div key={rowIndex} className="flex justify-center items-center gap-8">
              {/* Left side seats */}
              <div className="flex gap-3">
                {leftSeats.map((seat) => renderSeat(seat))}
              </div>

              {/* Aisle */}
              <div className="w-16 h-px bg-border"></div>

              {/* Right side seats */}
              <div className="flex gap-3">
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
