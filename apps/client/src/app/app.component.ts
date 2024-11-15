import { Component, effect, inject } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { Router } from '@angular/router';
import { AuthStatus } from './auth/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  public authStatusChangedEffect = effect(() => {
    console.log(this.authService.authStatus())

    switch(this.authService.authStatus()) {
      case AuthStatus.checking:
        break;

      case AuthStatus.authenticated:
        const navigateTo = '/my-forms';
        let url = this.authService.urlStore || navigateTo;

        if(url === '/auth/login') url = navigateTo;

        this.router.navigateByUrl(url);
        break;

      case AuthStatus.notAuthenticated:
        break;
    }
  });

}
