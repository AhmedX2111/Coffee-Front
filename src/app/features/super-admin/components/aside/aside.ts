import { Component, OnInit, OnDestroy, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-aside',
  imports: [RouterLink, RouterLinkActive, CommonModule],
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { Logout } from '../../../auth/components/logout/logout';

@Component({
  selector: 'app-aside',
  imports: [RouterLink ,RouterLinkActive, Logout],
  templateUrl: './aside.html',
  styleUrl: './aside.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Aside implements OnInit, OnDestroy {
  isOpen = signal(false);
  screenWidth = signal(window.innerWidth);
  isSmallScreen = computed(() => this.screenWidth() < 768);

  private destroy$ = new Subject<void>();

  menuItems = [
    { label: 'Dashboard', icon: 'ph-squares-four', active: false, link: '/super-admin/dashboard' },
    { label: 'Branches', icon: 'ph-map-pin', active: false, link: '/super-admin/branches' },
    { label: 'Products', icon: 'ph-package', active: false, link: '/super-admin/products' },
    { label: 'Categories', icon: 'ph-coffee', active: false, link: '/super-admin/categories' },
    { label: 'Addons', icon: 'ph-list-plus', active: true, link: '/super-admin/addon-list' },
    { label: 'Staff & Roles', icon: 'ph-users', active: false, link: '/super-admin/staff-list' },
    { label: 'Orders', icon: 'ph-receipt', active: false, link: '/super-admin/branch-order' },
  ];

  ngOnInit() {
    fromEvent(window, 'resize')
      .pipe(
        debounceTime(150),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.screenWidth.set(window.innerWidth);
        if (window.innerWidth >= 768) {
          this.isOpen.set(false);
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleSidebar() {
    this.isOpen.update(val => !val);
  }

  closeSidebar() {
    this.isOpen.set(false);
  }
}