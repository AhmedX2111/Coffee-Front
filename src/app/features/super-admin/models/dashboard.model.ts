export interface MetricCardDto {
  label: string;
  value: string;
  changePercent: number;
  icon?: string;
}

export interface RecentOrderDto {
  orderId: number;
  orderNumber: string;
  customerName: string;
  branchName: string;
  orderDate: string;
  totalPrice: number;
  status: string;
  statusBadge: string;
}

export interface DashboardOverviewResponse {
  totalRevenue: MetricCardDto;
  activeBranches: MetricCardDto;
  totalOrders: MetricCardDto;
  totalProducts: MetricCardDto;
  recentOrders: RecentOrderDto[];
}
