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
  Registration,
} from '../models';

@Component({
  selector: 'registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit{
  public isSubmitting: boolean = false;

  @ViewChild('received') public receivedModal;

  public registration: Registration = new Registration();

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

  public register(registration: Registration) {
    this.isSubmitting = true;
    let uid = this.accountService.getCurrentUser().uid;
    let url = 'https://us-central1-tamum-c5fdd.cloudfunctions.net/register';
    let data = {application: registration, uid};
    this.http.post(url, data).subscribe( (result) => {
      this.modalService.openModal(this.receivedModal).result.then( () => {
        this.router.navigate(['']);
      }, () => {
        this.router.navigate(['']);
      });
    }, (error) => {
      console.log(error);
      this.isSubmitting = false;
    });
  }

}