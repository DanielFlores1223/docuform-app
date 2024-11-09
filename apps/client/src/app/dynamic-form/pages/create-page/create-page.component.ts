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
  public maxHeighFieldsDiv = computed(() => {
    if(!this.innerHeight()) return 0;

    const px = this.innerHeight()! * 0.3;

    return `max-height: ${px}px`;
  });

  public rowHeightScreen = computed(() => {
    if(!this.innerHeight() || ( this.innerHeight()! && this.innerHeight()! > this.layout.MEDIUM_HEIGHT ))
        return '100vh'

    let screenPorcentagePx: number = this.innerHeight()! * 0.2;

    if(this.innerHeight()! <= this.layout.SMALL_HEIGHT)
      screenPorcentagePx = this.innerHeight()! * 0.3;

    const totalPxScreen = this.innerHeight()! + screenPorcentagePx;

    return `${totalPxScreen}px`
  });

  ngAfterViewInit(): void {
   this.innerHeight.set(window.innerHeight);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    const innerHeight = (event.target as Window).innerHeight;
    this.innerHeight.set(innerHeight);
  }

}
