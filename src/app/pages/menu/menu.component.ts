import { Component, inject } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { LoggerService } from '../../core/logger/logger.service';
import { MenuService } from '../../services/menu.service';
import { driver } from 'driver.js';
import { UserProgressService } from '../../services/user-progress.service';

@Component({
  selector: 'app-menu',
  imports: [FooterComponent, RouterModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  protected audio?: HTMLAudioElement;

  private menuService = inject(MenuService);

  readonly menuActivities = this.menuService.menuActivities;
  readonly isLoadingMenu = this.menuService.isLoading;

  private voiceMap: Record<string, string> = {
    bienvenida: 'audio/menu/bienvenida.mp3',
  };

  constructor(
    private logger: LoggerService,
    private userProgressService: UserProgressService,
  ) {}

  ngOnInit() {
    this.menuService.loadMenu().subscribe();

    if (!this.userProgressService.isMenuSeen()) {
      this.saySequence(['bienvenida'], () => this.startTutorial());
    } else {
      this.playAudio(undefined, 'audio/actividades/modulo-2/slide-13.mp3');
    }
  }

  saySequence(keys: string[], callback?: () => void): void {
    if (!keys.length) {
      callback?.();
      return;
    }

    const [first, ...rest] = keys;
    this.say(first, () => this.saySequence(rest, callback));
  }

  say(key: string, callback?: () => void): void {
    const audioPath = this.voiceMap[key];

    if (!audioPath) {
      console.warn(`Audio no definido para la clave: ${key}`);
      callback?.();
      return;
    }

    this.playAudio(callback, audioPath);
  }

  private playAudio(callback?: () => void, audioPath?: string) {
    this.stopAudio();

    if (!audioPath) return;

    this.audio = new Audio(audioPath);
    this.audio.currentTime = 0;

    this.audio.play().catch((err) => {
      console.error('Error reproduciendo audio', err);
    });

    this.audio.onended = () => {
      this.logger.debug('Audio terminado');
      if (callback) callback();
    };
  }

  private stopAudio() {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.audio.src = '';
      this.audio = undefined;
    }
  }

  startTutorial() {
    const steps = this.menuActivities()
      .filter((a) => a.menuConfig?.audio || a.menuConfig?.popoverDescription)
      .map((a) => ({
        element: `.activity-${a.id}`,
        audio: a.menuConfig.audio,
        popover: { description: a.menuConfig.popoverDescription },
      }));

    if (!steps.length) {
      this.userProgressService.markMenuSeen();
      return;
    }

    let currentStepIndex = 0;

    const driverObj = driver({
      popoverClass: 'driverjs-theme',
      allowClose: false,
      onHighlightStarted: () => {
        const step = steps[currentStepIndex];

        this.playAudio(() => {
          currentStepIndex++;

          if (currentStepIndex < steps.length) {
            driverObj.highlight(steps[currentStepIndex]);
          } else {
            driverObj.destroy();
            this.userProgressService.markMenuSeen();
          }
        }, step.audio);
      },
    });

    driverObj.highlight(steps[currentStepIndex]);
  }

  activityIsCompleted(activityId: string): boolean {
    return this.userProgressService.isActivityCompleted(activityId);
  }

  ngOnDestroy() {
    this.stopAudio();
  }
}
