import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  imports: [DatePipe],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
date: Date = new Date();
}
