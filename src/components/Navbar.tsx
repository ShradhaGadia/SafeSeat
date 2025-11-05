import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Train, User, LogOut } from "lucide-react";
import { useState, useEffect } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="border-b bg-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-primary rounded-lg p-2">
              <Train className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-primary">SafeSeat</span>
          </Link>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link to="/bookings">
                  <Button variant="ghost">My Bookings</Button>
                </Link>
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  <span className="font-medium">{user.name}</span>
                </div>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <Link to="/auth">
                <Button>Login / Sign Up</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
