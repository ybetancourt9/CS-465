import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Trip } from '../../models/trip';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './trip-card.component.html',
  styleUrl: './trip-card.component.css'
})
export class TripCardComponent {
  private readonly authenticationService = inject(AuthenticationService);

  @Input({ required: true }) trip!: Trip;
  @Output() deleteTrip = new EventEmitter<Trip>();

  get imageUrl(): string {
    return `http://localhost:3000/images/${this.trip.image}`;
  }

  onDelete(): void {
    this.deleteTrip.emit(this.trip);
  }

  isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }
}
