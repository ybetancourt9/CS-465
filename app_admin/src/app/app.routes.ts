import { Routes } from '@angular/router';
import { TripFormComponent } from './pages/trip-form/trip-form.component';
import { TripListComponent } from './pages/trip-list/trip-list.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'trips' },
  { path: 'trips', component: TripListComponent },
  { path: 'trips/new', component: TripFormComponent },
  { path: 'trips/:tripCode/edit', component: TripFormComponent },
  { path: '**', redirectTo: 'trips' }
];
