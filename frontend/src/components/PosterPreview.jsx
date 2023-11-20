import React, { useState, useEffect } from 'react';
import { imagesApi } from '../api/imagesApi';

function PosterPreview({ movieId }) {
    const [posterUrl, setPosterUrl] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch the movie poster when the component mounts
        fetchMoviePoster();
    }, [movieId]);

    const fetchMoviePoster = async () => {
        try {
            // Fetch the movie poster using getMoviePosterById with movieId
            const posterData = await imagesApi.getMoviePosterById(movieId);

            // Set the poster URL using the fetched data
            setPosterUrl(URL.createObjectURL(new Blob([posterData])));
        } catch (error) {
            console.error('Error fetching movie poster:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    {posterUrl ? (
                        <div>
                            <img src={posterUrl} alt="MoviePoster" />
                        </div>
                    ) : (
                        <p>No movie poster available</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default PosterPreview;
