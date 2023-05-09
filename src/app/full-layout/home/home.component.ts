import { Component, OnInit } from '@angular/core';
import { TITLE } from 'src/utils/constant';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {
  
  title = TITLE;
}
