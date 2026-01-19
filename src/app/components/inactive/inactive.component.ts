import { Component } from '@angular/core';
import { InactivityService } from '../../services/inactivity.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inactive',
  imports: [],
  templateUrl: './inactive.component.html',
  styleUrl: './inactive.component.scss'
})
export class InactiveComponent {
  visible = false;

  constructor(
    private inactivity: InactivityService,
    private router: Router
  ) {}

  ngOnInit() {
    this.inactivity.inactive$.subscribe(() => {
      this.visible = true;
    });
  }

  continue() {
    this.visible = false;
    this.inactivity.confirmStillHere();
  }

  restart() {
    this.visible = false;
    this.inactivity.restart();
    this.router.navigate(['/']);
  }
}
