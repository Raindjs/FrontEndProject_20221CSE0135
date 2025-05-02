
import React from "react";
import { Film } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-movie-card py-8 border-t border-movie-primary/20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <Film className="h-6 w-6 text-movie-primary" />
            <span className="text-xl font-bold text-movie-text">ReelQuest</span>
          </div>
          
          <p className="text-sm text-gray-400 text-center">
            Movie data provided by TMDB API. This product uses the TMDB API but is not endorsed or certified by TMDB.
          </p>
          
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} ReelQuest. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
