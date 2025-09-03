import { Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { VideosComponent } from '../pages/videos/videos.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent, data: { animation: 'HomePage' } },
  { path: 'videos', component: VideosComponent, data: { animation: 'AboutPage' } },
  { path: '**', redirectTo: 'home' }
];
