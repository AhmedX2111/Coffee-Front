import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price',
  standalone: true,
})
export class PricePipe implements PipeTransform {
  transform(value: number, currency: string = 'SAR'): string {
    if (value == null) return '';
    return `${currency} ${value.toFixed(2)}`;
  }
}
