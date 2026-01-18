import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MenuComponent } from './pages/menu/menu.component';
import { ActivityOrchestratorComponent } from './pages/activity-orchestrator/activity-orchestrator.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'menu', component: MenuComponent },
  {
    path: 'activity/:id',
    component: ActivityOrchestratorComponent,
    data: { renderMode: 'client' },
  },
  { path: '**', redirectTo: 'home' },
];
