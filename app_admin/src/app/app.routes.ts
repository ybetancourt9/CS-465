import { Routes } from '@angular/router';
import { AddTripComponent } from './add-trip/add-trip.component';
import { authGuard } from './auth.guard';
import { EditTripComponent } from './edit-trip/edit-trip.component';
import { LoginComponent } from './login/login.component';
import { TripListComponent } from './pages/trip-list/trip-list.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'trips', component: TripListComponent, canActivate: [authGuard] },
  { path: 'trips/new', component: AddTripComponent, canActivate: [authGuard] },
  { path: 'trips/:tripCode/edit', component: EditTripComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: 'login' }
];
