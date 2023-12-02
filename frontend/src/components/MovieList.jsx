import React, {useEffect, useRef, useState} from "react";
import {entitiesApi} from "../api/entitiesApi";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrash} from '@fortawesome/free-solid-svg-icons';

/**
 * React component for displaying a list of movies.
 * @component
 * @example
 * // Example usage of MovieList component
 * import MovieList from './MovieList';
 * function App() {
 *   return (
 *     <div>
 *       <MovieList />
 *     </div>
 *   );
 * }
 */
function MovieList() {
    /**
     * State hook to manage the list of movies.
     * @type {Array}
     */
    const [movies, setMovies] = useState([]);

    /**
     * State hook to track the loading status of the movies.
     * @type {boolean}
     */
    const [loading, setLoading] = useState(true);

    /**
     * Effect hook to fetch all movies on component mount.
     */
    useEffect(() => {
        fetchAllMoviesRef.current();
    }, []);

    /**
     * Asynchronous function to fetch all movies from the API.
     * @async
     * @function
     * @returns {Promise<void>}
     */
    const fetchAllMovies = async () => {
        try {
            const movieData = await entitiesApi.getMovies();
            setMovies(movieData);
        } catch (error) {
            console.error('Error fetching movies:', error);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Reference to the fetchAllMovies function.
     * @type {React.MutableRefObject<function>}
     */
    const fetchAllMoviesRef = useRef(fetchAllMovies);

    /**
     * Asynchronous function to handle the deletion of a movie.
     * @async
     * @function
     * @param {Object} selectedMovie - The movie object to be deleted.
     * @returns {Promise<void>}
     */
    const handleDeleteMovie = async (selectedMovie) => {
        try {
            await entitiesApi.deleteMovie(selectedMovie.id);
            fetchAllMoviesRef.current();
        } catch (error) {
            console.error('Error deleting movie:', error);
        }
    };

    /**
     * Effect hook to expose fetchAllMovies through a ref.
     */
    const fetchAllMoviesExposed = useRef(fetchAllMovies);
    useEffect(() => {
        fetchAllMoviesRef.current = fetchAllMoviesExposed.current;
    }, [fetchAllMoviesExposed]);

    /**
     * Render the MovieList component.
     * @returns {JSX.Element}
     */
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
                                    <td className="col-1">
                                        <button onClick={() => handleDeleteMovie(movie)}>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </td>
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
