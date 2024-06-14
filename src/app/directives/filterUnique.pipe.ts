import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterUnique',
  pure: false
})
export class FilterUniquePipe implements PipeTransform {

  transform(value: any, args?: any): any {

    // Remove the duplicate elements
    // tslint:disable-next-line:only-arrow-functions
    const uniqueArray = value.filter(function (el, index, array) {
      return array.indexOf(el) === index;
    });

    return uniqueArray;
  }
}
