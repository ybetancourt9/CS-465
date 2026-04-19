import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TripFormComponent } from '../pages/trip-form/trip-form.component';

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [TripFormComponent],
  templateUrl: './edit-trip.component.html',
  styleUrl: './edit-trip.component.css'
})
export class EditTripComponent {
  private readonly route = inject(ActivatedRoute);

  readonly tripCode = this.route.snapshot.paramMap.get('tripCode') ?? '';
}
