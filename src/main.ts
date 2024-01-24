/// <reference types="@angular/localize" />
import '@angular/localize/init';
import '@angular/common/locales/global/pl';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';




platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
