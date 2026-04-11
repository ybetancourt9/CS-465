import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Trip } from '../../models/trip';
import { TripDataService } from '../../services/trip-data.service';

@Component({
  selector: 'app-trip-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './trip-form.component.html',
  styleUrl: './trip-form.component.css'
})
export class TripFormComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly tripDataService = inject(TripDataService);

  readonly tripForm = this.formBuilder.nonNullable.group({
    code: ['', Validators.required],
    name: ['', Validators.required],
    length: ['', Validators.required],
    start: ['', Validators.required],
    resort: ['', Validators.required],
    perPerson: ['', Validators.required],
    image: ['', Validators.required],
    description: ['', Validators.required],
    body: ['', Validators.required]
  });

  isEditMode = false;
  isLoading = false;
  isSaving = false;
  message = '';
  private originalTripCode = '';

  ngOnInit(): void {
    const tripCode = this.route.snapshot.paramMap.get('tripCode');

    if (!tripCode) {
      return;
    }

    this.isEditMode = true;
    this.originalTripCode = tripCode;
    this.loadTrip(tripCode);
  }

  get heading(): string {
    return this.isEditMode ? 'Edit Trip' : 'Add Trip';
  }

  get submitLabel(): string {
    return this.isEditMode ? 'Save Changes' : 'Create Trip';
  }

  saveTrip(): void {
    if (this.tripForm.invalid) {
      this.tripForm.markAllAsTouched();
      return;
    }

    this.isSaving = true;
    this.message = '';

    const tripPayload = this.buildTripPayload();
    const request = this.isEditMode
      ? this.tripDataService.updateTrip(this.originalTripCode, tripPayload)
      : this.tripDataService.addTrip(tripPayload);

    request.subscribe({
      next: () => {
        this.isSaving = false;
        void this.router.navigate(['/trips']);
      },
      error: (error) => {
        this.isSaving = false;
        this.message = error.error?.message ?? 'Unable to save the trip.';
      }
    });
  }

  private loadTrip(tripCode: string): void {
    this.isLoading = true;
    this.message = '';

    this.tripDataService.getTrip(tripCode).subscribe({
      next: (trip) => {
        this.tripForm.setValue({
          code: trip.code,
          name: trip.name,
          length: trip.length,
          start: this.toDateInputValue(trip.start),
          resort: trip.resort,
          perPerson: trip.perPerson,
          image: trip.image,
          description: trip.description,
          body: trip.body
        });
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.message = error.error?.message ?? 'Unable to load the trip.';
      }
    });
  }

  private buildTripPayload(): Trip {
    const formValue = this.tripForm.getRawValue();

    return {
      ...formValue,
      start: new Date(formValue.start).toISOString()
    };
  }

  private toDateInputValue(dateValue: string): string {
    return new Date(dateValue).toISOString().slice(0, 10);
  }
}
