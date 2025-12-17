package com.cronflow.core.config;

import com.cronflow.core.entity.User;
import com.cronflow.core.repository.UserRepository;
import com.cronflow.core.repository.ProjectRepository;
import com.cronflow.core.repository.ProjectUserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataSeeder {

    @Bean
    public CommandLineRunner seedData(UserRepository userRepository, ProjectRepository projectRepository,
            ProjectUserRepository projectUserRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            if (!userRepository.existsByUsername("admin")) {
                User user = new User();
                user.setUsername("admin");
                user.setEmail("admin@cronflow.com");
                user.setPasswordHash(passwordEncoder.encode("password"));
                user = userRepository.save(user); // Save first to get ID

                com.cronflow.core.entity.Project project = new com.cronflow.core.entity.Project();
                project.setName("Default Project");
                project.setDescription("System created project");
                project = projectRepository.save(project);

                com.cronflow.core.entity.ProjectUser member = new com.cronflow.core.entity.ProjectUser();
                member.setProject(project);
                member.setUser(user);
                member.setRole(com.cronflow.core.enums.ProjectRole.OWNER);
                projectUserRepository.save(member);

                System.out.println("Seeded admin user and default project.");
            }
        };
    }
}
