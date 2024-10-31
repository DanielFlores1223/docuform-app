import { Injectable, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

interface ScreenOptions {
  sm: number | string;
  md?: number | string;
  lg?: number | string;
}

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {
  private breakpointObserver = inject(BreakpointObserver);
  private readonly small = Breakpoints.Small;
  private readonly medium = Breakpoints.Medium;
  private readonly large = Breakpoints.Large;
  private readonly xlarge = Breakpoints.XLarge;

  private screenWidth = toSignal(this.breakpointObserver.observe([this.small, this.medium, this.large, this.xlarge]));
  public smallWidth = computed(() => this.screenWidth()?.breakpoints[this.small]);
  public mediumWidth = computed(() => this.screenWidth()?.breakpoints[this.medium]);
  public largeWidth = computed(() => this.screenWidth()?.breakpoints[this.large] || this.screenWidth()?.breakpoints[this.xlarge]);

  public responsive(options: ScreenOptions) {
    return computed(() => {
      if (this.largeWidth()) return options.lg ?? options.md ?? options.sm;
      if (this.mediumWidth()) return options.md ?? options.sm;
      return options.sm;
    });
  }

}
