import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slideAnimations } from './components/slide.animations';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [slideAnimations],
})
export class AppComponent {
  title = 'Punto-Movil-Informativo-Gramalote';

  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'] || 'default';
  }

}
