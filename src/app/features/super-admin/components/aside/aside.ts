import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-aside',
  imports: [RouterLink ,RouterLinkActive],
  templateUrl: './aside.html',
  styleUrl: './aside.css',
})
export class Aside {
  
menuItems = [
    { label: 'Dashboard', icon: 'ph-squares-four', active: false , link :'/dashboard' },
    { label: 'Branches', icon: 'ph-map-pin', active: false , link :'/super-admin/branchs' },
    { label: 'Products', icon: 'ph-package', active: false , link :'/super-admin/products' },
    { label: 'Categories', icon: 'ph-coffee', active: false , link :'/super-admin/categories' },
    { label: 'Addons', icon: 'ph-list-plus', active: true , link :'/super-admin/addon-list' },
    { label: 'Staff & Roles', icon: 'ph-users', active: false , link :'/super-admin/staff-roles' },
    { label: 'Orders', icon: 'ph-receipt', active: false , link :'/super-admin/orders' },
  ];
}
