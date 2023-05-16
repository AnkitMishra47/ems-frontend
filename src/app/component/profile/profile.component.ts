import { Component, OnInit } from '@angular/core';
import { User } from './profile.model';
import { AuthService } from 'src/utils/auth.service';
import { UtilsService } from 'src/utils/utils.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  user : User = new User();

  constructor(private utilService : UtilsService){

  }

  ngOnInit(): void {
    this.user = this.utilService.loggedInUserObj;
    console.log(this.user);
    
  }
}
