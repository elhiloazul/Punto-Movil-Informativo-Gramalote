import { Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { VideosComponent } from '../pages/videos/videos.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent, data: { animation: 'home' } },
  { path: 'videos', component: VideosComponent, data: { animation: 'videos' } },
  { path: '**', redirectTo: 'home' }
];
