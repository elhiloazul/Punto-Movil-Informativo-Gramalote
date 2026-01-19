import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'home',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'menu',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'activity/:id',
    renderMode: RenderMode.Server, // 👈 SSR
  },
  {
    path: '**',
    renderMode: RenderMode.Server,
  },
];
