import { Routes } from '@angular/router';
import { LandingComponent } from 'app/landing/landing.component';
import { RegistrationComponent } from 'app/registration/registration.component';
import { SponsorsComponent, SponsorRegistrationComponent } from 'app/sponsors';

export const ROUTES: Routes = [
  { path: '', component: LandingComponent },
  // { path: 'registration', component: RegistrationComponent},
  { path: 'sponsors', component: SponsorsComponent},
  { path: 'sponsorSignup', component: SponsorRegistrationComponent},
  { path: '**', redirectTo: '' },
];
