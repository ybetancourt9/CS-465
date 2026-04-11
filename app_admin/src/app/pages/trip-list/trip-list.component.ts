import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TripCardComponent } from '../../components/trip-card/trip-card.component';
import { Trip } from '../../models/trip';
import { TripDataService } from '../../services/trip-data.service';

@Component({
  selector: 'app-trip-list',
  standalone: true,
  imports: [CommonModule, RouterLink, TripCardComponent],
  templateUrl: './trip-list.component.html',
  styleUrl: './trip-list.component.css'
})
export class TripListComponent implements OnInit {
  private readonly tripDataService = inject(TripDataService);

  trips: Trip[] = [];
  isLoading = true;
  message = '';

  ngOnInit(): void {
    this.loadTrips();
  }

  loadTrips(): void {
    this.isLoading = true;
    this.message = '';

    this.tripDataService.getTrips().subscribe({
      next: (trips) => {
        this.trips = trips;
        this.isLoading = false;

        if (trips.length === 0) {
          this.message = 'No trips are available yet. Add a new trip to get started.';
        }
      },
      error: (error) => {
        this.trips = [];
        this.isLoading = false;
        this.message = error.error?.message ?? 'Unable to load trips right now.';
      }
    });
  }

  handleDelete(trip: Trip): void {
    const shouldDelete = confirm(`Delete ${trip.name}?`);

    if (!shouldDelete) {
      return;
    }

    this.tripDataService.deleteTrip(trip.code).subscribe({
      next: () => {
        this.trips = this.trips.filter((currentTrip) => currentTrip.code !== trip.code);

        if (this.trips.length === 0) {
          this.message = 'No trips are available yet. Add a new trip to get started.';
        }
      },
      error: (error) => {
        this.message = error.error?.message ?? 'Unable to delete the trip.';
      }
    });
  }

  trackByCode(_index: number, trip: Trip): string {
    return trip.code;
  }
}
