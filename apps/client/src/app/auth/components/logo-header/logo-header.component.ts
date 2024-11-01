import { Component, Input, input, signal } from '@angular/core';

@Component({
  selector: 'auth-logo-header',
  templateUrl: './logo-header.component.html',
  styleUrl: './logo-header.component.css'
})
export class LogoHeaderComponent {
  public text = input('');
}
