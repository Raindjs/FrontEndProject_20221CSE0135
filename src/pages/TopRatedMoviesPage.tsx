
import React, { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { getTopRatedMovies } from "@/services/movieApi";
import { Movie } from "@/types/movie";
import MovieGrid from "@/components/MovieGrid";
import { Button } from "@/components/ui/button";

const TopRatedMoviesPage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      try {
        setIsLoading(true);
        const data = await getTopRatedMovies();
        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error("Error fetching top rated movies:", error);
        toast({
          title: "Error",
          description: "Failed to fetch top rated movies. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopRatedMovies();
  }, [toast]);

  const loadMore = async () => {
    if (page < totalPages) {
      try {
        setIsLoading(true);
        const nextPage = page + 1;
        const data = await getTopRatedMovies();
        setMovies(prev => [...prev, ...data.results]);
        setPage(nextPage);
      } catch (error) {
        console.error("Error loading more movies:", error);
        toast({
          title: "Error",
          description: "Failed to load more movies. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Top Rated Movies</h1>
      
      {movies.length > 0 ? (
        <>
          <MovieGrid movies={movies} />
          
          {page < totalPages && (
            <div className="flex justify-center mt-8">
              <Button 
                onClick={loadMore} 
                disabled={isLoading}
                className="bg-movie-primary hover:bg-movie-primary/80"
              >
                {isLoading ? "Loading..." : "Load More"}
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="flex justify-center items-center h-64">
          <p className="text-xl text-gray-400">
            {isLoading ? "Loading top rated movies..." : "No movies found."}
          </p>
        </div>
      )}
    </div>
  );
};

export default TopRatedMoviesPage;
