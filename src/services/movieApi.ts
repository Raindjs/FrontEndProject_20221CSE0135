
import { SearchResults, Movie, Genre } from "@/types/movie";

// Updated API key with a valid one for TMDB API (this is a public key for demo purposes)
const API_KEY = "2dca580c2a14b55200e784d157207b4d";
const BASE_URL = "https://api.themoviedb.org/3";

export const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500";
export const BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/original";

// Helper function to make API requests
const fetchFromApi = async <T>(endpoint: string, params: Record<string, string> = {}): Promise<T> => {
  const queryParams = new URLSearchParams({
    api_key: API_KEY,
    ...params,
  });
  
  const response = await fetch(`${BASE_URL}${endpoint}?${queryParams}`);
  
  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }
  
  return await response.json();
};

// Get trending movies
export const getTrendingMovies = async (): Promise<SearchResults> => {
  return fetchFromApi<SearchResults>("/trending/movie/day");
};

// Get popular movies
export const getPopularMovies = async (): Promise<SearchResults> => {
  return fetchFromApi<SearchResults>("/movie/popular");
};

// Get top rated movies
export const getTopRatedMovies = async (): Promise<SearchResults> => {
  return fetchFromApi<SearchResults>("/movie/top_rated");
};

// Search for movies
export const searchMovies = async (query: string, page: number = 1): Promise<SearchResults> => {
  return fetchFromApi<SearchResults>("/search/movie", {
    query,
    page: page.toString(),
  });
};

// Get movie details
export const getMovieDetails = async (movieId: number): Promise<Movie> => {
  return fetchFromApi<Movie>(`/movie/${movieId}`);
};

// Get movie genres
export const getGenres = async (): Promise<{ genres: Genre[] }> => {
  return fetchFromApi<{ genres: Genre[] }>("/genre/movie/list");
};

// Get movies by genre
export const getMoviesByGenre = async (genreId: number, page: number = 1): Promise<SearchResults> => {
  return fetchFromApi<SearchResults>("/discover/movie", {
    with_genres: genreId.toString(),
    page: page.toString(),
  });
};
