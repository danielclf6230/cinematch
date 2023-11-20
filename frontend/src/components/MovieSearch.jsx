import React, {useRef, useState} from 'react';
import { actionsApi } from '../api/actionsApi';
import PosterPreview from './PosterPreview';
import MovieList from "./MovieList";

function MovieSearch() {
    const [searchTerm, setSearchTerm] = useState({
        title: '',
    });
    const [searchResult, setSearchResult] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [addedMovie, setAddedMovie] = useState(null);

    const handleSearch = async () => {
        try {
            const response = await actionsApi.searchMovie(searchTerm);
            console.log(response.data);
            setSearchResult(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleSelectMovie = async (selectedMovie) => {
        try {
            const response = await actionsApi.selectMovie(selectedMovie);
            setSelectedMovie(response.data); // Update addedMovie state with the selected movie details
        } catch (error) {
            console.error('Error selecting movie:', error);
        }
    };

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

    const movieListRef = useRef(); // Create a ref

    return (
        <div className="App">
            {/*<SideMenu />*/}
            <div className="searchArea">
                <input
                    type="text"
                    placeholder="Search for movies..."
                    value={searchTerm.title}
                    onChange={(e) => setSearchTerm(e.target.value )}
                />
                <button onClick={handleSearch}>Search</button>
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
                {selectedMovie && (
                    <div>
                        <p>Would you like to add {`${selectedMovie.title} (${selectedMovie.year})`}? <button onClick={() => handleAddedMovie(selectedMovie)}>Add Movie</button></p>
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
