import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../../core/services/project.service';
import { ProjectStateService } from '../../core/services/project-state.service';

@Component({
  selector: 'app-project-selector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './project-selector.component.html',
  styleUrl: './project-selector.component.css'
})
export class ProjectSelectorComponent implements OnInit {
  projects: any[] = [];
  selectedProjectId: number | null = null;

  constructor(
    private projectService: ProjectService,
    private projectStateService: ProjectStateService
  ) { }

  ngOnInit(): void {
    this.projectService.getProjects().subscribe({
      next: (data) => {
        this.projects = data;
        if (this.projects.length > 0) {
          // Default to first project if not set
          const current = this.projectStateService.getCurrentProjectId();
          // Check if current exists in list
          const exists = this.projects.find(p => p.id === current);
          if (exists) {
            this.selectedProjectId = current;
          } else {
            this.selectedProjectId = this.projects[0].id;
            this.projectStateService.setProjectId(this.selectedProjectId!);
          }
        }
      },
      error: (err) => console.error('Failed to load projects', err)
    });

    // Subscribe to state changes (in case changed elsewhere)
    this.projectStateService.projectId$.subscribe(id => {
      this.selectedProjectId = id;
    });
  }

  onProjectChange(): void {
    if (this.selectedProjectId) {
      console.log('Project switched to:', this.selectedProjectId);
      this.projectStateService.setProjectId(this.selectedProjectId);
    }
  }
}
