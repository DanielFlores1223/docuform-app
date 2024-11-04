import { Component, ViewChild, inject } from '@angular/core';
import { ResponsiveService } from '../../../material/services/responsive.service';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';

interface LinksNav {
  name: string;
  path: string;
  iconoName: string;
}

@Component({
  selector: 'shared-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css'
})
export class SideNavComponent {
  public layout = inject(ResponsiveService);
  public router = inject(Router);

  @ViewChild('snav')
  public snav!: MatSidenav;

  public links: LinksNav[] = [
    {
      path: '/my-forms/create',
      iconoName: 'note_add',
      name: 'Create a new form'
    },
    {
      path: '/my-forms/list',
      iconoName: 'view_list',
      name: 'My forms'
    }
  ];

  public toggleNav() {
    this.snav.toggle();
  }

  public closeSmallDevice() {
    if(this.snav && !this.layout.smallWidth()) return;

      this.toggleNav();
  }



}
