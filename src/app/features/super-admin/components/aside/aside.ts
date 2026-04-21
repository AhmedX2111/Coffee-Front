import { Component } from '@angular/core';

@Component({
  selector: 'app-aside',
  imports: [],
  templateUrl: './aside.html',
  styleUrl: './aside.css',
})
export class Aside {
menuItems = [
    { label: 'Dashboard', icon: 'ph-squares-four', active: false },
    { label: 'Branches', icon: 'ph-map-pin', active: false },
    { label: 'Products', icon: 'ph-package', active: false },
    { label: 'Categories', icon: 'ph-coffee', active: false },
    { label: 'Addons', icon: 'ph-list-plus', active: true },
    { label: 'Staff & Roles', icon: 'ph-users', active: false },
    { label: 'Orders', icon: 'ph-receipt', active: false },
  ];
}
