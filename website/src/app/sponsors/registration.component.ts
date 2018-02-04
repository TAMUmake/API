import { Component, OnInit, ViewChild } from '@angular/core';
import {
  Http,
  Response,
  Headers,
  RequestOptions,
} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {
  Router
} from '@angular/router';
import {
  AccountService, ModalService,
} from '../services';

import {
  SponsorRegistration, Account,
} from '../models';

@Component({
  templateUrl: './registration.component.html',
})
export class SponsorRegistrationComponent implements OnInit{
  public isSubmitting: boolean = false;

  @ViewChild('received') public receivedModal;

  public registration: SponsorRegistration = new SponsorRegistration();

  constructor(
    private http: Http,
    private accountService: AccountService,
    private modalService: ModalService,
    private router: Router,
  ) {
  }

  public ngOnInit() {
    // this.modalService.openModal(this.receivedModal);
  }

  public register(registration: SponsorRegistration) {
    // console.log('Called register function...');
    this.isSubmitting = true;
    let account = new Account();
    account.email = registration.email;
    account.password = registration.password;

    // console.log('Created account object...', account);
    // console.log('Registering sponsor...');
    this.accountService.registerUser(account).then( (res) => {
      console.log('Successfully created user...', res);
      let uid = res.uid;
      let url = 'https://us-central1-tamum-c5fdd.cloudfunctions.net/sponsorRegister';
      let data = {application: registration, uid};
      data.application.password = null;

      this.http.post(url, data).subscribe( (result) => {
        // console.log('Successfully added metadata...');
        this.modalService.openModal(this.receivedModal).result.then( () => {
          this.router.navigate(['sponsors']);
        }, () => {
          this.router.navigate(['sponsors']);
        });
      }, (error) => {
        console.log(error);
        this.isSubmitting = false;
      });
    }, (err) => {
      console.log('Unable to register sponsor', err);
    });

  }

}