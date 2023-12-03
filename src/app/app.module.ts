import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { LoginWorkerComponent } from './login-worker/login-worker.component';
import { LoginManagerComponent } from './login-manager/login-manager.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListWorkersComponent } from './list-workers/list-workers.component';
import { AddWorkerComponent } from './add-worker/add-worker.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    LoginWorkerComponent,
    LoginManagerComponent,
    ListWorkersComponent,
    AddWorkerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
