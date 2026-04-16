import { Component } from '@angular/core';
import { BranchSelection } from '../components/branch-selection/branch-selection';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-customer',
  imports: [RouterOutlet , BranchSelection],
  templateUrl: './customer.html',
  styleUrl: './customer.css',
})
export class Customer {

}
