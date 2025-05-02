
import React from "react";
import { Link } from "react-router-dom";
import { Film } from "lucide-react";
import SearchBar from "./SearchBar";

const Navbar: React.FC = () => {
  return (
    <header className="bg-movie-card/80 backdrop-blur-md sticky top-0 z-50 border-b border-movie-primary/20">
      <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2">
          <Film className="h-6 w-6 text-movie-primary" />
          <span className="text-xl font-bold text-movie-text">ReelQuest</span>
        </Link>
        
        <div className="w-full md:w-auto">
          <SearchBar />
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-movie-text hover:text-movie-primary transition-colors">
            Home
          </Link>
          <Link to="/popular" className="text-movie-text hover:text-movie-primary transition-colors">
            Popular
          </Link>
          <Link to="/top-rated" className="text-movie-text hover:text-movie-primary transition-colors">
            Top Rated
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
