import React, { useState, useEffect } from 'react';
import { imagesApi } from '../api/imagesApi';

/**
 * React component for displaying a movie poster preview.
 * @component
 * @param {Object} props - The component props.
 * @param {number} props.movieId - The unique identifier of the movie.
 * @example
 * // Example usage of PosterPreview component
 * import PosterPreview from './PosterPreview';
 * function MovieDetails({ movieId }) {
 *   return (
 *     <div>
 *       <h2>Movie Details</h2>
 *       <PosterPreview movieId={movieId} />
 *     </div>
 *   );
 * }
 */
function PosterPreview({ movieId }) {
    /**
     * State hook to store the URL of the movie poster.
     * @type {string | null}
     */
    const [posterUrl, setPosterUrl] = useState(null);

    /**
     * State hook to track the loading status of the poster.
     * @type {boolean}
     */
    const [loading, setLoading] = useState(true);

    /**
     * Effect hook to fetch the movie poster when the component mounts or when movieId changes.
     */
    useEffect(() => {
        fetchMoviePoster();
    }, [movieId]);

    /**
     * Asynchronous function to fetch the movie poster using the movieId.
     * @async
     * @function
     * @returns {Promise<void>}
     */
    const fetchMoviePoster = async () => {
        try {
            const posterData = await imagesApi.getMoviePosterById(movieId);
            setPosterUrl(URL.createObjectURL(new Blob([posterData])));
        } catch (error) {
            console.error('Error fetching movie poster:', error);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Render the PosterPreview component.
     * @returns {JSX.Element}
     */
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
