import { Component, inject, signal, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../services/dashboard.service';
import { DashboardOverviewResponse, MetricCardDto, RecentOrderDto } from '../../models/dashboard.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dashboard implements OnInit {
  private dashboardService = inject(DashboardService);

  // Signals for state management
  isLoading = signal(true);
  error = signal<string | null>(null);
  overview = signal<DashboardOverviewResponse | null>(null);

  // Computed derived values
  metrics = signal<MetricCardDto[]>([]);
  recentOrders = signal<RecentOrderDto[]>([]);

  ngOnInit(): void {
    this.loadDashboardData();
  }

  private loadDashboardData(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.dashboardService.getDashboardOverview().subscribe({
      next: (response) => {
        const data = response.data;
        if (!data) {
          this.error.set('Invalid dashboard data received');
          this.isLoading.set(false);
          return;
        }

        this.overview.set(data);
        
        // Set metric cards
        this.metrics.set([
          { ...data.totalRevenue, icon: 'ph-trend-up' },
          { ...data.activeBranches, icon: 'ph-building' },
          { ...data.totalOrders, icon: 'ph-shopping-cart' },
          { ...data.totalProducts, icon: 'ph-cube' },
        ]);
        
        // Set recent orders
        this.recentOrders.set(data.recentOrders || []);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set('Failed to load dashboard data. Please try again.');
        console.error('Dashboard error:', err);
        this.isLoading.set(false);
      },
    });
  }

  getStatusBadgeColor(status: string): string {
    return `badge-${status.toLowerCase()}`;
  }

  getMetricPercentageColor(changePercent: number): string {
    return changePercent >= 0 ? 'text-green-600' : 'text-red-600';
  }

  getMetricIcon(iconClass: string): string {
    const iconMap: { [key: string]: string } = {
      'ph-trend-up': '📈',
      'ph-building': '🏢',
      'ph-shopping-cart': '🛒',
      'ph-cube': '📦',
    };
    return iconMap[iconClass] || '💼';
  }
}

