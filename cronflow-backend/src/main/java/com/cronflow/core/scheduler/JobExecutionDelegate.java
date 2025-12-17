package com.cronflow.core.scheduler;

import com.cronflow.core.service.JobRunnerService;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class JobExecutionDelegate implements Job {

    @Autowired
    private JobRunnerService jobRunnerService;

    @Override
    public void execute(JobExecutionContext context) throws JobExecutionException {
        Long jobId = context.getJobDetail().getJobDataMap().getLong("jobId");
        if (jobId != null) {
            // Run the job logic
            // Note: JobRunnerService handles its own exception logging
            jobRunnerService.executeJob(jobId);
        }
    }
}
