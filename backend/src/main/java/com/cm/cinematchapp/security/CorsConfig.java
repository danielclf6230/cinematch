package com.cm.cinematchapp.security;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

/**
 * Configuration class for defining Cross-Origin Resource Sharing (CORS) configuration.
 * CORS allows controlling which domains or sources can access resources on a web page.
 *
 * @author Eric Rebadona
 */
@Configuration
public class CorsConfig implements CorsConfigurationSource {


    @Override
    public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
        CorsConfiguration config = new CorsConfiguration();
        config.addAllowedOriginPattern("*"); // TODO make secure later. Origin paths (https://localhost:4000, https://Cinematch.ca)
        config.addAllowedMethod("*"); // TODO make secure later. GET, POST, etc.
        config.addAllowedHeader("*"); // TODO make secure later. Content-type, Authorization, etc.
        config.setAllowCredentials(true); // TODO make false?
        //TODO look into adding config.setMaxAge();
        return config;
    }
}
