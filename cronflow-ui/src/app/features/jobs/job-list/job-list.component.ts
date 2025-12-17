import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobService } from '../../../core/services/job.service';
import { ProjectStateService } from '../../../core/services/project-state.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.css'
})
export class JobListComponent implements OnInit {
  jobs: any[] = [];
  projectId: number = 0;

  constructor(private jobService: JobService, private projectState: ProjectStateService) { }

  ngOnInit(): void {
    this.projectState.projectId$.subscribe(id => {
      this.projectId = id;
      if (id > 0) this.loadJobs();
    });
  }

  loadJobs(): void {
    this.jobService.getJobs(this.projectId).subscribe(data => {
      this.jobs = data;
    });
  }

  onRun(jobId: number): void {
    this.jobService.runJob(jobId).subscribe({
      next: () => alert('Job Triggered Successfully!'),
      error: (err) => alert('Failed to run job: ' + err.message)
    });
  }

  onDelete(jobId: number): void {
    if (confirm('Are you sure you want to delete this job?')) {
      this.jobService.deleteJob(this.projectId, jobId).subscribe({
        next: () => {
          this.loadJobs(); // Refresh list
        },
        error: (err) => alert('Failed to delete job: ' + err.message)
      });
    }
  }
}
