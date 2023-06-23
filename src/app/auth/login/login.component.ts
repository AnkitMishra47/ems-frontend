import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/utils/auth.service';
import { UtilsService } from 'src/utils/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})

export class LoginComponent {
  username: string;
  password: string;
  submitted = false;
  showLoader = false;

  constructor(private router: Router,
    private authService: AuthService) { }

  onLoginClick() {
    this.showLoader = true;
    this.submitted = true;

    const loginObj = {
      username: this.username,
      password: this.password
    }

    this.authService.login(loginObj).subscribe(
      {
        next: (data) => {
          this.authService.handleSuccessMessage("Login Successfull");

          setTimeout(() => {
            this.router.navigate(['home']);
          }, 1200);

          this.showLoader = false;
        },
        error: (er) => {
          this.authService.handleErrorMessage(er);
          this.showLoader = false;
        }
      }
    )
  }
}
