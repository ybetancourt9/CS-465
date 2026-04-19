import { Routes } from '@angular/router';
import { AddTripComponent } from './add-trip/add-trip.component';
import { EditTripComponent } from './edit-trip/edit-trip.component';
import { TripListComponent } from './pages/trip-list/trip-list.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'trips' },
  { path: 'trips', component: TripListComponent },
  { path: 'trips/new', component: AddTripComponent },
  { path: 'trips/:tripCode/edit', component: EditTripComponent },
  { path: '**', redirectTo: 'trips' }
];
