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
import { WorkerSearchPipe } from './pipes/worker-search.pipe';
import { FormsModule } from '@angular/forms';
import { ShiftsViewComponent } from './shifts-view/shifts-view.component';
import { MouseDirective } from './dyrektywy/mouse.directive';
import { WorkerShiftsComponent } from './worker-shifts/worker-shifts.component';
import { MessageListComponent } from './messenger/message-list/message-list.component';
import { MessageFormComponent } from './messenger/message-form/message-form.component';
import { MessageFilterPipe } from './pipes/message-filter.pipe';



@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    LoginWorkerComponent,
    LoginManagerComponent,
    ListWorkersComponent,
    AddWorkerComponent,
    WorkerSearchPipe,
    ShiftsViewComponent,
    MouseDirective,
    WorkerShiftsComponent,
    MessageListComponent,
    MessageFormComponent,
    MessageFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
