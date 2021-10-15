import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'demo'
})
export class DemoPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    console.log('demo pipe values: ', value);
    console.log('demo pipe args', args);
    return null;
  }

}
