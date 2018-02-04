import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';

/*
 * Platform and Environment providers/directives/pipes
 */
import { environment } from 'environments/environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { AppState, InternalStateType } from './app.service';

import '../styles/styles.scss';
import '!style-loader!css-loader!bootstrap/dist/css/bootstrap.min.css';

import {
  NgbModule
} from '@ng-bootstrap/ng-bootstrap';

import {
  LandingComponent,
} from './landing/landing.component';

import {
  RegistrationComponent,
} from './registration/registration.component';

import {
  SponsorsComponent,
  SponsorRegistrationComponent,
} from './sponsors';

import {
  ModalService,
  AccountService,
} from './services';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

// Application wide providers
const APP_PROVIDERS = [
  AppState
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    LandingComponent,
    RegistrationComponent,
    SponsorsComponent,
    SponsorRegistrationComponent,
  ],
  /**
   * Import Angular's modules.
   */
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(ROUTES, {
      useHash: Boolean(history.pushState) === true,
      preloadingStrategy: PreloadAllModules
    }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
  ],
  /**
   * Expose our Services and Providers into Angular's dependency injection.
   */
  providers: [
    environment.ENV_PROVIDERS,
    APP_PROVIDERS,
    ModalService,
    AccountService,
  ]
})
export class AppModule {}
