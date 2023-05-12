import { Component } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  firstname : string;
  lastname: string;
  username: string;
  password: string;
  submitted = false;
  showLoader = false;

  onSubmit() {
    this.submitted = true;
    if (this.username === 'user' && this.password === 'pass') {
      console.log('Login successful');
    } else {
      console.log('Invalid credentials');
    }
  }
}
