import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface AIResponse {
    content: string;
}

@Injectable({
    providedIn: 'root'
})
export class AiService {
    private apiUrl = `${environment.apiUrl}/ai`;

    constructor(private http: HttpClient) { }

    generateScript(prompt: string, language: string): Observable<AIResponse> {
        return this.http.post<AIResponse>(`${this.apiUrl}/generate`, { prompt, language });
    }

    explainScript(script: string): Observable<AIResponse> {
        return this.http.post<AIResponse>(`${this.apiUrl}/explain`, { prompt: script }); // Reusing prompt field
    }
}
