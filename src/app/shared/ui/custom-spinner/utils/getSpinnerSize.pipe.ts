import { Pipe, PipeTransform } from '@angular/core';
import { toInteger } from 'lodash';

@Pipe({
  name: 'spinnerSize',
  pure: true,
})
export class GetSpinnerSizePipe implements PipeTransform {
  transform({ clientWidth, clientHeight }: HTMLElement, _reRender: boolean): number {
    return !!clientWidth && !!clientHeight ? toInteger(clientWidth < clientHeight ? clientWidth : clientHeight) / 3 : 50;
  }
}
