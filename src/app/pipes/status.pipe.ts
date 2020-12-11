import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusFilter',
  pure: false
})
export class StatusPipe implements PipeTransform {

  transform(users: any[], statusSearch: any[]): any {
    if (!users) {
      return [];
    };

    if (!statusSearch) {
      return users;
    }

    let newArr = users.filter(e => {
      return statusSearch.includes(e.status);
    });
    return newArr;
  }

}
