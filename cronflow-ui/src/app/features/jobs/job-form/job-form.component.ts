import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JobService } from '../../../core/services/job.service';
import { ProjectStateService } from '../../../core/services/project-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './job-form.component.html',
  styleUrl: './job-form.component.css'
})
export class JobFormComponent implements OnInit {
  name = '';
  scriptContent = 'public class Script {\n    public static void main(String[] args) {\n        System.out.println("Hello from CronFlow!");\n    }\n}';
  dockerImage = 'openjdk:17-alpine';
  isLoading = false;
  errorMessage = '';

  projectId = 1;

  // Scheduling
  scheduleType = 'none'; // none, daily, cron
  scheduleTime = '00:00';
  cronExpressionInput = '';

  // Script
  scriptSource = 'INLINE'; // INLINE, FILE, UPLOAD
  scriptPathInput = '';
  selectedFile: File | null = null;

  constructor(
    private jobService: JobService,
    private projectStateService: ProjectStateService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.projectStateService.projectId$.subscribe(id => {
      this.projectId = id;
    });
    // Set default enabled to true if schedule is set? 
  }

  onFileSelected(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  onSubmit(): void {
    this.isLoading = true;
    this.errorMessage = '';

    // 1. Calculate Cron
    let cron = '';
    let enabled = false;
    if (this.scheduleType === 'daily') {
      const parts = this.scheduleTime.split(':');
      if (parts.length === 2) {
        cron = `0 ${parseInt(parts[1])} ${parseInt(parts[0])} * * ?`;
        enabled = true;
      }
    } else if (this.scheduleType === 'cron') {
      cron = this.cronExpressionInput;
      enabled = true;
    }

    // 2. Prepare Payload Construction
    const submitJob = (path: string) => {
      const job = {
        name: this.name,
        scriptContent: this.scriptContent,
        dockerImage: this.dockerImage,
        cronExpression: cron,
        enabled: enabled,
        scriptSource: this.scriptSource,
        scriptPath: path || this.scriptPathInput
      };

      this.jobService.createJob(this.projectId, job).subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/jobs']);
        },
        error: (err) => {
          console.error(err);
          this.isLoading = false;
          this.errorMessage = 'Failed to create job: ' + (err.error?.message || err.statusText || err.message);
        }
      });
    };

    // 3. Handle Upload if needed
    if (this.scriptSource === 'UPLOAD' && this.selectedFile) {
      this.jobService.uploadScript(this.selectedFile).subscribe({
        next: (res) => submitJob(res.path),
        error: (err) => {
          this.isLoading = false;
          this.errorMessage = 'Upload failed: ' + err.message;
        }
      });
    } else {
      submitJob(this.scriptPathInput);
    }
  }
}
