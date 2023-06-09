import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardModule } from 'primeng/card';
import { MegaMenuModule } from 'primeng/megamenu';
import { ToastModule } from 'primeng/toast';
import { PasswordModule } from 'primeng/password';

import { FormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SidebarComponent } from './sidebar/sidebar.component';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  declarations: [
    SidebarComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    CardModule,
    MegaMenuModule,
    ToastModule,
    PasswordModule
  ],
  exports:[
    ToastModule,
    PasswordModule,
    ProgressSpinnerModule
  ],
  providers: [MessageService , ConfirmationService , JwtHelperService],
  bootstrap: [SidebarComponent]

})
export class FullLayoutModule { }
