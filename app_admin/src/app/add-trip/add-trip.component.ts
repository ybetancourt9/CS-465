import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TripFormComponent } from '../pages/trip-form/trip-form.component';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-add-trip',
  standalone: true,
  imports: [TripFormComponent],
  templateUrl: './add-trip.component.html',
  styleUrl: './add-trip.component.css'
})
export class AddTripComponent implements OnInit {
  private readonly authenticationService = inject(AuthenticationService);
  private readonly router = inject(Router);

  ngOnInit(): void {
    if (!this.authenticationService.isLoggedIn()) {
      void this.router.navigate(['/login']);
    }
  }
}
