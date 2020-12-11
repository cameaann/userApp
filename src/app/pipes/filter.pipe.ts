import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appFilter'
})
export class FilterPipe implements PipeTransform {

  transform(users: any[], searchText: string): any {
    if (!users) {
      return [];
    };
    if (!searchText) {
      return users;
    }

    searchText = searchText.toLocaleLowerCase();

    return users.filter(it => {
      return it.phone.toString().toLocaleLowerCase().includes(searchText)||
      it.email.toString().toLocaleLowerCase().includes(searchText)
    });
  }
}


