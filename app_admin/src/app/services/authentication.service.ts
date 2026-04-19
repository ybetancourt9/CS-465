import { Inject, Injectable } from '@angular/core';
import { AuthResponse } from '../models/auth-response';
import { User } from '../models/user';
import { BROWSER_STORAGE } from '../storage';
import { TripDataService } from './trip-data.service';

interface TokenPayload {
  _id: string;
  email: string;
  name: string;
  exp: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private authResp?: AuthResponse;

  constructor(
    private tripDataService: TripDataService,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) {}

  getToken(): string {
    return this.storage.getItem('travlr-token') ?? '';
  }

  saveToken(token: string): void {
    this.storage.setItem('travlr-token', token);
  }

  logout(): void {
    this.storage.removeItem('travlr-token');
  }

  isLoggedIn(): boolean {
    const token = this.getToken();

    if (!token) {
      return false;
    }

    const payload = this.getTokenPayload(token);

    if (!payload) {
      return false;
    }

    return payload.exp * 1000 > Date.now();
  }

  getCurrentUser(): User | null {
    if (!this.isLoggedIn()) {
      return null;
    }

    const payload = this.getTokenPayload(this.getToken());

    if (!payload) {
      return null;
    }

    return {
      name: payload.name,
      email: payload.email
    };
  }

  login(user: User, password: string): void {
    this.tripDataService.login(user, password).subscribe({
      next: (value) => {
        this.authResp = value;
        this.saveToken(this.authResp.token);
      },
      error: () => {
        this.logout();
      }
    });
  }

  register(user: User, password: string): void {
    this.tripDataService.register(user, password).subscribe({
      next: (value) => {
        this.authResp = value;
        this.saveToken(this.authResp.token);
      },
      error: () => {
        this.logout();
      }
    });
  }

  private getTokenPayload(token: string): TokenPayload | null {
    try {
      const payload = token.split('.')[1];

      if (!payload) {
        return null;
      }

      return JSON.parse(atob(payload)) as TokenPayload;
    } catch {
      return null;
    }
  }
}
