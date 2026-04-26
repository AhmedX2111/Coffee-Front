import { Component, inject, signal, computed } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing {
  private router = inject(Router);

  showTimePicker = signal(false);
  selectedHour = signal('12');
  selectedMinute = signal('00');
  selectedPeriod = signal('PM');

  hours = Array.from({ length: 12 }, (_, i) => 
    String(i + 1).padStart(2, '0')
  );
  minutes = ['00', '15', '30', '45'];

  // Mock featured products - replace with actual service
  featuredProducts = [
    {
      id: 1,
      name: 'Espresso Shot',
      description: 'Rich and bold single shot',
      price: 3.5,
      image: 'https://picsum.photos/seed/espresso/400/300?blur=2'
    },
    {
      id: 2,
      name: 'Cappuccino',
      description: 'Perfect blend of coffee and milk',
      price: 4.5,
      image: 'https://picsum.photos/seed/cappuccino/400/300?blur=2'
    },
    {
      id: 3,
      name: 'Croissant',
      description: 'Fresh butter croissant',
      price: 3.0,
      image: 'https://picsum.photos/seed/croissant/400/300?blur=2'
    },
    {
      id: 4,
      name: 'Chocolate Cake',
      description: 'Decadent chocolate delight',
      price: 5.5,
      image: 'https://picsum.photos/seed/cake/400/300?blur=2'
    }
  ];

  // Mock categories - replace with actual service
  categories = [
    { id: 1, name: 'Coffee', icon: 'local_cafe' },
    { id: 2, name: 'Tea', icon: 'style' },
    { id: 3, name: 'Bakery', icon: 'bakery_dining' },
    { id: 4, name: 'Desserts', icon: 'cake' }
  ];

  confirmPreOrder(): void {
    const time = `${this.selectedHour()}:${this.selectedMinute()} ${this.selectedPeriod()}`;
    console.log(`Pre-order set for: ${time}`);
    this.showTimePicker.set(false);
    this.scrollToProducts();
  }

  navigateToMenu(): void {
    this.scrollToProducts();
  }

  private scrollToProducts(): void {
    const element = document.getElementById('featured');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
