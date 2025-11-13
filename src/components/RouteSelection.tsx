import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MapPin, Clock, Users, Search, ArrowRight } from "lucide-react";
import type { Route } from "@/pages/Index";
import bus13Image from "@/assets/bus-13.png";
import RouteMap from "./RouteMap";

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
  {
    id: "13",
    from: "Nallalam",
    to: "Takshashila University",
    time: "07:10 AM",
    availableSeats: 35,
    totalSeats: 40,
    price: 4,
    image: bus13Image,
    stops: ["Kattalai", "Housing Board", "Melpettai"],
  },
  {
    id: "13",
    from: "Kattalai",
    to: "Takshashila University",
    time: "07:15 AM",
    availableSeats: 35,
    totalSeats: 40,
    price: 4,
    image: bus13Image,
    stops: ["Housing Board", "Melpettai"],
  },
  {
    id: "13",
    from: "Housing Board",
    to: "Takshashila University",
    time: "07:20 AM",
    availableSeats: 35,
    totalSeats: 40,
    price: 3,
    image: bus13Image,
    stops: ["Melpettai"],
  },
  {
    id: "13",
    from: "Melpettai",
    to: "Takshashila University",
    time: "07:25 AM",
    availableSeats: 35,
    totalSeats: 40,
    price: 3,
    image: bus13Image,
    stops: [],
  },
];

interface RouteSelectionProps {
  onRouteSelect: (route: Route) => void;
}

const RouteSelection = ({ onRouteSelect }: RouteSelectionProps) => {
  const [searchFrom, setSearchFrom] = useState("");
  const [searchTo, setSearchTo] = useState("");
  const [isMorning, setIsMorning] = useState(true);

  // Check time and set appropriate default
  useEffect(() => {
    const currentHour = new Date().getHours();
    const morning = currentHour < 14; // Before 2 PM is morning
    setIsMorning(morning);
    
    if (morning) {
      // Morning: destination is Takshashila University
      setSearchTo("Takshashila University");
    } else {
      // Evening: source is Takshashila University
      setSearchFrom("Takshashila University");
    }
  }, []);

  const filteredRoutes = routes.filter((route) => {
    const matchesFrom = route.from.toLowerCase().includes(searchFrom.toLowerCase());
    const matchesTo = route.to.toLowerCase().includes(searchTo.toLowerCase());
    return matchesFrom && matchesTo;
  });

  // Group routes by bus ID
  const groupedRoutes = filteredRoutes.reduce((acc, route) => {
    const key = `${route.id}-${route.to}-${route.time.split(' ')[1]}`; // Group by ID, destination, and AM/PM
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(route);
    return acc;
  }, {} as Record<string, Route[]>);

  const routeGroups = Object.values(groupedRoutes);

  return (
    <div className="max-w-6xl mx-auto">
      {/* Search Section */}
      <Card className="p-6 mb-8 bg-gradient-to-r from-primary to-destructive shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-white">Book Your Ride</h3>
          <Badge className="bg-white/20 text-white hover:bg-white/30">
            <Clock className="h-3 w-3 mr-1" />
            {isMorning ? "Morning Mode" : "Evening Mode"}
          </Badge>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">
              From {!isMorning && <span className="text-xs opacity-80">(Auto-set to Takshashila)</span>}
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={isMorning ? "Enter origin" : "Takshashila University"}
                value={searchFrom}
                onChange={(e) => setSearchFrom(e.target.value)}
                disabled={!isMorning}
                className="pl-10 bg-white disabled:opacity-70 disabled:cursor-not-allowed"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-white">
              To {isMorning && <span className="text-xs opacity-80">(Auto-set to Takshashila)</span>}
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={isMorning ? "Takshashila University" : "Enter destination"}
                value={searchTo}
                onChange={(e) => setSearchTo(e.target.value)}
                disabled={isMorning}
                className="pl-10 bg-white disabled:opacity-70 disabled:cursor-not-allowed"
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
          {routeGroups.length} Buses Found
        </h2>
        <p className="text-muted-foreground">Choose your preferred bus</p>
      </div>

      {/* Bus Routes */}
      <div className="grid gap-4">
        {routeGroups.map((routeGroup) => {
          const route = routeGroup[0]; // Primary route for display
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
                    
                    
                    {route.stops && route.stops.length > 0 && routeGroup.length === 1 && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" />
                        <span className="font-medium">Via:</span>
                        <span>{route.stops.join(" → ")}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action */}
                <div className="bg-muted/50 p-6 md:w-64 flex flex-col justify-center items-center border-t md:border-t-0 md:border-l">
                  {routeGroup.length > 1 ? (
                    <div className="space-y-2 w-full">
                      {routeGroup.map((r) => (
                        <Button
                          key={`${r.id}-${r.from}-${r.time}`}
                          onClick={() => onRouteSelect(r)}
                          disabled={r.availableSeats === 0}
                          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-md text-xs"
                          size="sm"
                        >
                          {r.from} • {r.time}
                        </Button>
                      ))}
                    </div>
                  ) : (
                    <Button
                      onClick={() => onRouteSelect(route)}
                      disabled={route.availableSeats === 0}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-md"
                      size="lg"
                    >
                      {route.availableSeats === 0 ? "Sold Out" : "View Seats"}
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
        
        {routeGroups.length === 0 && (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">No buses found matching your search criteria</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default RouteSelection;
