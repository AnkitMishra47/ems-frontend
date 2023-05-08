// sidebar.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
  items: MenuItem[];
  activeItem: MenuItem;

  ngOnInit() {
      this.items = [
          { 
            label: 'Home', 
            icon: 'pi pi-fw pi-home',
            routerLink: '/home'
          },
          { 
            label: 'Employees', 
            icon: 'pi pi-users',
            routerLink: '/employees-list' 
          },
          { 
            label: 'Add Employee', 
            icon: 'pi pi-user-edit',
            routerLink: '/edit-employee/0' 
          },
      ];

      this.activeItem = this.items[0];
  }


}
