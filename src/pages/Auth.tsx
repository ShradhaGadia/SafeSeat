import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import { mockUsers } from "@/data/mockData";
import { Gender } from "@/types/booking";

const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    gender: "male" as Gender,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      // Mock login - use predefined users
      const user = mockUsers.find((u) => u.email === formData.email);
      if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        toast.success("Login successful!");
        navigate("/");
      } else {
        toast.error("Invalid credentials. Try: priya@example.com or rahul@example.com");
      }
    } else {
      // Mock signup
      const newUser = {
        id: String(mockUsers.length + 1),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        gender: formData.gender,
      };
      mockUsers.push(newUser);
      localStorage.setItem("currentUser", JSON.stringify(newUser));
      toast.success("Account created successfully!");
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <Card className="p-8">
            <h1 className="text-3xl font-bold text-center mb-6">
              {isLogin ? "Login" : "Sign Up"}
            </h1>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
              )}
              
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              
              {!isLogin && (
                <>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label>Gender</Label>
                    <RadioGroup
                      value={formData.gender}
                      onValueChange={(value) => setFormData({ ...formData, gender: value as Gender })}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="male" id="male" />
                        <Label htmlFor="male">Male</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id="female" />
                        <Label htmlFor="female">Female</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="other" id="other" />
                        <Label htmlFor="other">Other</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </>
              )}
              
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>
              
              <Button type="submit" className="w-full">
                {isLogin ? "Login" : "Sign Up"}
              </Button>
            </form>
            
            <div className="mt-4 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary hover:underline"
              >
                {isLogin ? "Need an account? Sign up" : "Already have an account? Login"}
              </button>
            </div>
            
            {isLogin && (
              <div className="mt-4 p-4 bg-muted rounded-lg text-sm">
                <p className="font-semibold mb-2">Demo Accounts:</p>
                <p>Female: priya@example.com</p>
                <p>Male: rahul@example.com</p>
                <p className="text-muted-foreground mt-2">(Password: any)</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Auth;
