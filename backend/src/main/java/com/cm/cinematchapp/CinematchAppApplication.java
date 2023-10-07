package com.cm.cinematchapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class CinematchAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(CinematchAppApplication.class, args);
	}

}
