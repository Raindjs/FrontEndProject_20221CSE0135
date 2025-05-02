
import React, { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Movie } from "@/types/movie";
import { getTrendingMovies, getPopularMovies, getTopRatedMovies } from "@/services/movieApi";
import HeroSection from "@/components/HeroSection";
import MovieGrid from "@/components/MovieGrid";

const HomePage: React.FC = () => {
  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null);
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        
        // Fetch trending movies for the hero section
        const trendingData = await getTrendingMovies();
        if (trendingData.results.length > 0) {
          setTrendingMovies(trendingData.results);
          // Use the first trending movie as the featured movie
          setFeaturedMovie(trendingData.results[0]);
        }
        
        // Fetch popular movies
        const popularData = await getPopularMovies();
        setPopularMovies(popularData.results);
        
        // Fetch top rated movies
        const topRatedData = await getTopRatedMovies();
        setTopRatedMovies(topRatedData.results);
        
      } catch (error) {
        console.error("Error fetching movies:", error);
        toast({
          title: "Error",
          description: "Failed to fetch movies. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [toast]);

  return (
    <div className="min-h-screen">
      <HeroSection movie={featuredMovie} />
      
      <div className="container mx-auto px-4 space-y-8 pb-12">
        <MovieGrid 
          movies={trendingMovies.slice(0, 10)} 
          title="Trending Now" 
        />
        
        <MovieGrid 
          movies={popularMovies.slice(0, 10)} 
          title="Popular Movies" 
        />
        
        <MovieGrid 
          movies={topRatedMovies.slice(0, 10)} 
          title="Top Rated" 
        />
      </div>
    </div>
  );
};

export default HomePage;
