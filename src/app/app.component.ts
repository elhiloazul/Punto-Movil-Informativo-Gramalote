import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InactivityService } from './services/inactivity.service';
import { InactiveComponent } from './components/inactive/inactive.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    InactiveComponent,
  ],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'punto-movil-informativo-gramalote';
  constructor(private inactivity: InactivityService) {}


  ngOnInit() {
    this.inactivity.start();
  }
}