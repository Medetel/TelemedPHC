import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'filterTrialBalance'
})
export class FilterTrialBalancePipe implements PipeTransform {  

  transform(arr: any[], prop: string, value: string, method: any): any {
    if (arr) {
      if (!value) {
        return arr
      } else {
        return arr.filter(obj => this.filter(obj[prop], value, method))
      }
    } else {
      return []
    }
  }

  filter(source: string, target: string, method: any): boolean {

    switch (method) {
      case 'includes': return source.includes(target)
      case 'equal': return source === target
      case 'not-equal': return source !== target
    }
  }

}
