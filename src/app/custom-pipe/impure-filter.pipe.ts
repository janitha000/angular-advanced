import { Pipe, PipeTransform } from '@angular/core';
import { User } from './custom-pipe.component';

@Pipe({
  name: 'impureFilter',
  pure: false, //remove this to see adding users will not showing
})
export class ImpureFilterPipe implements PipeTransform {
  transform(users: User[], filterVal: number = 20): User[] {
    return users.filter((x) => x.age > filterVal);
  }
}
