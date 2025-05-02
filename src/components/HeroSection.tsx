
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BACKDROP_BASE_URL } from "@/services/movieApi";
import { Movie } from "@/types/movie";

interface HeroSectionProps {
  movie: Movie | null;
}

const HeroSection: React.FC<HeroSectionProps> = ({ movie }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    if (movie) {
      setIsLoading(false);
    }
  }, [movie]);

  if (!movie || isLoading) {
    return (
      <div className="w-full h-[30vh] md:h-[50vh] bg-movie-card animate-pulse rounded-lg mb-8"></div>
    );
  }

  const backdropUrl = movie.backdrop_path 
    ? `${BACKDROP_BASE_URL}${movie.backdrop_path}`
    : "/placeholder.svg";

  return (
    <div className="relative w-full h-[30vh] md:h-[60vh] rounded-lg overflow-hidden mb-8 animate-fade-in">
      <div className="absolute inset-0">
        <img
          src={backdropUrl}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-movie-background via-movie-background/70 to-transparent" />
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 animate-slide-up">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">
          {movie.title}
        </h1>
        <p className="text-gray-200 mb-4 line-clamp-2 md:line-clamp-3 max-w-2xl">
          {movie.overview}
        </p>
        <Link to={`/movie/${movie.id}`}>
          <Button className="bg-movie-primary hover:bg-movie-primary/80">
            <Play className="mr-2 h-4 w-4" /> View Details
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
