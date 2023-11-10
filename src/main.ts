import './polyfills';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

enableProdMode();

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));

// /// <reference types="@angular/localize" />

// import './polyfills.ts';

// import { enableProdMode } from '@angular/core';
// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// import { AppModule } from './app/app.module';

// platformBrowserDynamic()
//   .bootstrapModule(AppModule)
//   .then((ref) => {
//     // Ensure Angular destroys itself on hot reloads.
//     //co z tym?
//     // if (window['ngRef']) {
//     //   window['ngRef'].destroy();
//     // }
//     // window['ngRef'] = ref;
//     // Otherise, log the boot error
//   })
//   .catch((err) => console.error(err));
