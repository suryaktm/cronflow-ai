import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: '📊' },
    { label: 'Jobs', path: '/jobs', icon: '⚡' },
    { label: 'History', path: '/history', icon: '📜' },
    { label: 'Settings', path: '/settings', icon: '⚙️' },
  ];

  isProfileMenuOpen = false;

  constructor(private authService: AuthService, private router: Router) { }

  toggleProfileMenu(): void {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

  logout(): void {
    // Clear token
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    // Navigate to login
    this.router.navigate(['/login']);
  }
}
