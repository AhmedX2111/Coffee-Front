import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Logout } from '../../../auth/components/logout/logout';

@Component({
  selector: 'app-nav',
  imports: [RouterLink, RouterLinkActive, RouterOutlet, Logout],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  isMenuOpen = false;
navItems = [
    { label: 'Active Orders', path: 'active', icon: 'shopping_bag', exact: true },
    { label: 'Ready Orders', path: 'ready-orders', icon: 'check_circle', exact: false },
    { label: 'Completed Orders', path: 'completed-orders', icon: 'verified', exact: false },
  ];
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }
}
