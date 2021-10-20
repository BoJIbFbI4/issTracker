import { Pipe, PipeTransform } from '@angular/core';
import { lowerCase, startCase } from 'lodash';

@Pipe({
  name: 'readError',
  pure: true,
})
export class ReadErrorPipe implements PipeTransform {
  transform(errors: any, field: string = 'Input'): string {
    let errorMsg = '';
    // console.warn(errors);
    if (!!errors?.required) {
      errorMsg = 'You must enter a ' + lowerCase(field);
    }
    if (!!errors?.minlength) {
      errorMsg = startCase(field) + ' is too short';
    }
    if (!!errors?.maxlength) {
      errorMsg = startCase(field) + ' is too long';
    }
    if (!!errors?.uniqueType) {
      errorMsg = startCase(field) + ' is not unique';
    }
    if (!!errors?.heightValidator) {
      errorMsg = 'Base height must be lower then height';
    }
    if (!!errors?.wrongTimeZone) {
      errorMsg = 'Wrong ' + field;
    }
    if (!!errors?.email) {
      errorMsg = startCase(field) + ' is invalid';
    }
    if (!!errors?.unknown) {
      errorMsg = errors?.unknown.saveError || 'Unexpected error';
    }
    if (!!errors?.exist) {
      errorMsg = 'User is already registered';
    }
    if (!!errors?.pattern) {
      errorMsg = 'Sorry, only letters (a-z), numbers (0-9), and periods (.) are allowed.';
    }

    // console.warn(form.invalid, field + ' =>', errorMsg);
    return errorMsg;
  }
}
