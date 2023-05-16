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
import { NotFoundComponent } from './component/not-found/not-found.component';
import { AuthGuardService } from 'src/utils/auth.guard';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { ProfileComponent } from './component/profile/profile.component';
import { LayoutModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    ProfileComponent,
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
    LayoutModule,
    JwtModule.forRoot({
      config: {
        tokenGetter:  () => localStorage.getItem('token')
      }
    })
  ],
  providers: [MessageService , ConfirmationService , AuthGuardService , JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
