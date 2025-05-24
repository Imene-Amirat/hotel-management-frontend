import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'englishDate',
  standalone: true
})
export class EnglishDatePipe implements PipeTransform {

  transform(value: string): string {
    const date = new Date(value);
    const dateEnglish = new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(date);
    return dateEnglish;
  }

}
