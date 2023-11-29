import React, {useEffect, useRef, useState} from "react";
import {entitiesApi} from "../api/entitiesApi";

function MovieList() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAllMovies = async () => {
        try {
            const movieData = await entitiesApi.getMovies();
            setMovies(movieData);

            // // If the onFetchMovieData callback is provided, call it with the fetched movie data
            // if (onFetchMovieData) {
            //     onFetchMovieData(movieData);
            // }
        } catch (error) {
            console.error('Error fetching movies:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchAllMoviesRef = useRef(fetchAllMovies);

    useEffect(() => {
        // Initially, fetch all movies
        fetchAllMoviesRef.current();
    }, []);

    const handleDeleteMovie = async (selectedMovie) => {
        try {
            const response = await entitiesApi.deleteMovie(selectedMovie.id);
            fetchAllMoviesRef.current(); // Use the ref to call fetchAllMovies
        } catch (error) {
            console.error('Error deleting movie:', error);
        }
    };

    // Expose fetchAllMovies through a ref
    const fetchAllMoviesExposed = useRef(fetchAllMovies);
    useEffect(() => {
        fetchAllMoviesRef.current = fetchAllMoviesExposed.current;
    }, [fetchAllMoviesExposed]);



    return (
        <div className="row">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    {movies.length === 0 ? (
                        <p>No movies found.</p>
                    ) : (
                        <table>
                            <thead>
                            <tr>
                                <h2>Current Movie List</h2>
                            </tr>
                            <tr className="row">
                                <th className="col-1">ID</th>
                                <th className="col-2">Title</th>
                                <th className="col-7">Description</th>
                                <th className="col-1">Rating</th>
                                <th className="col-1">Remove</th>
                            </tr>
                            </thead>
                            <tbody>
                            {movies.map((movie) => (
                                <tr className="row" key={movie.movieId}>
                                    <td className="col-1">{movie.id}</td>
                                    <td className="col-2">{movie.title}</td>
                                    <td className="desc col-7">{movie.description}</td>
                                    <td className="col-1">{movie.rated}</td>
                                    <td className="col-1"><button onClick={() => handleDeleteMovie(movie)}>Delete</button></td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}
        </div>
    );
}

export default MovieList;
