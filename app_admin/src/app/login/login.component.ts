import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  private readonly authenticationService = inject(AuthenticationService);
  private readonly router = inject(Router);

  formError = '';
  credentials = {
    name: '',
    email: '',
    password: ''
  };

  ngOnInit(): void {
    if (this.authenticationService.isLoggedIn()) {
      void this.router.navigate(['/trips']);
    }
  }

  onLoginSubmit(): void {
    this.formError = '';

    if (!this.credentials.email || !this.credentials.password || !this.credentials.name) {
      this.formError = 'All fields are required, please try again.';
      return;
    }

    this.doLogin();
  }

  private doLogin(): void {
    const newUser: User = {
      name: this.credentials.name,
      email: this.credentials.email
    };

    this.authenticationService.login(newUser, this.credentials.password);

    if (this.authenticationService.isLoggedIn()) {
      void this.router.navigate(['/trips']);
      return;
    }

    setTimeout(() => {
      if (this.authenticationService.isLoggedIn()) {
        void this.router.navigate(['/trips']);
      } else {
        this.formError = 'Login failed. Please check your credentials and try again.';
      }
    }, 1000);
  }
}
