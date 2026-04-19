import { Component } from '@angular/core';
import { TripFormComponent } from '../pages/trip-form/trip-form.component';

@Component({
  selector: 'app-add-trip',
  standalone: true,
  imports: [TripFormComponent],
  templateUrl: './add-trip.component.html',
  styleUrl: './add-trip.component.css'
})
export class AddTripComponent {}
