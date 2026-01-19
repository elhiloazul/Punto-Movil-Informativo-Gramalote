import { Component } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { ActivityService } from '../../services/activity.service';
import { Activity } from '../../models/activity.model';
import { RouterModule } from '@angular/router';
import { LoggerService } from '../../core/logger/logger.service';
import { TutorialService } from '../../services/tutorial.service';
import { driver } from 'driver.js';
import { UserProgressService } from '../../services/user-progress.service';

@Component({
  selector: 'app-menu',
  imports: [
    FooterComponent,
    RouterModule
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {

  activities: Activity[] = [];
  protected audio?: HTMLAudioElement;

  private voiceMap: Record<string, string> = {
    bienvenida: 'audio/menu/bienvenida.mp3',
  };

  constructor(
    private activityService: ActivityService, 
    private logger: LoggerService, 
    private tutorialService: TutorialService,
    private userProgressService: UserProgressService,
  ) { }
  
  ngOnInit() {
    this.activities = this.activityService.getActivities();

    if (!this.userProgressService.isMenuSeen()) {
      this.saySequence(
        ['bienvenida'],
        () => this.startTutorial()
      );
    } else {
      this.playAudio(undefined, 'audio/actividades/modulo-2/slide-11.mp3');
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

    this.audio.play().catch(err => {
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
    const steps = this.tutorialService.stepsTutorialsMenu;
    let currentStepIndex = 0;

    const driverObj = driver({
      popoverClass: 'driverjs-theme',
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
