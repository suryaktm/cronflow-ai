import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProjectStateService {
    // Default to 1, but should ideally be loaded from backend or local storage
    private projectIdSubject = new BehaviorSubject<number>(1);

    projectId$ = this.projectIdSubject.asObservable();

    constructor() {
        // Optionally recover from localStorage
        const saved = localStorage.getItem('lastProjectId');
        if (saved) {
            this.projectIdSubject.next(parseInt(saved, 10));
        }
    }

    setProjectId(id: number): void {
        this.projectIdSubject.next(id);
        localStorage.setItem('lastProjectId', id.toString());
    }

    getCurrentProjectId(): number {
        return this.projectIdSubject.value;
    }
}
