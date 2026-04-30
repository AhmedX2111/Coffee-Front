import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-orders',
  imports: [],
  templateUrl: './search-orders.html',
  styleUrl: './search-orders.css',
})
export class SearchOrders {
@Output() searchChange = new EventEmitter<string>();

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchChange.emit(value);
  }
} 
