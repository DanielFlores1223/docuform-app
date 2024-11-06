import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { ResponsiveService } from '../../../material/services/responsive.service';
import { NavigationEnd, Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from '../../../auth/services/auth.service';

interface LinksNav {
  name: string;
  path: string;
  iconoName: string;
  onClick: () => void
}

@Component({
  selector: 'shared-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css'
})
export class SideNavComponent implements OnInit {
  public layout = inject(ResponsiveService);
  public router = inject(Router);
  private authService = inject(AuthService);

  @ViewChild('snav')
  public snav!: MatSidenav;

  public links: LinksNav[] = [
    {
      path: '/my-forms/create',
      iconoName: 'note_add',
      name: 'Create a new form',
      onClick: () => {}
    },
    {
      path: '/my-forms/list',
      iconoName: 'view_list',
      name: 'My forms',
      onClick: () => {}

    },
    {
      path: '/auth',
      iconoName: 'logout',
      name: 'Logout',
      onClick: this.authService.logout
    }
  ];

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd)
        this.saveRoute();
    });
  }

  public toggleNav() {
    this.snav.toggle();
  }

  public closeSmallDevice() {
    if(this.snav && !this.layout.smallWidth()) return;

      this.toggleNav();
  }

  public saveRoute() {
    this.authService.urlStore = this.router.url;
  }



}
