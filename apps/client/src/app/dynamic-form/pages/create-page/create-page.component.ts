import { AfterViewInit, Component, HostListener, OnInit, computed, inject, signal } from '@angular/core';
import { ResponsiveService } from '../../../material/services/responsive.service';

@Component({
  selector: 'dynamic-form-create',
  templateUrl: './create-page.component.html',
  styleUrl: './create-page.component.css'
})
export class CreatePageComponent implements AfterViewInit {
  public layout = inject(ResponsiveService);
  public innerHeight = signal<number | null>(null);
  public divPx = computed(() => {
    if(!this.innerHeight()) return 0;

    return this.innerHeight()! * 0.2;
  });

  ngAfterViewInit(): void {
   this.innerHeight.set(window.innerHeight);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    const innerHeight = (event.target as Window).innerHeight;
    this.innerHeight.set(innerHeight);
  }

  public setHeightPx() {
    if(!this.innerHeight()) return;


  }

}
