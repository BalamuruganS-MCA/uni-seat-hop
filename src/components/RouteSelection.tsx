import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Users } from "lucide-react";
import type { Route } from "@/pages/Index";

const routes: Route[] = [
  {
    id: "1",
    from: "Main Campus",
    to: "North Hall",
    time: "08:00 AM",
    availableSeats: 28,
    totalSeats: 40,
    price: 5,
  },
  {
    id: "2",
    from: "Main Campus",
    to: "Engineering Block",
    time: "09:30 AM",
    availableSeats: 15,
    totalSeats: 40,
    price: 5,
  },
  {
    id: "3",
    from: "North Hall",
    to: "Main Campus",
    time: "05:00 PM",
    availableSeats: 32,
    totalSeats: 40,
    price: 5,
  },
  {
    id: "4",
    from: "Engineering Block",
    to: "Main Campus",
    time: "06:30 PM",
    availableSeats: 8,
    totalSeats: 40,
    price: 5,
  },
];

interface RouteSelectionProps {
  onRouteSelect: (route: Route) => void;
}

const RouteSelection = ({ onRouteSelect }: RouteSelectionProps) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Select Your Route</h2>
        <p className="text-muted-foreground">Choose from available bus routes today</p>
      </div>

      <div className="grid gap-4">
        {routes.map((route) => {
          const availabilityPercentage = (route.availableSeats / route.totalSeats) * 100;
          const isLowAvailability = availabilityPercentage < 30;

          return (
            <Card key={route.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-lg text-foreground">{route.from}</span>
                      <span className="text-muted-foreground">→</span>
                      <span className="font-semibold text-lg text-foreground">{route.to}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{route.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        {route.availableSeats} of {route.totalSeats} seats available
                      </span>
                      {isLowAvailability && (
                        <Badge variant="destructive" className="ml-2">
                          Limited
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-3">
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">${route.price}</div>
                    <div className="text-xs text-muted-foreground">per seat</div>
                  </div>
                  <Button
                    onClick={() => onRouteSelect(route)}
                    disabled={route.availableSeats === 0}
                    className="bg-accent hover:bg-accent/90 text-accent-foreground"
                  >
                    {route.availableSeats === 0 ? "Full" : "Select Route"}
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default RouteSelection;
