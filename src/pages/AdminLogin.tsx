import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ShieldAlert, LogIn } from "lucide-react";
import logo from "@/assets/takshashila-logo.png";
import { useToast } from "@/hooks/use-toast";

const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple password check - NOT SECURE for production
    if (password === "admin123") {
      sessionStorage.setItem("adminAuth", "true");
      toast({
        title: "Login Successful",
        description: "Welcome to admin dashboard",
      });
      navigate("/admin/dashboard");
    } else {
      setError("Invalid password");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4">
          <div className="flex justify-center">
            <div className="rounded-xl bg-white p-3 shadow-lg">
              <img src={logo} alt="Takshashila University" className="h-16 w-16 object-contain" />
            </div>
          </div>
          <div className="text-center space-y-2">
            <CardTitle className="text-2xl">Admin Login</CardTitle>
            <CardDescription>
              Enter your password to access the admin dashboard
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Alert className="mb-4 border-orange-500/50 bg-orange-500/10">
            <ShieldAlert className="h-4 w-4 text-orange-500" />
            <AlertDescription className="text-orange-700 dark:text-orange-400">
              This is a client-side demo. Not secure for production use.
            </AlertDescription>
          </Alert>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                placeholder="Enter admin password"
                required
              />
              {error && <p className="text-sm text-destructive">{error}</p>}
              <p className="text-xs text-muted-foreground">
                Demo password: admin123
              </p>
            </div>
            
            <Button type="submit" className="w-full">
              <LogIn className="mr-2 h-4 w-4" />
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
