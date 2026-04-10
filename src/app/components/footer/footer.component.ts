import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FooterConfig } from './models/footer.model';
import { InactivityService } from '../../services/inactivity.service';
import { VoiceService } from '../../services/voice.service';
import { SlideNavigationService } from '../../services/slide-navigation.service';
import { environment } from '../../../environments/environment';

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
    gamepad: { enabled: true, route: `/activity/${environment.gamesActivityId}` },
    volume: { enabled: true }
  };

  
  volume: number = 1;
  showVolumeControl = false;
  resetModalVisible = false;

  constructor(
    private router: Router,
    private inactivity: InactivityService,
    private voiceService: VoiceService,
    private slideNavigationService: SlideNavigationService
  ) {}

  ngOnInit() {
    // Inicializar con volumen guardado, con respaldo al sistema global
    const savedVolume = localStorage.getItem('appVolume');
    const globalVolume = (window as any).getGlobalVolume?.() || 1;
    this.volume = savedVolume ? parseFloat(savedVolume) : globalVolume;
    console.log('🎵 Footer inicializado con volumen:', this.volume);
  }

  toggleVolumeControl() {
    this.showVolumeControl = !this.showVolumeControl;
    if (this.showVolumeControl && this.voiceService) {
      // Aplicar volumen actual inmediatamente al mostrar el control
      setTimeout(() => this.updateVolume(), 50);
    }
  }

  private hideVolumeTimeout: any;

  updateVolume() {
    // Usar la función global para controlar el volumen
    if ((window as any).setGlobalVolume) {
      (window as any).setGlobalVolume(this.volume);
    }
    
    // Usar el VoiceService como respaldo
    if (this.voiceService) {
      this.voiceService.setVolume(this.volume);
    }

    // Reiniciar el timeout para ocultar el control
    if (this.hideVolumeTimeout) {
      clearTimeout(this.hideVolumeTimeout);
    }
    this.hideVolumeTimeout = setTimeout(() => {
      this.showVolumeControl = false;
    }, 3000);
  }

  navigateIfEnabled(enabled?: boolean, route?: string) {
    if (!enabled) return;
    
    // Si es el botón de repeat y estamos en una actividad, ir al slide anterior
    if (route === '/menu') {
      this.slideNavigationService.goToPreviousSlide();
      return;
    }
    
    // Para otros botones, navegar normalmente
    if (route) {
      this.router.navigate([route]);
    }
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
