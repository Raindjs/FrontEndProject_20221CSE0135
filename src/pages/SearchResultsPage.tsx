
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { searchMovies } from "@/services/movieApi";
import { Movie } from "@/types/movie";
import MovieGrid from "@/components/MovieGrid";
import { Button } from "@/components/ui/button";

const SearchResultsPage: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q") || "";
  
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    if (!query) return;

    const fetchSearchResults = async () => {
      try {
        setIsLoading(true);
        const data = await searchMovies(query, page);
        setMovies(prev => page === 1 ? data.results : [...prev, ...data.results]);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error("Error searching movies:", error);
        toast({
          title: "Error",
          description: "Failed to search movies. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchResults();
  }, [query, page, toast]);

  // When query changes, reset to page 1
  useEffect(() => {
    setPage(1);
    setMovies([]);
  }, [query]);

  const loadMore = () => {
    if (page < totalPages) {
      setPage(prev => prev + 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        {movies.length > 0 
          ? `Search results for "${query}"`
          : isLoading 
            ? "Searching..." 
            : `No results found for "${query}"`
        }
      </h1>
      
      {movies.length > 0 && (
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
      )}
    </div>
  );
};

export default SearchResultsPage;
