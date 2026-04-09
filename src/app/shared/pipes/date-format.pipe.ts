import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'dateFormat',
  standalone: true,
})
export class DateFormatPipe implements PipeTransform {
  constructor(private datePipe: DatePipe) {}

  transform(value: Date | string, format: string = 'short'): string {
    if (!value) return '';
    const date = typeof value === 'string' ? new Date(value) : value;
    return this.datePipe.transform(date, format) || '';
  }
}
