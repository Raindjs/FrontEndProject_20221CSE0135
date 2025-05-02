
import React from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { POSTER_BASE_URL } from "@/services/movieApi";
import { Movie } from "@/types/movie";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const posterUrl = movie.poster_path 
    ? `${POSTER_BASE_URL}${movie.poster_path}`
    : "/placeholder.svg";
    
  return (
    <Link to={`/movie/${movie.id}`} className="movie-card group block">
      <div className="aspect-[2/3] relative">
        <img
          src={posterUrl}
          alt={movie.title}
          className="w-full h-full object-cover rounded-lg"
          loading="lazy"
        />
        <div className="movie-overlay" />
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h3 className="movie-title group-hover:text-movie-primary transition-colors">
            {movie.title}
          </h3>
          <div className="flex justify-between items-center mt-1">
            <div className="movie-rating text-sm">
              <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
              <span>{movie.vote_average.toFixed(1)}</span>
            </div>
            <span className="text-xs text-gray-300">
              {movie.release_date?.substring(0, 4) || "N/A"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
