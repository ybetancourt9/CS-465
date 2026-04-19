import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TripFormComponent } from '../pages/trip-form/trip-form.component';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [TripFormComponent],
  templateUrl: './edit-trip.component.html',
  styleUrl: './edit-trip.component.css'
})
export class EditTripComponent implements OnInit {
  private readonly authenticationService = inject(AuthenticationService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly tripCode = this.route.snapshot.paramMap.get('tripCode') ?? '';

  ngOnInit(): void {
    if (!this.authenticationService.isLoggedIn()) {
      void this.router.navigate(['/login']);
    }
  }
}
