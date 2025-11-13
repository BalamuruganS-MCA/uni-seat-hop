import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MapPin, Clock, Users, Search, ArrowRight } from "lucide-react";
import type { Route } from "@/pages/Index";
import bus13Image from "@/assets/bus-13.png";

const routes: Route[] = [
  {
    id: "1",
    from: "North Hall",
    to: "Takshashila University",
    time: "08:00 AM",
    availableSeats: 28,
    totalSeats: 40,
    price: 5,
  },
  {
    id: "2",
    from: "Engineering Block",
    to: "Takshashila University",
    time: "09:30 AM",
    availableSeats: 15,
    totalSeats: 40,
    price: 5,
  },
  {
    id: "3",
    from: "Takshashila University",
    to: "North Hall",
    time: "05:00 PM",
    availableSeats: 32,
    totalSeats: 40,
    price: 5,
  },
  {
    id: "4",
    from: "Takshashila University",
    to: "Engineering Block",
    time: "06:30 PM",
    availableSeats: 8,
    totalSeats: 40,
    price: 5,
  },
  {
    id: "13",
    from: "Uppuvellore",
    to: "Takshashila University",
    time: "07:00 AM",
    availableSeats: 35,
    totalSeats: 40,
    price: 5,
    image: bus13Image,
    stops: ["Nallalam", "Kattalai", "Housing Board", "Melpettai"],
  },
];

interface RouteSelectionProps {
  onRouteSelect: (route: Route) => void;
}

const RouteSelection = ({ onRouteSelect }: RouteSelectionProps) => {
  const [searchFrom, setSearchFrom] = useState("");
  const [searchTo, setSearchTo] = useState("");

  const filteredRoutes = routes.filter((route) => {
    const matchesFrom = route.from.toLowerCase().includes(searchFrom.toLowerCase());
    const matchesTo = route.to.toLowerCase().includes(searchTo.toLowerCase());
    return matchesFrom && matchesTo;
  });

  return (
    <div className="max-w-6xl mx-auto">
      {/* Search Section */}
      <Card className="p-6 mb-8 bg-gradient-to-r from-primary to-destructive shadow-xl">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">From</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Enter origin"
                value={searchFrom}
                onChange={(e) => setSearchFrom(e.target.value)}
                className="pl-10 bg-white"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">To</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Enter destination"
                value={searchTo}
                onChange={(e) => setSearchTo(e.target.value)}
                className="pl-10 bg-white"
              />
            </div>
          </div>
          <div className="flex items-end">
            <Button className="w-full bg-white text-primary hover:bg-white/90 font-semibold">
              <Search className="h-4 w-4 mr-2" />
              Search Buses
            </Button>
          </div>
        </div>
      </Card>

      {/* Results Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-1">
          {filteredRoutes.length} Buses Found
        </h2>
        <p className="text-muted-foreground">Choose your preferred bus</p>
      </div>

      {/* Bus Routes */}
      <div className="grid gap-4">
        {filteredRoutes.map((route) => {
          const availabilityPercentage = (route.availableSeats / route.totalSeats) * 100;
          const isLowAvailability = availabilityPercentage < 30;

          return (
            <Card key={route.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
              <div className="flex flex-col md:flex-row">
                {/* Bus Image (if available) */}
                {route.image && (
                  <div className="md:w-64 h-48 md:h-auto overflow-hidden bg-muted">
                    <img 
                      src={route.image} 
                      alt={`Bus ${route.id}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                {/* Route Info */}
                <div className="flex-1 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    {route.image && (
                      <Badge variant="outline" className="border-primary text-primary font-bold">
                        Bus #{route.id}
                      </Badge>
                    )}
                    <div className="flex items-center gap-3 flex-1">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-foreground">{route.time.split(' ')[0]}</div>
                        <div className="text-xs text-muted-foreground">{route.time.split(' ')[1]}</div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground" />
                      <div className="flex flex-col">
                        <span className="font-semibold text-foreground">{route.from}</span>
                        <span className="text-xs text-muted-foreground">Origin</span>
                      </div>
                    </div>
                    <ArrowRight className="h-6 w-6 text-primary" />
                    <div className="flex flex-col items-end">
                      <span className="font-semibold text-foreground">{route.to}</span>
                      <span className="text-xs text-muted-foreground">Destination</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-4">
                      <Badge variant="secondary" className="flex items-center gap-1.5">
                        <Users className="h-3.5 w-3.5" />
                        {route.availableSeats} seats left
                      </Badge>
                      {isLowAvailability && (
                        <Badge variant="destructive" className="animate-pulse">
                          Filling Fast
                        </Badge>
                      )}
                    </div>
                    
                    {route.stops && route.stops.length > 0 && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" />
                        <span className="font-medium">Via:</span>
                        <span>{route.stops.join(" → ")}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Price & Action */}
                <div className="bg-muted/50 p-6 md:w-64 flex flex-col justify-between items-center border-t md:border-t-0 md:border-l">
                  <div className="text-center mb-4">
                    <div className="text-xs text-muted-foreground mb-1">Starts from</div>
                    <div className="text-3xl font-bold text-primary">${route.price}</div>
                    <div className="text-xs text-muted-foreground">per seat</div>
                  </div>
                  <Button
                    onClick={() => onRouteSelect(route)}
                    disabled={route.availableSeats === 0}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-md"
                    size="lg"
                  >
                    {route.availableSeats === 0 ? "Sold Out" : "View Seats"}
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
        
        {filteredRoutes.length === 0 && (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">No buses found matching your search criteria</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default RouteSelection;
