package com.cronflow.core.repository;

import com.cronflow.core.entity.ProjectUser;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface ProjectUserRepository extends JpaRepository<ProjectUser, Long> {
    Optional<ProjectUser> findByProjectIdAndUserId(Long projectId, Long userId);

    List<ProjectUser> findByUserId(Long userId);
}
