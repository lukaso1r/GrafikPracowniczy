import { Pipe, PipeTransform } from '@angular/core';
import { WorkerClass } from '../model/WorkerClass';

@Pipe({
  name: 'workerSearch',
})
export class WorkerSearchPipe implements PipeTransform {

  transform(list: WorkerClass[], ...args: string[]): WorkerClass[] {
    let searchBy = args[0];
    let criteria=args[1];
    console.log('criteria',criteria)
    if(criteria==undefined) criteria='nazwisko';
    searchBy=searchBy.toLowerCase();
    if (!searchBy) { return list; }
    const filteredList = list.filter(el => {
      if(criteria=='nazwisko'){
        if (el.Nazwisko.toLowerCase().includes(searchBy)) { return el; }
      }
      return null;
    });
    return filteredList;
  }

}
