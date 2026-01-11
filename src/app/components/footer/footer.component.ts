import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { VoiceService } from '../../services/voice.service';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, FormsModule, RouterLink, MatIconModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  
  volume: number = 1;
  showVolumeControl = false;

  constructor() {
  }

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
    
}
