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
  private readonly xsmall = Breakpoints.XSmall;
  private readonly small = Breakpoints.Small;
  private readonly medium = Breakpoints.Medium;
  private readonly large = Breakpoints.Large;
  private readonly xlarge = Breakpoints.XLarge;
  public readonly SMALL_HEIGHT = 640;
  public readonly MEDIUM_HEIGHT = 800;
  public readonly ROW_HEIGHT_INPUT_PX = '75px';
  public readonly GUTTER_SIZE_INPUT_PX = '10px';

  private screenWidth = toSignal(this.breakpointObserver.observe([this.xsmall, this.small, this.medium, this.large, this.xlarge]));
  public smallWidth = computed(() => this.screenWidth()?.breakpoints[this.small] || this.screenWidth()?.breakpoints[this.xsmall]);
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
