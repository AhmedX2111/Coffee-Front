import { Component, EventEmitter, Output, signal } from '@angular/core';

@Component({
  selector: 'app-date-filter',
  imports: [],
  templateUrl: './date-filter.html',
  styleUrl: './date-filter.css',
})
export class DateFilter {
 selectedDate = signal<string>('');

  @Output() dateChanged = new EventEmitter<string>();

  onDateChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    this.selectedDate.set(value);
    this.dateChanged.emit(value);
  }

  clearDate() {
    this.selectedDate.set('');
    this.dateChanged.emit('');
  }
}
