import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  stats = [
    { title: 'Total Jobs', value: '12', icon: '📦', color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { title: 'Active Runs', value: '3', icon: '🚀', color: 'text-green-400', bg: 'bg-green-400/10' },
    { title: 'Failed (24h)', value: '1', icon: '⚠️', color: 'text-red-400', bg: 'bg-red-400/10' },
    { title: 'Success Rate', value: '98%', icon: '📈', color: 'text-purple-400', bg: 'bg-purple-400/10' },
  ];

  recentActivity = [
    { job: 'DataSync_Daily', status: 'SUCCESS', time: '2 mins ago', duration: '45s' },
    { job: 'ImageProcess_V2', status: 'RUNNING', time: '5 mins ago', duration: 'Running' },
    { job: 'ReportGen_Email', status: 'FAILED', time: '1 hour ago', duration: '12s' },
    { job: 'Cleanup_Temp', status: 'SUCCESS', time: '3 hours ago', duration: '5s' },
  ];
}
