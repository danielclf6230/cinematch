package com.cm.cinematchapp.repositories;

import com.cm.cinematchapp.entities.Movie;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieRepository extends JpaRepository<Movie, Long> {

}
