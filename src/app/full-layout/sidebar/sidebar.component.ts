// sidebar.component.ts
import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { MegaMenuItem } from 'primeng/api';
import { AuthService } from 'src/utils/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class SidebarComponent implements OnInit{
  items: MegaMenuItem[];
  verticalItems: MegaMenuItem[];
  isSideBarComponent : boolean ;

  isDesktop = false;

  constructor(private authService : AuthService){}

  ngOnInit() {

    this.isSideBarComponent = true;

    console.log(this.authService.getUser());
    
    this.checkScreenSize();

    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        routerLink: '/home'
      },
      {
        label: 'Profile',
        icon: 'pi pi-user',
        routerLink: '/profile'
      },
      {
        label : 'Employee',
        icon: 'pi pi-users',
        items : [
          [
            this.getEmployeeMenuItem()
          ]
        ]
      },
      {
        label: 'Logout',
        icon: 'pi pi-fw pi-power-off',
        command : this.onLogoutClick,
        routerLink : '/login'
      },
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
            this.getEmployeeMenuItem(),
            {
              label: 'User Settings',
              items : [
                {
                  label : 'Logout',
                  icon: 'pi pi-fw pi-power-off',
                  command : this.onLogoutClick,
                  routerLink : '/login'
                },
                {
                  label: 'Profile',
                  icon: 'pi pi-user',
                  routerLink: '/profile'
                },
              ]
            },
          ]
        ]
      }
    ]
  }

  private onLogoutClick = () => {
    this.authService.logout();
    console.log("isLogout called");
  }

  @HostListener('window:resize', ['$event'])
  checkScreenSize(event: any = null) {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    if (screenWidth >= 768) {
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