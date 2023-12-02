import React, {useRef, useState} from 'react';
import { actionsApi } from '../api/actionsApi';
import PosterPreview from './PosterPreview';
import MovieList from "./MovieList";
import SideMenu from "./SideMenu";
import {AiOutlineSearch} from "react-icons/ai";

/**
 * React component for searching and managing movies.
 * @component
 * @example
 * // Example usage of MovieSearch component
 * import MovieSearch from './MovieSearch';
 * function App() {
 *   return (
 *     <div>
 *       <MovieSearch />
 *     </div>
 *   );
 * }
 */
function MovieSearch() {
    /**
     * State hook to manage the search term.
     * @type {Object}
     * @property {string} title - The title of the movie.
     */
    const [searchTerm, setSearchTerm] = useState({
        title: '',
    });

    /**
     * State hook to store the search results.
     * @type {Array}
     */
    const [searchResult, setSearchResult] = useState([]);

    /**
     * State hook to store the currently selected movie.
     * @type {Object | null}
     */
    const [selectedMovie, setSelectedMovie] = useState(null);

    /**
     * State hook to store the added movie details.
     * @type {Object | null}
     */
    const [addedMovie, setAddedMovie] = useState(null);

    /**
     * Reference to the MovieList component.
     * @type {React.MutableRefObject<React.Component>}
     */
    const movieListRef = useRef();

    /**
     * Function to handle searching for movies based on the provided search term.
     * @async
     * @function
     * @returns {Promise<void>}
     */
    const handleSearch = async () => {
        try {
            const response = await actionsApi.searchMovie(searchTerm);
            console.log(response.data);
            setSearchResult(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    /**
     * Function to handle selecting a movie from the search results.
     * @async
     * @function
     * @param {Object} selectedMovie - The selected movie object.
     * @returns {Promise<void>}
     */
    const handleSelectMovie = async (selectedMovie) => {
        try {
            const confirmation = window.confirm(`Would you like to add ${selectedMovie.title} (${selectedMovie.year})?`);
            if (confirmation) {
                const response = await actionsApi.selectMovie(selectedMovie);
                setSelectedMovie(response.data);
                handleAddedMovie(selectedMovie);
            }
        } catch (error) {
            console.error('Error selecting movie:', error);
        }
    };

    /**
     * Function to handle the addition of a movie.
     * @async
     * @function
     * @param {Object} selectedMovie - The selected movie object.
     * @returns {Promise<void>}
     */
    const handleAddedMovie = async (selectedMovie) => {
        try {
            setAddedMovie(selectedMovie);
            if (movieListRef.current) {
                movieListRef.current.fetchAllMoviesExposed.current();
            }
        } catch (error) {
            console.error('Error adding movie:', error);
        }
    };

    /**
     * Render the MovieSearch component.
     * @returns {JSX.Element}
     */
    return (
        <div className="App">
            <div className="searchArea">
                <input
                    type="text"
                    placeholder="Search for movies..."
                    value={searchTerm.title}
                    onChange={(e) => setSearchTerm({ title: e.target.value })}
                />
                <button onClick={handleSearch}><AiOutlineSearch /></button>
                {searchResult.length > 0 && (
                    <div>
                        <h2>Search Results</h2>
                        <ul>
                            {searchResult.map((movie, index) => (
                                <li key={index}>
                                    <p>{`${movie.title} (${movie.year})`} <button onClick={() => handleSelectMovie(movie)}>Select Movie</button></p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {addedMovie && (
                    <div>
                        <h3>Added Movie: {`${addedMovie.title} (${addedMovie.year})`}</h3>
                        {/* Additional details about the added movie can be uncommented */}
                        {/* <p>{`Title: ${addedMovie.title} (${addedMovie.year})`}</p> */}
                        {/* <p>{`Description: ${addedMovie.description}`}</p> */}
                        {/* <p>{`Rated: ${addedMovie.rated}`}</p> */}
                        {/* Streaming links and poster details can also be uncommented */}
                    </div>
                )}
                <MovieList ref={movieListRef} />
            </div>
        </div>
    );
}

export default MovieSearch;
