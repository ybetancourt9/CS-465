import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from '../models/trip';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {
  private readonly http = inject(HttpClient);
  private readonly tripsUrl = 'http://localhost:3000/api/trips';

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
}
