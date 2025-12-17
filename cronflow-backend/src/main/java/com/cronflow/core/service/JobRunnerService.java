package com.cronflow.core.service;

import com.cronflow.core.entity.JobRun;
import com.cronflow.core.entity.ScriptJob;
import com.cronflow.core.enums.JobStatus;
import com.cronflow.core.repository.JobRunRepository;
import com.cronflow.core.repository.ScriptJobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDateTime;
import java.util.UUID;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@Service
public class JobRunnerService {

    @Autowired
    private JobRunRepository jobRunRepository;

    @Autowired
    private ScriptJobRepository scriptJobRepository;

    @Async
    public void executeJob(Long jobId) {
        ScriptJob job = scriptJobRepository.findById(jobId).orElseThrow();

        JobRun run = new JobRun();
        run.setJob(job);
        run.setStartTime(LocalDateTime.now());
        run.setStatus(JobStatus.RUNNING);
        run = jobRunRepository.save(run);

        String containerId = "cronflow-" + UUID.randomUUID().toString().substring(0, 8);
        Path executionScriptPath = null;
        boolean isTempFile = false;

        try {
            // 1. Resolve Script Path
            if ("INLINE".equalsIgnoreCase(job.getScriptSource())) {
                // Determine extension. Default .sh
                String ext = ".sh";
                if (job.getDockerImage() != null && job.getDockerImage().contains("jdk")) {
                    ext = ".java";
                }
                executionScriptPath = Files.createTempFile("script-", ext);
                Files.writeString(executionScriptPath, job.getScriptContent());
                isTempFile = true;
            } else {
                // FILE or UPLOAD
                if (job.getScriptPath() == null || job.getScriptPath().isEmpty()) {
                    throw new RuntimeException("Script Path is missing for FILE/UPLOAD source");
                }
                executionScriptPath = Path.of(job.getScriptPath());
            }

            // 2. Build Execution Command (Docker)
            // Mount script to /app/script.ext
            String fileName = executionScriptPath.getFileName().toString();
            String mountPoint = "/app/" + fileName;

            // Simple heuristics for runner
            String image = job.getDockerImage();
            if (image == null || image.isEmpty())
                image = "ubuntu"; // Default

            String[] command;
            if (image.contains("jdk") || image.contains("java")) {
                // Java Single File Source Code
                command = new String[] { "java", mountPoint };
            } else {
                // Assume Shell/Bash
                command = new String[] { "/bin/sh", mountPoint };
            }

            ProcessBuilder pb = new ProcessBuilder(
                    "docker", "run", "--rm",
                    "--name", containerId,
                    "--network", "none",
                    "--cpus", "0.5", "--memory", "128m",
                    "-v", executionScriptPath.toAbsolutePath().toString() + ":" + mountPoint,
                    image);

            // Append command args to docker run
            for (String c : command) {
                pb.command().add(c);
            }

            pb.redirectErrorStream(true);
            Process process = pb.start();

            // Capture output
            String output;
            try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()))) {
                output = reader.lines().collect(Collectors.joining("\n"));
            }

            boolean finished = process.waitFor(60, TimeUnit.SECONDS);
            if (!finished) {
                process.destroyForcibly();
                run.setStatus(JobStatus.FAILED);
                run.setOutputLog(output + "\n[SYSTEM] Timeout. Job killed.");
                run.setExitCode(-1);
            } else {
                run.setExitCode(process.exitValue());
                run.setStatus(run.getExitCode() == 0 ? JobStatus.SUCCESS : JobStatus.FAILED);
                run.setOutputLog(output);
            }

        } catch (Exception e) {
            run.setStatus(JobStatus.FAILED);
            run.setOutputLog("[SYSTEM_ERROR] " + e.getMessage());
        } finally {
            run.setEndTime(LocalDateTime.now());
            jobRunRepository.save(run);
            // Cleanup temp file only if created
            if (isTempFile && executionScriptPath != null) {
                try {
                    Files.deleteIfExists(executionScriptPath);
                } catch (IOException ignored) {
                }
            }
            cleanupContainer(containerId);
        }
    }

    private void cleanupContainer(String containerId) {
        try {
            new ProcessBuilder("docker", "rm", "-f", containerId).start().waitFor();
        } catch (Exception ignored) {
        }
    }
}
