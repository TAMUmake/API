/* tslint:disable */
import { enableProdMode, NgModuleRef } from '@angular/core';
import { disableDebugTools } from '@angular/platform-browser';
import { Environment } from './model';

enableProdMode();

export const environment: Environment = {
  production: true,
  showDevModule: true,
  firebase: {
    apiKey: "AIzaSyBElI_1rOjcOaux0w1QtHUiRNIVZDjTSQ8",
    authDomain: "tamumake-dev.firebaseapp.com",
    databaseURL: "https://tamumake-dev.firebaseio.com",
    projectId: "tamumake-dev",
    storageBucket: "tamumake-dev.appspot.com",
    messagingSenderId: "953680291506"
  },
  /** Angular debug tools in the dev console
   * https://github.com/angular/angular/blob/86405345b781a9dc2438c0fbe3e9409245647019/TOOLS_JS.md
   * @param modRef
   * @return {any}
   */
  decorateModuleRef(modRef: NgModuleRef<any>) {
    disableDebugTools();
    return modRef;
  },
  ENV_PROVIDERS: [

  ]
};
