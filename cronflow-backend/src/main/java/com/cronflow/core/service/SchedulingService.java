package com.cronflow.core.service;

import com.cronflow.core.entity.ScriptJob;
import com.cronflow.core.repository.ScriptJobRepository;
import com.cronflow.core.scheduler.JobExecutionDelegate;
import jakarta.annotation.PostConstruct;
import org.quartz.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.TimeZone;

@Service
public class SchedulingService {

    private static final Logger logger = LoggerFactory.getLogger(SchedulingService.class);

    @Autowired
    private Scheduler scheduler;

    @Autowired
    private ScriptJobRepository scriptJobRepository;

    @PostConstruct
    public void init() {
        try {
            logger.info("Initializing Scheduling Service...");
            scheduler.clear(); // Clear ephemeral RAM jobs on restart to avoid duplicates if any persist
            List<ScriptJob> activeJobs = scriptJobRepository.findAll();
            // Ideally filter by isEnabled=true at DB level, but findAll is fine for MVP
            // size

            for (ScriptJob job : activeJobs) {
                if (job.isEnabled() && job.getCronExpression() != null && !job.getCronExpression().isEmpty()) {
                    scheduleJob(job);
                }
            }
        } catch (SchedulerException e) {
            logger.error("Error initializing scheduler", e);
        }
    }

    public void scheduleJob(ScriptJob job) {
        try {
            if (job.getCronExpression() == null || job.getCronExpression().isEmpty()) {
                return;
            }

            JobDetail jobDetail = JobBuilder.newJob(JobExecutionDelegate.class)
                    .withIdentity("job_" + job.getId(), "project_" + job.getProject().getId())
                    .usingJobData("jobId", job.getId())
                    .build();

            Trigger trigger = TriggerBuilder.newTrigger()
                    .withIdentity("trigger_" + job.getId(), "project_" + job.getProject().getId())
                    .withSchedule(CronScheduleBuilder.cronSchedule(job.getCronExpression())
                            .inTimeZone(TimeZone.getDefault()))
                    .build();

            scheduler.scheduleJob(jobDetail, trigger);
            logger.info("Scheduled job {} with cron {}", job.getId(), job.getCronExpression());

        } catch (SchedulerException e) {
            logger.error("Failed to schedule job " + job.getId(), e);
            throw new RuntimeException("Failed to schedule job", e);
        }
    }

    public void unscheduleJob(Long jobId, Long projectId) {
        try {
            JobKey jobKey = new JobKey("job_" + jobId, "project_" + projectId);
            scheduler.deleteJob(jobKey);
            logger.info("Unscheduled job {}", jobId);
        } catch (SchedulerException e) {
            logger.error("Failed to unschedule job " + jobId, e);
        }
    }

    public void rescheduleJob(ScriptJob job) {
        unscheduleJob(job.getId(), job.getProject().getId());
        if (job.isEnabled()) {
            scheduleJob(job);
        }
    }
}
