import React, { useState } from 'react';
import { actionsApi } from '../api/actionsApi';


function MovieSearch() {
    const [searchTerm, setSearchTerm] = useState({
        title: '',
    });
    const [searchResult, setSearchResult] = useState([]);
    const [addedMovie, setAddedMovie] = useState(null);

    const handleSearch = async () => {
        try {
            const response = await actionsApi.searchMovie(searchTerm);
            setSearchResult(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleSelectMovie = async (selectedMovie) => {
        try {
            const response = await actionsApi.selectMovie(selectedMovie);
            setAddedMovie(response.data); // Update addedMovie state with the selected movie details
        } catch (error) {
            console.error('Error selecting movie:', error);
        }
    };

    return (
        <div>
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
                                <p>{`${movie.title} (${movie.year})`}</p>
                                <button onClick={() => handleSelectMovie(movie)}>Select Movie</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {addedMovie && (
                <div>
                    <h2>Added Movie</h2>
                    <p>{`Title: ${addedMovie.title} (${addedMovie.year})`}</p>
                    <p>{`Description: ${addedMovie.description}`}</p>
                    <p>{`Rated: ${addedMovie.rated}`}</p>
                    {addedMovie.streamingInfo && (
                        <div>
                            <h3>Streaming Links</h3>
                            <ul>
                                {addedMovie.streamingInfo.ca.map((streamingService, index) => (
                                    <li key={index}>
                                        {`${streamingService.service} - ${streamingService.streamingType}: ${streamingService.link}`}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {addedMovie.poster && (
                        <div>
                            <h3>Poster Image</h3>
                            <img src={addedMovie.poster.path} alt="Poster" />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default MovieSearch;
