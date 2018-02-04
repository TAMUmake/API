// Import Angular Dependencies
import { Injectable } from '@angular/core';

// Import Angular Modal
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

// Import RXJS
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ModalService {
  private currentOpenModalRef: NgbModalRef = undefined;
  constructor(private ngbModal: NgbModal) {};

  public openModal(modal: any) {
    if (this.currentOpenModalRef !== undefined) {
      this.currentOpenModalRef.close();
      this.currentOpenModalRef = undefined;
    }
    this.currentOpenModalRef = this.ngbModal.open(modal);
    return this.currentOpenModalRef;
  }

  public closeModal() {
    if (this.currentOpenModalRef !== undefined) {
      this.currentOpenModalRef.close();
      this.currentOpenModalRef = undefined;
    }
  }
}
