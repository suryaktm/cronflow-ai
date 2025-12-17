package com.cronflow.core;

import com.cronflow.core.entity.Project;
import com.cronflow.core.entity.ProjectUser;
import com.cronflow.core.entity.User;
import com.cronflow.core.enums.ProjectRole;
import com.cronflow.core.repository.ProjectRepository;
import com.cronflow.core.repository.ProjectUserRepository;
import com.cronflow.core.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class CronFlowE2ETest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private ProjectUserRepository projectUserRepository;

    @Autowired
    private PasswordEncoder encoder;

    private String jwtToken;
    private Long projectId;

    @BeforeEach
    public void setup() {
        // Clear DB
        projectUserRepository.deleteAll();
        userRepository.deleteAll();
        projectRepository.deleteAll();

        // Setup Data
        User user = new User(null, "testuser", "test@test.com", encoder.encode("password"));
        userRepository.save(user);

        Project project = new Project();
        project.setName("Test Project");
        projectRepository.save(project);
        this.projectId = project.getId();

        ProjectUser projectUser = new ProjectUser(null, project, user, ProjectRole.OWNER);
        projectUserRepository.save(projectUser);

        // Login to get Token
        LoginRequest loginRequest = new LoginRequest("testuser", "password");
        ResponseEntity<JwtResponse> response = restTemplate
                .postForEntity("http://localhost:" + port + "/api/auth/login", loginRequest, JwtResponse.class);

        System.out.println("Login Status: " + response.getStatusCode());
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);

        this.jwtToken = response.getBody().getToken();
        System.out.println("Token: " + this.jwtToken);
        System.out.println("Project ID: " + this.projectId);
    }

    @Test
    public void testFullJobLifecycle() {
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(jwtToken);
        headers.setContentType(org.springframework.http.MediaType.APPLICATION_JSON);

        // 1. Create Job
        String createJobJson = "{\"name\": \"E2E_Test_Job\", \"scriptContent\": \"class X{}\", \"dockerImage\": \"alpine\", \"cronExpression\": \"0 * * * * ?\", \"enabled\": false}";
        HttpEntity<String> createRequest = new HttpEntity<>(createJobJson, headers);

        ResponseEntity<String> createResponse = restTemplate.exchange(
                "http://localhost:" + port + "/api/projects/" + projectId + "/jobs",
                HttpMethod.POST,
                createRequest,
                String.class);
        assertThat(createResponse.getStatusCode()).isEqualTo(HttpStatus.OK);

        // 2. List Job
        HttpEntity<Void> listRequest = new HttpEntity<>(headers);
        ResponseEntity<String> listResponse = restTemplate.exchange(
                "http://localhost:" + port + "/api/projects/" + projectId + "/jobs",
                HttpMethod.GET,
                listRequest,
                String.class);
        assertThat(listResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(listResponse.getBody()).contains("E2E_Test_Job");

        System.out.println(">>> FULL SYSTEM TEST PASSED: Auth, DB, API, and Job Creation verified.");
    }

    // Helper DTOs for test
    static class LoginRequest {
        public String username;
        public String password;

        public LoginRequest(String u, String p) {
            this.username = u;
            this.password = p;
        }
    }

    static class JwtResponse {
        private String token;

        public String getToken() {
            return token;
        }

        public void setToken(String a) {
            this.token = a;
        }
    }
}
