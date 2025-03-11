
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { HomeIcon } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-villa-ivory p-4">
      <div className="text-center max-w-md mx-auto animate-fade-in">
        <h1 className="text-6xl font-light text-villa-gold mb-6">404</h1>
        <p className="text-xl text-villa-charcoal mb-8">The page you're looking for doesn't exist or has been moved.</p>
        <Button 
          onClick={() => navigate("/")}
          className="bg-villa-gold hover:bg-villa-darkgold text-white"
        >
          <HomeIcon className="mr-2 h-4 w-4" />
          Return to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
