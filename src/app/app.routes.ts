import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MenuComponent } from './pages/menu/menu.component';
import { ActivityOrchestratorComponent } from './pages/activity-orchestrator/activity-orchestrator.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent, data: { animation: 'home' } },
  { path: 'menu', component: MenuComponent, data: { animation: 'menu' } },
  { path: 'activity/:id', component: ActivityOrchestratorComponent },
  { path: '**', redirectTo: 'home' }
];
