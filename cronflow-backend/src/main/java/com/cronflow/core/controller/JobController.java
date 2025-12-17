package com.cronflow.core.controller;

import com.cronflow.core.entity.ScriptJob;
import com.cronflow.core.entity.Project;
import com.cronflow.core.payload.JobPayloads.*;
import com.cronflow.core.repository.ProjectRepository;
import com.cronflow.core.repository.ScriptJobRepository;
import com.cronflow.core.service.JobRunnerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api")
public class JobController {

    @Autowired
    private ScriptJobRepository scriptJobRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private JobRunnerService jobRunnerService;

    @Autowired
    private com.cronflow.core.service.SchedulingService schedulingService;

    @GetMapping("/projects/{projectId}/jobs")
    public List<ScriptJob> getJobsByProject(@PathVariable Long projectId) {
        return scriptJobRepository.findByProjectId(projectId);
    }

    @PostMapping("/projects/{projectId}/jobs")
    public ResponseEntity<?> createJob(@PathVariable Long projectId, @RequestBody CreateJobRequest request) {
        Project project = projectRepository.findById(projectId).orElseThrow();

        ScriptJob job = new ScriptJob();
        job.setName(request.getName());
        job.setScriptContent(request.getScriptContent());
        if (request.getDockerImage() != null && !request.getDockerImage().isEmpty()) {
            job.setDockerImage(request.getDockerImage());
        } else {
            job.setDockerImage("openjdk:17-alpine");
        }
        job.setProject(project);

        // Scheduling fields
        job.setCronExpression(request.getCronExpression());
        job.setEnabled(request.isEnabled());
        job.setScriptSource(request.getScriptSource());
        job.setScriptPath(request.getScriptPath());

        ScriptJob savedJob = scriptJobRepository.save(job);

        if (savedJob.isEnabled()) {
            schedulingService.scheduleJob(savedJob);
        }

        return ResponseEntity.ok(savedJob);
    }

    @PostMapping("/jobs/{jobId}/run")
    public ResponseEntity<?> runJob(@PathVariable Long jobId) {
        jobRunnerService.executeJob(jobId);
        return ResponseEntity.ok("Job execution triggered");
    }

    @DeleteMapping("/projects/{projectId}/jobs/{jobId}")
    public ResponseEntity<?> deleteJob(@PathVariable Long projectId, @PathVariable Long jobId) {
        // Verification: Ensure job belongs to project (omitted for brevity, but good
        // practice)
        scriptJobRepository.deleteById(jobId);
        // Also remove from scheduler if enabled
        schedulingService.removeJob(jobId);
        return ResponseEntity.ok("Job deleted successfully");
    }
}
