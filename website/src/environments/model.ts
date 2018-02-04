import { NgModuleRef } from '@angular/core';

export interface Environment {
  production: boolean;
  ENV_PROVIDERS: any;
  showDevModule: boolean;
  firebase: any;
  decorateModuleRef(modRef: NgModuleRef<any>): NgModuleRef<any>;
}
