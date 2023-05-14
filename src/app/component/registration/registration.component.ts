import { Component, ViewEncapsulation } from '@angular/core';
import { UtilsService } from 'src/utils/utils.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  encapsulation: ViewEncapsulation.Emulated

})
export class RegistrationComponent {
  firstname : string;
  lastname: string;
  username: string;
  password: string;
  submitted = false;
  showLoader = false;

  constructor( private utilsService  :UtilsService){}

  onSignInClick() {
    this.submitted = true;
    let userObj = {
      username : this.username,
      password : this.password,
      firstname : this.firstname,
      lastname : this.lastname
    }
    this.utilsService.saveObjects("register", userObj).subscribe(
      {
        next: (data)=>{
          this.utilsService.handleSuccessMessage("Registration Successfull");
        },
        error : (er) => {
          this.utilsService.handleErrorMessage(er);
        }
      }
    )
  }
}
