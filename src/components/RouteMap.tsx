import { MapPin, Circle } from "lucide-react";

interface RouteMapProps {
  stops: string[];
  origin: string;
  destination: string;
}

const RouteMap = ({ stops, origin, destination }: RouteMapProps) => {
  const allStops = [origin, ...stops, destination];

  return (
    <div className="py-4">
      <div className="flex items-center gap-3 overflow-x-auto pb-2">
        {allStops.map((stop, index) => (
          <div key={`${stop}-${index}`} className="flex items-center gap-3 min-w-fit">
            <div className="flex flex-col items-center gap-1">
              <div className={`rounded-full p-2 ${
                index === 0 
                  ? "bg-primary text-primary-foreground" 
                  : index === allStops.length - 1 
                  ? "bg-destructive text-destructive-foreground"
                  : "bg-secondary text-secondary-foreground"
              }`}>
                {index === 0 || index === allStops.length - 1 ? (
                  <MapPin className="h-4 w-4" />
                ) : (
                  <Circle className="h-4 w-4" />
                )}
              </div>
              <span className="text-xs font-medium text-foreground whitespace-nowrap">
                {stop}
              </span>
              <span className="text-[10px] text-muted-foreground">
                {index === 0 ? "Start" : index === allStops.length - 1 ? "End" : `Stop ${index}`}
              </span>
            </div>
            {index < allStops.length - 1 && (
              <div className="flex-1 min-w-[40px] h-0.5 bg-gradient-to-r from-primary to-destructive" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RouteMap;
