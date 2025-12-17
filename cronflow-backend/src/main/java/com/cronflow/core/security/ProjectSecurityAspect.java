package com.cronflow.core.security;

import com.cronflow.core.repository.ProjectUserRepository;
import com.cronflow.core.entity.User;
import com.cronflow.core.repository.UserRepository;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class ProjectSecurityAspect {

    @Autowired
    private ProjectUserRepository projectUserRepository;

    @Autowired
    private UserRepository userRepository;

    /**
     * Intercepts any method in a RestController that takes 'projectId' as a
     * Long/long argument.
     * Use consistent naming in Controllers: 'projectId'.
     */
    @Before("execution(* com.cronflow.core.controller..*(..)) && args(projectId, ..)")
    public void checkProjectAccess(JoinPoint joinPoint, Long projectId) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated() || auth.getPrincipal().equals("anonymousUser")) {
            throw new AccessDeniedException("User not authenticated");
        }

        UserDetails userDetails = (UserDetails) auth.getPrincipal(); // Assuming standard UserDetails
        String username = userDetails.getUsername();

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new AccessDeniedException("User not found"));

        boolean isMember = projectUserRepository.findByProjectIdAndUserId(projectId, user.getId()).isPresent();
        if (!isMember) {
            throw new AccessDeniedException("User does not have access to this project");
        }
    }
}
