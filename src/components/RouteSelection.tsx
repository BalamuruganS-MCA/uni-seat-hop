import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MapPin, Clock, Users, Search, ArrowRight } from "lucide-react";
import type { Route } from "@/pages/Index";
import { useRoutes } from "@/contexts/RoutesContext";
import RouteMap from "./RouteMap";

interface RouteSelectionProps {
  onRouteSelect: (route: Route) => void;
}

const RouteSelection = ({ onRouteSelect }: RouteSelectionProps) => {
  const { routes } = useRoutes();
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

  // Group routes by bus ID and destination to show as recommendations
  const routeRecommendations = filteredRoutes.reduce((acc, route) => {
    const key = `${route.id}-${route.to}`;
    if (!acc[key]) {
      acc[key] = {
        busId: route.id,
        destination: route.to,
        routes: [],
        image: route.image,
      };
    }
    acc[key].routes.push(route);
    return acc;
  }, {} as Record<string, { busId: string; destination: string; routes: Route[]; image?: string }>);

  // Convert to array and sort routes within each recommendation
  const recommendations = Object.values(routeRecommendations).map(rec => ({
    ...rec,
    routes: rec.routes.sort((a, b) => a.time.localeCompare(b.time)),
  }));

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
          {recommendations.length} {recommendations.length === 1 ? 'Bus' : 'Buses'} Available
        </h2>
        <p className="text-muted-foreground">Choose your preferred bus and boarding point</p>
      </div>

      {/* Bus Recommendations */}
      <div className="grid gap-4">
        {recommendations.map((recommendation) => {
          const firstRoute = recommendation.routes[0]; // Primary route for display
          const availabilityPercentage = (firstRoute.availableSeats / firstRoute.totalSeats) * 100;
          const isLowAvailability = availabilityPercentage < 30;
          const allStops = Array.from(new Set(recommendation.routes.flatMap(r => r.stops || [])));
          const priceRange = recommendation.routes.length > 1 
            ? `₹${Math.min(...recommendation.routes.map(r => r.price))} - ₹${Math.max(...recommendation.routes.map(r => r.price))}`
            : `₹${firstRoute.price}`;

          return (
            <Card key={`${recommendation.busId}-${recommendation.destination}`} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
              <div className="flex flex-col md:flex-row">
                {/* Bus Image (if available) */}
                {recommendation.image && (
                  <div className="md:w-64 h-48 md:h-auto overflow-hidden bg-muted">
                    <img 
                      src={recommendation.image} 
                      alt={`Bus ${recommendation.busId}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                {/* Route Info */}
                <div className="flex-1 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge variant="outline" className="border-primary text-primary font-bold">
                      Bus #{recommendation.busId}
                    </Badge>
                    <div className="flex items-center gap-3 flex-1">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-foreground">{firstRoute.time.split(' ')[0]}</div>
                        <div className="text-xs text-muted-foreground">{firstRoute.time.split(' ')[1]}</div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground" />
                      <div className="flex flex-col">
                        <span className="font-semibold text-foreground">{recommendation.routes.length} boarding point{recommendation.routes.length > 1 ? 's' : ''}</span>
                        <span className="text-xs text-muted-foreground">Available</span>
                      </div>
                    </div>
                    <ArrowRight className="h-6 w-6 text-primary" />
                    <div className="flex flex-col items-end">
                      <span className="font-semibold text-foreground">{recommendation.destination}</span>
                      <span className="text-xs text-muted-foreground">Destination</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-4">
                      <Badge variant="secondary" className="flex items-center gap-1.5">
                        <Users className="h-3.5 w-3.5" />
                        {firstRoute.availableSeats} seats available
                      </Badge>
                      <Badge variant="outline" className="flex items-center gap-1.5">
                        {priceRange}
                      </Badge>
                      {isLowAvailability && (
                        <Badge variant="destructive" className="animate-pulse">
                          Filling Fast
                        </Badge>
                      )}
                    </div>
                    
                    {allStops.length > 0 && (
                      <RouteMap 
                        stops={allStops}
                        origin={firstRoute.from}
                        destination={recommendation.destination}
                      />
                    )}
                  </div>
                </div>

                {/* Action */}
                <div className="bg-muted/50 p-6 md:w-64 flex flex-col justify-center items-center border-t md:border-t-0 md:border-l">
                  <p className="text-xs text-muted-foreground mb-3 text-center">Select boarding point:</p>
                  <div className="space-y-2 w-full max-h-64 overflow-y-auto">
                    {recommendation.routes.map((r) => (
                      <Button
                        key={`${r.id}-${r.from}-${r.time}`}
                        onClick={() => onRouteSelect(r)}
                        disabled={r.availableSeats === 0}
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-md text-xs"
                        size="sm"
                      >
                        <div className="flex flex-col items-start w-full">
                          <span className="font-bold">{r.from}</span>
                          <span className="text-[10px] opacity-80">{r.time} • ₹{r.price}</span>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
        
        {recommendations.length === 0 && (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">No buses found matching your search criteria</p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default RouteSelection;
