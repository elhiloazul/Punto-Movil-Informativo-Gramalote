import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MenuComponent } from './pages/menu/menu.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent, data: { animation: 'home' } },
  { path: 'menu', component: MenuComponent, data: { animation: 'menu' } },
  { path: '**', redirectTo: 'home' }
];
