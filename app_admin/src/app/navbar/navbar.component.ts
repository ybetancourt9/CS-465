import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  private readonly authenticationService = inject(AuthenticationService);
  private readonly router = inject(Router);

  readonly title = 'Travlr Getaways Admin';

  isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  currentUserName(): string {
    return this.authenticationService.getCurrentUser()?.name ?? '';
  }

  logout(): void {
    this.authenticationService.logout();
    void this.router.navigate(['/login']);
  }
}
