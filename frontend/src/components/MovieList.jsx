import React, {useEffect, useState} from "react";
import {entitiesApi} from "../api/entitiesApi";
import UserList from "./UserList";
function MovieList() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUserId, setSelectedUserId] = useState(null);

    useEffect(() => {
        // Initially, fetch all movies
        fetchAllMovies();
    }, []);

    const fetchAllMovies = async () => {
        try {
            const movieData = await entitiesApi.getMovies();
            setMovies(movieData);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {movies.length === 0 ? (
                <p>No movies found.</p>
            ) : (
                <table>
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Rating</th>
                    </tr>
                    </thead>
                    <tbody>
                    {movies.map((movie) => (
                        <tr key={movie.movieId}>
                            <td>{movie.title}</td>
                            <td>{movie.description}</td>
                            <td>{movie.rated}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default MovieList;
