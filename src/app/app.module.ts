import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardModule } from 'primeng/card';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { EmployeeModule } from './employee/employee.module';
import { FullLayoutModule } from './full-layout/full-layout.module';
import { HomeComponent } from './component/home/home.component';
import { RegistrationComponent } from './component/registration/registration.component';
import { LoginComponent } from './component/login/login.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AuthGuardService } from 'src/utils/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegistrationComponent,
    LoginComponent,
    NotFoundComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    CardModule,
    EmployeeModule,
    FullLayoutModule,
  ],
  providers: [MessageService , ConfirmationService , AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
