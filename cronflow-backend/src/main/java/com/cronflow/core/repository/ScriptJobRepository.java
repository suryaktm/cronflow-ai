package com.cronflow.core.repository;

import com.cronflow.core.entity.ScriptJob;
import com.cronflow.core.entity.JobRun;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ScriptJobRepository extends JpaRepository<ScriptJob, Long> {
    List<ScriptJob> findByProjectId(Long projectId);
}
