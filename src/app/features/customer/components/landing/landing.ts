import { Component, inject, signal, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductCatalog } from '../product-catalog/product-catalog';
import { ProductBrowsingService } from '../../../../core/services/product-browsing.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule, ProductCatalog],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Landing implements OnInit {
  private router = inject(Router);
  productService = inject(ProductBrowsingService);

  showTimePicker = signal(false);
  selectedHour = signal('12');
  selectedMinute = signal('00');
  selectedPeriod = signal('PM');

  hours = Array.from({ length: 12 }, (_, i) => 
    String(i + 1).padStart(2, '0')
  );
  minutes = ['00', '15', '30', '45'];

  ngOnInit(): void {
    // Load categories if needed
    // this.productService.getCategories();
  }

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
