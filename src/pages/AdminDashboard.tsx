import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { LogOut, Plus, Trash2, Edit, Bus } from "lucide-react";
import { useRoutes } from "@/contexts/RoutesContext";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/takshashila-logo.png";
import type { Route } from "@/pages/Index";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { routes, addRoute, deleteRoute } = useRoutes();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    busId: "",
    from: "",
    to: "",
    time: "",
    availableSeats: "",
    totalSeats: "",
    price: "",
    stops: "",
  });

  useEffect(() => {
    if (sessionStorage.getItem("adminAuth") !== "true") {
      navigate("/admin/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem("adminAuth");
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully",
    });
    navigate("/admin/login");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newRoute: Route = {
      id: formData.busId,
      from: formData.from,
      to: formData.to,
      time: formData.time,
      availableSeats: parseInt(formData.availableSeats),
      totalSeats: parseInt(formData.totalSeats),
      price: parseInt(formData.price),
      stops: formData.stops.split(",").map(s => s.trim()).filter(Boolean),
    };

    addRoute(newRoute);
    
    toast({
      title: "Route Added",
      description: `Bus ${formData.busId} route has been added successfully`,
    });

    setFormData({
      busId: "",
      from: "",
      to: "",
      time: "",
      availableSeats: "",
      totalSeats: "",
      price: "",
      stops: "",
    });
  };

  const handleDelete = (index: number, busId: string) => {
    deleteRoute(index);
    toast({
      title: "Route Deleted",
      description: `Bus ${busId} route has been deleted`,
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-xl shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-white p-2 shadow-lg">
                <img src={logo} alt="Takshashila University" className="h-10 w-10 object-contain" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-destructive bg-clip-text text-transparent">
                  Admin Dashboard
                </h1>
                <p className="text-xs text-muted-foreground font-medium">Manage Buses & Routes</p>
              </div>
            </div>
            <Button onClick={handleLogout} variant="outline">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Add Route Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Add New Route
              </CardTitle>
              <CardDescription>
                Enter the details to add a new bus route
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="busId">Bus ID</Label>
                    <Input
                      id="busId"
                      value={formData.busId}
                      onChange={(e) => setFormData({ ...formData, busId: e.target.value })}
                      placeholder="e.g., 13"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Time</Label>
                    <Input
                      id="time"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      placeholder="e.g., 07:00 AM"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="from">From</Label>
                  <Input
                    id="from"
                    value={formData.from}
                    onChange={(e) => setFormData({ ...formData, from: e.target.value })}
                    placeholder="Starting point"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="to">To</Label>
                  <Input
                    id="to"
                    value={formData.to}
                    onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                    placeholder="Destination"
                    required
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="10"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="availableSeats">Available</Label>
                    <Input
                      id="availableSeats"
                      type="number"
                      value={formData.availableSeats}
                      onChange={(e) => setFormData({ ...formData, availableSeats: e.target.value })}
                      placeholder="35"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="totalSeats">Total</Label>
                    <Input
                      id="totalSeats"
                      type="number"
                      value={formData.totalSeats}
                      onChange={(e) => setFormData({ ...formData, totalSeats: e.target.value })}
                      placeholder="40"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stops">Stops (comma separated)</Label>
                  <Input
                    id="stops"
                    value={formData.stops}
                    onChange={(e) => setFormData({ ...formData, stops: e.target.value })}
                    placeholder="Stop1, Stop2, Stop3"
                  />
                </div>

                <Button type="submit" className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Route
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Routes List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bus className="h-5 w-5" />
                All Routes ({routes.length})
              </CardTitle>
              <CardDescription>
                Manage existing bus routes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                {routes.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No routes added yet
                  </p>
                ) : (
                  routes.map((route, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">Bus {route.id}</Badge>
                          <span className="text-sm font-medium">{route.time}</span>
                        </div>
                        <p className="text-sm">
                          <span className="font-medium">{route.from}</span>
                          {" → "}
                          <span className="font-medium">{route.to}</span>
                        </p>
                        <p className="text-xs text-muted-foreground">
                          ₹{route.price} • {route.availableSeats}/{route.totalSeats} seats
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(index, route.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
