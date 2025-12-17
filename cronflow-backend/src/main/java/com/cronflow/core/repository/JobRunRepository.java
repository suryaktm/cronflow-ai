package com.cronflow.core.repository;

import com.cronflow.core.entity.JobRun;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface JobRunRepository extends JpaRepository<JobRun, Long> {
    List<JobRun> findByJobIdOrderByStartTimeDesc(Long jobId);
}
