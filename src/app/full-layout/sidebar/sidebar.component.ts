// sidebar.component.ts
import { Component, HostListener, OnInit } from '@angular/core';
import { MenuItem ,MegaMenuItem } from 'primeng/api';
import { UtilsService } from 'src/utils/utils.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
  items: MegaMenuItem[];
  verticalItems: MegaMenuItem[];

  isDesktop = false;

  constructor(){}

  ngOnInit() {

    this.checkScreenSize();

    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        routerLink: '/home'
      },
      {
        label : 'Employee',
        icon: 'pi pi-users',
        items : [
          [
            this.getEmployeeMenuItem()
          ]
        ]
      }
    ];

    this.verticalItems = [
      {
        icon: 'pi pi-align-justify',
        items : [
          [
            {
              label: 'Home',
              items : [
                {
                  label: 'Home',
                  icon: 'pi pi-fw pi-home',
                  routerLink: '/home'
                }
              ]

            },
            this.getEmployeeMenuItem()
          ]
        ]
      }
    ]
  }

  @HostListener('window:resize', ['$event'])
  checkScreenSize(event: any = null) {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    if (screenWidth >= 768 && screenHeight >= 768) {
      this.isDesktop = true;
    } else {
      this.isDesktop = false;
    }
  }
  
  getEmployeeMenuItem() : any{
    return  {
      label: 'Employees',
      items: [
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
      ]
    }
  }
}

