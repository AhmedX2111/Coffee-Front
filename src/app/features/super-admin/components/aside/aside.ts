import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-aside',
  imports: [RouterModule],
  templateUrl: './aside.html',
  styleUrl: './aside.css',
})
export class Aside {
  menuItems = [
    { label: 'Dashboard', icon: 'ph-squares-four', route: 'dashboard' },
    { label: 'Branches', icon: 'ph-map-pin', route: 'branches' },
    { label: 'Products', icon: 'ph-package', route: 'products' },
    { label: 'Categories', icon: 'ph-coffee', route: 'categories' },
    { label: 'Addons', icon: 'ph-list-plus', route: 'addon-list' },
    { label: 'Staff & Roles', icon: 'ph-users', route: 'staff-list' },
    { label: 'Orders', icon: 'ph-receipt', route: 'orders' },
  ];
}
