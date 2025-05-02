
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-movie-background text-movie-text p-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-movie-primary mb-4">404</h1>
        <p className="text-xl mb-6">The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/">
          <Button className="bg-movie-primary hover:bg-movie-primary/80">
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
