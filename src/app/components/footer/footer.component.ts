import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FooterConfig } from './models/footer.model';
import { InactivityService } from '../../services/inactivity.service';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, FormsModule, RouterModule, MatIconModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  
  @Input() config: FooterConfig = {
    home: { enabled: true, route: '/home' },
    repeat: { enabled: true, route: '/menu' },
    gamepad: { enabled: true, route: '/activity/modulo-6' },
    volume: { enabled: true }
  };

  
  volume: number = 1;
  showVolumeControl = false;
  resetModalVisible = false;

  constructor(
    private router: Router,
    private inactivity: InactivityService,
  ) {}

  ngOnInit() {
  }

  toggleVolumeControl() {
    this.showVolumeControl = !this.showVolumeControl;
  }

  updateVolume() {
    setTimeout(() => {
      this.showVolumeControl = false;
    }, 3000);
  }

  navigateIfEnabled(enabled?: boolean, route?: string) {
    if (!enabled || !route) return;
    this.router.navigate([route]);
  }

  continue() {
    this.resetModalVisible = false;
    this.inactivity.confirmStillHere();
  }

  restart() {
    this.resetModalVisible = false;
    this.inactivity.restart();
    this.router.navigate(['/']);
  }

  showResetModal() {
    if(!this.config.home?.enabled) return;
    this.resetModalVisible = true;
  }
    
}
