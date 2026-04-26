import { Component } from '@angular/core';
import { BranchSelection } from '../components/branch-selection/branch-selection';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '../../../shared/components/navbar/navbar';

@Component({
  selector: 'app-customer',
  imports: [RouterOutlet, BranchSelection, Navbar],
  templateUrl: './customer.html',
  styleUrl: './customer.css',
})
export class Customer {

}
