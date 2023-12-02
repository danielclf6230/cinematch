import React, {useRef, useState} from 'react';
import { actionsApi } from '../api/actionsApi';
import PosterPreview from './PosterPreview';
import MovieList from "./MovieList";
import SideMenu from "./SideMenu";
import {AiOutlineSearch} from "react-icons/ai";


/**
 * MovieSearch component handles searching for movies and displaying search results.
 * It also allows users to select and add movies to the MovieList.
 *
 * @component
 * @example
 * // Example usage of MovieSearch component:
 * // import MovieSearch from './path/to/MovieSearch';
 * // <MovieSearch />
 *
 * @returns {JSX.Element} The rendered MovieSearch component.
 */
function MovieSearch() {
    const [searchTerm, setSearchTerm] = useState({
        title: '',
    });
    const [searchResult, setSearchResult] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [addedMovie, setAddedMovie] = useState(null);

    /**
     * Handles searching for movies based on the provided search term.
     * Updates the searchResult state with the fetched movie data.
     * @async
     * @function
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
     * Handles selecting a movie and prompting the user for confirmation before adding it to the MovieList.
     * Updates the selectedMovie state with the chosen movie details.
     * Calls handleAddedMovie to add the selected movie to the MovieList.
     * @async
     * @function
     * @param {Object} selectedMovie - The details of the selected movie.
     */
    const handleSelectMovie = async (selectedMovie) => {
        try {
            const confirmation = window.confirm(`Would you like to add ${selectedMovie.title} (${selectedMovie.year})?`);
            if (confirmation) {
                const response = await actionsApi.selectMovie(selectedMovie);
                setSelectedMovie(response.data); // Update addedMovie state with the selected movie details
                handleAddedMovie(selectedMovie);
            }
        } catch (error) {
            console.error('Error selecting movie:', error);
        }
    };

    /**
     * Handles the addition of a movie to the MovieList.
     * Updates the addedMovie state with the selected movie details.
     * Calls the fetchAllMoviesExposed method on the MovieList component.
     * @async
     * @function
     * @param {Object} selectedMovie - The details of the selected movie.
     */
    const handleAddedMovie = async (selectedMovie) => {
        try {
            const response = selectedMovie;
            setAddedMovie(selectedMovie); // Update addedMovie state with the selected movie details
            // Use movieListRef.current as the onMovieAdded prop
            if (movieListRef.current) {
                movieListRef.current.fetchAllMoviesExposed.current();
            }
        } catch (error) {
            console.error('Error adding movie:', error);
        }
    };

    console.log(addedMovie);

    const movieListRef = useRef(); // Create a ref

    return (
        <div className="App">
            <div className="searchArea">
                <input
                    type="text"
                    placeholder="Search for movies..."
                    value={searchTerm.title}
                    onChange={(e) => setSearchTerm(e.target.value )}
                />
                <button onClick={handleSearch}><AiOutlineSearch /></button>
                {searchResult.length > 0 && (
                    <div>
                        <h2>Search Results</h2>
                        <ul>
                            {searchResult.map((movie, index) => (
                                <li key={index}>
                                    <p>{`${movie.title} (${movie.year})`} <button onClick={() => handleSelectMovie(movie)}>Select Movie</button>
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {addedMovie && (
                    <div>
                        <h3>Added Movie: {`${addedMovie.title} (${addedMovie.year})`}</h3>
                        {/*<p>{`Title: ${addedMovie.title} (${addedMovie.year})`}</p>*/}
                        {/*<p>{`Description: ${addedMovie.description}`}</p>*/}
                        {/*<p>{`Rated: ${addedMovie.rated}`}</p>*/}
                        {/*{addedMovie.streamingInfo && (*/}
                        {/*    <div>*/}
                        {/*        <h3>Streaming Links</h3>*/}
                        {/*        <ul>*/}
                        {/*            {addedMovie.streamingInfo.ca.map((streamingService, index) => (*/}
                        {/*                <li key={index}>*/}
                        {/*                    {`${streamingService.service} - ${streamingService.streamingType}: ${streamingService.link}`}*/}
                        {/*                </li>*/}
                        {/*            ))}*/}
                        {/*        </ul>*/}
                        {/*    </div>*/}
                        {/*)}*/}
                        {/*{addedMovie.poster && (*/}
                        {/*    <div>*/}
                        {/*        <PosterPreview movieId={addedMovie.id} />*/}
                        {/*    </div>*/}
                        {/*)}*/}
                    </div>
                )}
                <MovieList ref={movieListRef} />
            </div>
        </div>

    );
}

export default MovieSearch;