package com.cronflow;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class CronflowBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(CronflowBackendApplication.class, args);
	}

}
