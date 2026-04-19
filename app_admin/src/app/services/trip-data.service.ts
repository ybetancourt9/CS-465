import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthResponse } from '../models/auth-response';
import { Trip } from '../models/trip';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:3000/api';
  private readonly tripsUrl = `${this.baseUrl}/trips`;

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.tripsUrl);
  }

  getTrip(tripCode: string): Observable<Trip> {
    return this.http.get<Trip>(`${this.tripsUrl}/${encodeURIComponent(tripCode)}`);
  }

  addTrip(trip: Trip): Observable<Trip> {
    return this.http.post<Trip>(this.tripsUrl, trip);
  }

  updateTrip(originalTripCode: string, trip: Trip): Observable<Trip> {
    return this.http.put<Trip>(
      `${this.tripsUrl}/${encodeURIComponent(originalTripCode)}`,
      trip
    );
  }

  deleteTrip(tripCode: string): Observable<void> {
    return this.http.delete<void>(`${this.tripsUrl}/${encodeURIComponent(tripCode)}`);
  }

  login(user: User, password: string): Observable<AuthResponse> {
    return this.handleAuthApiCall('login', user, password);
  }

  register(user: User, password: string): Observable<AuthResponse> {
    return this.handleAuthApiCall('register', user, password);
  }

  private handleAuthApiCall(
    endpoint: 'login' | 'register',
    user: User,
    password: string
  ): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/${endpoint}`, {
      name: user.name,
      email: user.email,
      password
    });
  }
}
