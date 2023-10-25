package com.cm.cinematchapp.services;


import com.cm.cinematchapp.constants.EntityConstants;
import com.cm.cinematchapp.entities.Movie;
import com.cm.cinematchapp.entities.MoviePoster;
import com.cm.cinematchapp.entities.MovieResult;
import com.cm.cinematchapp.repositories.MoviePosterRepository;
import com.cm.cinematchapp.repositories.MovieRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@Transactional
@Slf4j
public class MovieService {

    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private MoviePosterRepository moviePosterRepository;

    @Autowired
    private RestTemplate restTemplate;

    public List<Movie> searchForMovie(String title) throws JsonProcessingException {
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.set("X-RapidAPI-Key", EntityConstants.kRapidApiKey);
        httpHeaders.set("X-RapidAPI-Host", EntityConstants.kRapidApiHost);

        HttpEntity<String> requestEntity = new HttpEntity<>(httpHeaders);

        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(EntityConstants.kRapidApiUrl)
                .queryParam("title", title)
                .queryParam("country", "ca")
                .queryParam("show_type", "movie")
                .queryParam("output_language", "en");

        ResponseEntity<String> responseEntity = restTemplate.exchange(
                builder.toUriString(),
                HttpMethod.GET,
                requestEntity,
                String.class
        );

        String responseBody = responseEntity.getBody();

        ObjectMapper objectMapper = new ObjectMapper();
        MovieResult movieResult = objectMapper.readValue(responseBody, MovieResult.class);

        List<Movie> allMovies = movieResult.getResult();
        List<Movie> movies = new ArrayList<>();

        int movieCount = Math.min(5, allMovies.size()); // Limit to the first 5 movies

        for (int i = 0; i < movieCount; i++) {
            movies.add(allMovies.get(i));
        }

        return movies;
    }

    public Movie createMovie(Movie movie) throws UnsupportedEncodingException {

        HttpEntity<String> requestEntity = new HttpEntity<>(new HttpHeaders());
        String encodedTitle = URLEncoder.encode(movie.getTitle(), StandardCharsets.UTF_8.toString());
        String url = EntityConstants.kOMDBApiHost + encodedTitle + "&y=" + movie.getYear() + EntityConstants.kOMDBApiKey;
        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(url);

        ResponseEntity<Map> responseEntity = restTemplate.exchange(
                builder.toUriString(),
                HttpMethod.GET,
                requestEntity,
                Map.class
        );

        Map<String, Object> responseBody = responseEntity.getBody();

        MoviePoster moviePoster = new MoviePoster();
        Movie createdMovie = new Movie();

        createdMovie.setTitle(movie.getTitle());
        createdMovie.setYear(movie.getYear());
        createdMovie.setStreamingInfo(movie.getStreamingInfo());

        if (responseBody != null) {
            createdMovie.setDescription((String) responseBody.get("Plot"));
            createdMovie.setRated((String) responseBody.get("Rated"));
            moviePoster.setPath((String) responseBody.get("Poster"));
            moviePoster = moviePosterRepository.save(moviePoster);
            createdMovie.setPoster(moviePoster);
        }

        createdMovie = movieRepository.save(createdMovie);

        return createdMovie;
    }

}
