import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ACTIVITIES } from '../data';
import { Activity, ActivitySlide } from '../models/activity.model';
import { SlideDescribeMineralsGameComponent } from '../components/slide-custom-component/games/slide-describe-minerals-game/slide-describe-minerals-game.component';
import { SlideSarchingMineralsGameComponent } from '../components/slide-custom-component/games/slide-sarching-minerals-game/slide-sarching-minerals-game.component';
import { SlidePhotoCaptureGameComponent } from '../components/slide-custom-component/games/slide-photo-capture-game/slide-photo-capture-game.component';
import { SlideContactFormComponent } from '../components/slide-custom-component/slide-contact-form/slide-contact-form.component';

interface KioskSlide {
  id: string;
  type: string;
  order: number;
  [key: string]: unknown;
}

interface KioskActivity {
  id: string;
  name: string;
  slides: KioskSlide[];
}

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  private readonly http = inject(HttpClient);

  private readonly componentRegistry: Record<string, unknown> = {
    SlideContactFormComponent,
    SlideSarchingMineralsGameComponent,
    SlideDescribeMineralsGameComponent,
    SlidePhotoCaptureGameComponent,
  };

  getById(id: string): Activity | undefined {
    return ACTIVITIES.find((activity) => activity.id === id);
  }

  getActivityById(id: string): Observable<Activity> {
    return this.http
      .get<KioskActivity>(`${environment.apiUrl}/kiosk/v1/activities/${id}`)
      .pipe(map((data) => this.mapToActivity(data)));
  }

  private mapToActivity(data: KioskActivity): Activity {
    return {
      id: data.id,
      title: data.name,
      slides: data.slides.map((slide) => this.mapSlide(slide)),
    };
  }

  private mapSlide(slide: KioskSlide): ActivitySlide {
    const { id, type, order: _order, ...content } = slide;

    if (type === 'custom') {
      return {
        id,
        type: 'custom',
        component: this.componentRegistry[content['component'] as string] ?? null,
        audio: content['audio'] as string | undefined,
        backgroundImage: content['backgroundImage'] as string | undefined,
      };
    }

    return { id, type, ...content } as ActivitySlide;
  }
}
