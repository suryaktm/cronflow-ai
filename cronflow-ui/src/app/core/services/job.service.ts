import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getJobs(projectId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/projects/${projectId}/jobs`, { headers: this.getHeaders() });
  }

  createJob(projectId: number, job: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/projects/${projectId}/jobs`, job, { headers: this.getHeaders() });
  }

  runJob(jobId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/jobs/${jobId}/run`, {}, { headers: this.getHeaders() });
  }

  uploadScript(file: File): Observable<{ path: string }> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{ path: string }>(`${this.apiUrl}/scripts/upload`, formData, { headers: this.getHeaders() });
  }

  deleteJob(projectId: number, jobId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/projects/${projectId}/jobs/${jobId}`, { headers: this.getHeaders() });
  }
}
