import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationsSubject = new BehaviorSubject<Notification[]>([]);
  public notifications$ = this.notificationsSubject.asObservable();
  private notificationId = 0;

  constructor() {}

  success(message: string, duration: number = 5000): void {
    this.show(message, 'success', duration);
  }

  error(message: string, duration: number = 5000): void {
    this.show(message, 'error', duration);
  }

  warning(message: string, duration: number = 5000): void {
    this.show(message, 'warning', duration);
  }

  info(message: string, duration: number = 5000): void {
    this.show(message, 'info', duration);
  }

  private show(
    message: string,
    type: 'success' | 'error' | 'warning' | 'info',
    duration: number
  ): void {
    const notification: Notification = {
      id: `notification-${++this.notificationId}`,
      type,
      message,
      duration,
      timestamp: new Date(),
    };

    const currentNotifications = this.notificationsSubject.value;
    this.notificationsSubject.next([...currentNotifications, notification]);

    if (duration > 0) {
      setTimeout(() => this.remove(notification.id), duration);
    }
  }

  remove(id: string): void {
    const currentNotifications = this.notificationsSubject.value.filter(
      (n) => n.id !== id
    );
    this.notificationsSubject.next(currentNotifications);
  }

  clear(): void {
    this.notificationsSubject.next([]);
  }
}
