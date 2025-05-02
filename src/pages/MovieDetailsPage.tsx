
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { BACKDROP_BASE_URL, POSTER_BASE_URL, getMovieDetails } from "@/services/movieApi";
import { Movie } from "@/types/movie";
import { Button } from "@/components/ui/button";

const MovieDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        const movieId = parseInt(id);
        const data = await getMovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        toast({
          title: "Error",
          description: "Failed to fetch movie details. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id, toast]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="w-full h-[40vh] bg-movie-card animate-pulse rounded-lg mb-8"></div>
        <div className="w-1/2 h-8 bg-movie-card animate-pulse rounded mb-4"></div>
        <div className="w-full h-32 bg-movie-card animate-pulse rounded mb-8"></div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Movie not found</h2>
        <Link to="/">
          <Button>Return to Home</Button>
        </Link>
      </div>
    );
  }

  const backdropUrl = movie.backdrop_path 
    ? `${BACKDROP_BASE_URL}${movie.backdrop_path}`
    : "/placeholder.svg";
    
  const posterUrl = movie.poster_path 
    ? `${POSTER_BASE_URL}${movie.poster_path}`
    : "/placeholder.svg";

  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A";

  return (
    <div className="min-h-screen pb-12 animate-fade-in">
      {/* Backdrop Image */}
      <div className="relative w-full h-[50vh]">
        <img 
          src={backdropUrl} 
          alt={movie.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-movie-background via-movie-background/70 to-transparent" />
        
        <div className="absolute top-4 left-4">
          <Link to="/">
            <Button variant="outline" size="sm" className="bg-movie-card/40 backdrop-blur-sm">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8 -mt-32 relative z-10">
          {/* Movie Poster */}
          <div className="w-full md:w-1/3 lg:w-1/4">
            <img 
              src={posterUrl} 
              alt={movie.title} 
              className="rounded-lg shadow-xl w-full max-w-xs mx-auto md:mx-0"
            />
          </div>
          
          {/* Movie Info */}
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {movie.title} {releaseYear !== "N/A" && <span className="text-gray-400">({releaseYear})</span>}
            </h1>
            
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-movie-primary/20 text-movie-primary px-2 py-1 rounded text-sm">
                {movie.vote_average.toFixed(1)}
                <Star className="inline ml-1 w-4 h-4 fill-yellow-400 stroke-yellow-400" />
              </div>
              <span className="text-gray-400 text-sm">{movie.vote_count.toLocaleString()} votes</span>
            </div>
            
            <div className="bg-movie-card p-6 rounded-lg mb-8">
              <h2 className="text-xl font-semibold mb-2">Overview</h2>
              <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">Details</h2>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span className="text-gray-400">Release Date:</span>
                    <span>{movie.release_date || "Unknown"}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-400">Popularity:</span>
                    <span>{movie.popularity.toFixed(1)}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
