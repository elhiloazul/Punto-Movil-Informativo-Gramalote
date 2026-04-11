import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UserProgressService } from './user-progress.service';
import { catchError, EMPTY } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SessionService {
  private readonly http = inject(HttpClient);
  private readonly userProgress = inject(UserProgressService);

  private readonly sessionsUrl = `${environment.apiUrl}/kiosk/v1/sessions`;

  sync() {
    const progress = this.userProgress.get();

    if (!progress.sessionId || !progress.name) {
      return;
    }

    const activities = Object.fromEntries(
      Object.entries(progress.activities).map(([id, ap]) => [
        id,
        {
          name: ap.name,
          lastSlideIndex: ap.lastSlideIndex,
          completed: ap.completed,
          completedAt: ap.completedAt
            ? new Date(ap.completedAt).toISOString()
            : undefined,
        },
      ]),
    );

    const body = {
      id: progress.sessionId,
      name: progress.name,
      age: progress.age,
      neighborhood: progress.neighborhood,
      activities,
      startedAt: new Date(progress.startedAt).toISOString(),
      endedAt: new Date().toISOString(),
    };

    this.http
      .patch(this.sessionsUrl, body)
      .pipe(catchError(() => EMPTY))
      .subscribe();
  }
}
