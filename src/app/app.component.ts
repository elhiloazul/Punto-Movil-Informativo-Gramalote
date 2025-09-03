import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  group
} from '@angular/animations';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        // Estado inicial de la nueva vista
        query(':enter', [
          style({ opacity: 0, transform: 'translateX(100%)' })
        ], { optional: true }),

        // Estado inicial de la vista que sale
        query(':leave', [
          style({ opacity: 1, transform: 'translateX(0)' })
        ], { optional: true }),

        group([
          // Animación de salida
          query(':leave', [
            animate('400ms ease', style({ opacity: 0, transform: 'translateX(-100%)' }))
          ], { optional: true }),

          // Animación de entrada
          query(':enter', [
            animate('400ms ease', style({ opacity: 1, transform: 'translateX(0)' }))
          ], { optional: true })
        ])
      ])
    ])
  ]
})
export class AppComponent {
  title = 'Punto-Movil-Informativo-Gramalote';

  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'] || 'default';
  }

}
