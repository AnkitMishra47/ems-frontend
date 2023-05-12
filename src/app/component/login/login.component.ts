import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
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
