import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Bus, Clock, Shield, MapPin, ArrowRight, CheckCircle } from "lucide-react";

interface HeroProps {
  onGetStarted: () => void;
}

const Hero = ({ onGetStarted }: HeroProps) => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-destructive/10 -z-10" />
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary">
              <CheckCircle className="w-4 h-4" />
              Trusted by 10,000+ students & staff
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
              Your Campus Journey
              <span className="block bg-gradient-to-r from-primary to-destructive bg-clip-text text-transparent">
                Starts Here
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Book your university bus seats in seconds. Safe, reliable, and always on time.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button 
                onClick={onGetStarted}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all hover-scale"
              >
                Book Your Seat Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="font-semibold text-lg px-8 py-6"
              >
                View Schedule
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose UniTransit?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience seamless campus transportation with our modern booking system
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="p-8 hover:shadow-xl transition-all hover-scale animate-fade-in border-2">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 mx-auto">
              <Clock className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground text-center mb-3">
              Real-Time Booking
            </h3>
            <p className="text-muted-foreground text-center">
              See available seats instantly and book in real-time. No waiting, no hassle.
            </p>
          </Card>

          <Card className="p-8 hover:shadow-xl transition-all hover-scale animate-fade-in border-2" style={{ animationDelay: "100ms" }}>
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 mx-auto">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground text-center mb-3">
              Safe & Secure
            </h3>
            <p className="text-muted-foreground text-center">
              Your information is protected. Travel with confidence on verified routes.
            </p>
          </Card>

          <Card className="p-8 hover:shadow-xl transition-all hover-scale animate-fade-in border-2" style={{ animationDelay: "200ms" }}>
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 mx-auto">
              <MapPin className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground text-center mb-3">
              Multiple Routes
            </h3>
            <p className="text-muted-foreground text-center">
              Choose from various pickup points across the city. We've got you covered.
            </p>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4">
        <Card className="bg-gradient-to-br from-primary to-destructive p-12 shadow-2xl">
          <div className="grid md:grid-cols-3 gap-8 text-center text-white">
            <div className="space-y-2 animate-fade-in">
              <div className="text-5xl font-bold">10K+</div>
              <div className="text-lg opacity-90">Happy Travelers</div>
            </div>
            <div className="space-y-2 animate-fade-in" style={{ animationDelay: "100ms" }}>
              <div className="text-5xl font-bold">50+</div>
              <div className="text-lg opacity-90">Daily Routes</div>
            </div>
            <div className="space-y-2 animate-fade-in" style={{ animationDelay: "200ms" }}>
              <div className="text-5xl font-bold">99%</div>
              <div className="text-lg opacity-90">On-Time Rate</div>
            </div>
          </div>
        </Card>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 pb-16">
        <Card className="p-12 text-center bg-muted/50 border-2">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of students and staff who trust UniTransit for their daily commute
          </p>
          <Button 
            onClick={onGetStarted}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-10 py-6 shadow-lg hover:shadow-xl transition-all hover-scale"
          >
            Book Your First Ride
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Card>
      </section>
    </div>
  );
};

export default Hero;
