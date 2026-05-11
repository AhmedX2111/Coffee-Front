import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-head-staff',
  imports: [],
  templateUrl: './head-staff.html',
  styleUrl: './head-staff.css',
})
export class HeadStaff {
@Output() searchChange = new EventEmitter<string>();

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchChange.emit(value);
  }
}
