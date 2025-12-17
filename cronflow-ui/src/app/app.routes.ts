import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { JobListComponent } from './features/jobs/job-list/job-list.component';
import { JobFormComponent } from './features/jobs/job-form/job-form.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { HistoryComponent } from './features/history/history.component';
import { SettingsComponent } from './features/settings/settings.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'jobs', component: JobListComponent },
    { path: 'jobs/new', component: JobFormComponent },
    { path: 'history', component: HistoryComponent },
    { path: 'settings', component: SettingsComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
];
