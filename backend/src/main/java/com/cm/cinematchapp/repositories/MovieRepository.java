package com.cm.cinematchapp.repositories;

import com.cm.cinematchapp.entities.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MovieRepository extends JpaRepository<Movie, Long> {

    Movie getMovieById(Long movieId);

    @Query("SELECT CASE WHEN COUNT(m.poster) > 0 THEN true ELSE false END FROM Movie m WHERE m.id = :movieId")
    boolean posterExistByMovieId(@Param("movieId") Long movieId);
}
