import { ChangeDetectionStrategy, Component, ElementRef, Input } from '@angular/core';
import { ThemePalette } from '@angular/material/core/common-behaviors/color';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner/progress-spinner';

@Component({
  selector: 'custom-spinner',
  templateUrl: './custom-spinner.component.html',
  styleUrls: ['./custom-spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomSpinnerComponent {
  @Input() parent: string = '';
  @Input() color: ThemePalette = 'accent';
  @Input() value: number = 50;
  @Input() strokeWidth: number = 2;
  @Input() mode: ProgressSpinnerMode = 'indeterminate';
  _reRender!: boolean;

  constructor(readonly elRef: ElementRef) {}

  @Input() set render(reRender: boolean) {
    this._reRender = reRender;
  }
}
