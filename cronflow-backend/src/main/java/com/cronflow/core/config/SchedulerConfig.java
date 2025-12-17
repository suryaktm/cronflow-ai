package com.cronflow.core.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.quartz.SchedulerFactoryBean;

@Configuration
public class SchedulerConfig {

    @Bean
    public SchedulerFactoryBean schedulerFactoryBean() {
        SchedulerFactoryBean factory = new SchedulerFactoryBean();
        // We can add custom Quartz properties here if needed
        // For now, Spring Boot's default auto-configuration handles the basics
        // including creating a RAMJobStore since no dataSource is explicitly linked for
        // Quartz
        return factory;
    }
}
