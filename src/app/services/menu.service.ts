import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { MenuActivity } from '../models/menu-activity.model';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private readonly menuUrl = `${environment.apiUrl}/kiosk/v1/menu`;

  readonly menuActivities = signal<MenuActivity[]>([]);
  readonly isLoading = signal(false);

  constructor(private readonly http: HttpClient) {}

  loadMenu() {
    this.isLoading.set(true);
    return this.http.get<MenuActivity[]>(this.menuUrl).pipe(
      tap((activities) => {
        const sorted = [...activities].sort((a, b) => a.menuOrder - b.menuOrder);
        this.menuActivities.set(sorted);
        this.isLoading.set(false);
      }),
    );
  }
}
