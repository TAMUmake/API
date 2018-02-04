import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService, AccountService } from '../services';
import { Account } from '../models';
@Component({
    templateUrl: './sponsors.component.html',
})
export class SponsorsComponent implements OnInit {
    public signin: Account = new Account();
    public signup: Account = new Account();

    @ViewChild('login') public loginModal;
    @ViewChild('judge') public judge;

    constructor(
        private accountService: AccountService,
        private modalService: ModalService,
        private router: Router,
    ) {}

    public ngOnInit() {
        this.accountService.logout();
    }

    public open(content) {
        this.modalService.openModal(content);
    }

    public openSignIn() {
        this.modalService.openModal(this.loginModal);
    }

    public routeToRegistration() {
        this.modalService.closeModal();
        this.router.navigate(['/sponsorSignup']);
    }

    public loginSponsor() {
        this.accountService.loginUser(this.signin).then( (res) => {
            console.log(res);
            let uid = res.uid;
            this.accountService.getSponsorStatus(uid).subscribe( (res) => {

                if (res.json()) {
                    this.modalService.openModal(this.judge);
                } else {
                    this.router.navigate(['/sponsors']);
                }
            });
        }, (err) => {
            console.log('Error logging in.');
        });
    }
}
