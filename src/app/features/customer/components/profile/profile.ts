import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { signal } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Profile {
  user = signal({
    name: 'Ahmed Mohamed',
    email: 'ahmed@example.com',
    phone: '+1 234 567 8900',
    address: '123 Coffee Street, Brew City',
    memberSince: 'January 2024',
    totalOrders: 12,
    loyaltyPoints: 450,
  });

  isEditing = signal(false);
}
