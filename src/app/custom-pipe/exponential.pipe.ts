import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'exponential',
})
export class ExponentialPipe implements PipeTransform {
  transform(value: number, exp: number = 1): number {
    return Math.pow(value, exp);
  }
}

//Impure pipe (detect every change even with objects and arrays)
// @Pipe({
//     name: 'flyingHeroesImpure',
//     pure: false
//   })
