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
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
          })
        ], { optional: true }),

        group([
          query(':leave', [
            animate('500ms ease', style({ opacity: 0 }))
          ], { optional: true }),

          query(':enter', [
            style({ opacity: 0 }),
            animate('500ms ease', style({ opacity: 1 }))
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
