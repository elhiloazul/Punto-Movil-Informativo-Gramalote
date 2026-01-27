import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { TutorialService } from '../../services/tutorial.service';
import { FooterComponent } from '../../components/footer/footer.component';
import { VoiceService } from '../../services/voice.service';
import { MicComponent } from '../../components/mic/mic.component';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { LoggerService } from '../../core/logger/logger.service';
import { UserProgress } from '../../models/user-progress.model';
import { UserProgressService } from '../../services/user-progress.service';
import { InactivityService } from '../../services/inactivity.service';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    MatIconModule,
    FormsModule,
    FooterComponent,
    MicComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {

  protected audio?: HTMLAudioElement;

  volume = 1;
  startExperienced = true;

  currentStep: 'name' | 'age' | 'address' | null = null;

  name = '';
  age = '';
  address = '';

  micVisible = false;
  maxAttempts = 5;
  attempts = 0;
  text = '';

  private errorSub?: Subscription;
  private listeningSub?: Subscription;

  private messages = {
    name: { audio: 'audio/form/nombre.mp3' },
    age: { audio: 'audio/form/edad.mp3' },
    address: { audio: 'audio/form/direccion.mp3' }
  };

  private voiceMap: Record<string, string> = {
    saludo: 'audio/home/saludo-tico.mp3',
    iniciarTutorial1: 'audio/home/tutorial-1.mp3',
    iniciarTutorial2: 'audio/home/tutorial-2.mp3',
    conocer_de_ti: 'audio/home/conocer-de-ti.mp3',
  };

  menuConfigFromHome = {
    home: { enabled: false, route: '/home' },
    repeat: { enabled: false, route: '/menu' },
    gamepad: { enabled: false, route: '/activity/modulo-6' },
    volume: { enabled: true }
  }

  constructor(
    private tutorialService: TutorialService,
    private cd: ChangeDetectorRef,
    private voiceService: VoiceService,
    private router: Router,
    private logger: LoggerService,
    private userProgressService: UserProgressService,
    private inactivityService: InactivityService,
  ) {}

  /* =========================
     INIT
  ========================== */

  ngOnInit() {
    this.text = 'Ven a conocerme dando un toque al botón de iniciar experiencia.';
    if(this.userProgressService.isIntroSeen() ){
      this.router.navigate(['/menu']);
    }
    
    this.listeningSub = this.voiceService.isListening$.subscribe(isListening => {
      this.micVisible = isListening;
      this.cd.detectChanges();
    });
  }

  /* =========================
     AUDIO HELPERS
  ========================== */

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

  /* =========================
     SECUENCIAS DE VOZ
  ========================== */

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

  /* =========================
     CLICK INICIO
  ========================== */

  clickSound() {
    this.text = '¡Hola! Mi nombre es Tico, un mono tití que está muy feliz de conocerte. Antes de empezar, aprendamos a usar la pantalla. En la parte inferior encontrarás diferentes símbolos, los cuales harán de esta una experiencia más fácil.';
    this.saySequence(
      ['saludo', 'iniciarTutorial1', 'iniciarTutorial2'],
      () => this.startTutorial()
    );
  }

  /* =========================
     TUTORIAL
  ========================== */

  startTutorial() {
    const steps = this.tutorialService.stepsTutorialsFooter;
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
            this.startExperienced = false;
            this.currentStep = 'name';
            this.text = '¿Cuál es tu nombre? Dilo en voz alta, por favor.';
            this.cd.markForCheck();

            this.saySequence(['conocer_de_ti'], () => {
              this.playAudio(() => this.listenFor('name'), this.messages.name.audio);
            });
          }
        }, step.audio);
      }
    });

    driverObj.highlight(steps[currentStepIndex]);
  }

  /* =========================
     LISTEN
  ========================== */

  listenFor(field: 'name' | 'age' | 'address') {
    this.voiceService.startListening((text: string) => {
      if (text && text.trim() !== '') {
        this.attempts = 0;
        (this as any)[field] = text;

        // 🔑 cerrar escucha al obtener texto
        this.voiceService.stopListening();
      }
    });

    this.errorSub?.unsubscribe();

    this.errorSub = this.voiceService.error$.subscribe(err => {
      if (err === 'no-speech') {
        this.attempts++;
        this.retryListen(field);
      }
    });
  }

  private retryListen(field: 'name' | 'age' | 'address') {
    if (this.attempts < this.maxAttempts) {
      this.playAudio(() => {
        setTimeout(() => this.listenFor(field), 800);
      }, 'audio/errors/no-escuche.mp3');
    } else {
      this.playAudio(undefined, 'audio/errors/stop.mp3');
      this.voiceService.stopListening();
    }
  }

  /* =========================
     CONFIRM FLOW
  ========================== */

  confirmStep() {
    if (this.currentStep === 'name') {
      this.currentStep = 'age';
      this.text = '¿Cuál es tu edad? Dilo en voz alta, por favor.';
      this.playAudio(() => this.listenFor('age'), this.messages.age.audio);

    } else if (this.currentStep === 'age') {
      this.currentStep = 'address';
      this.text = '¿Dónde vives? Dilo en voz alta, por favor.';
      this.playAudio(() => this.listenFor('address'), this.messages.address.audio);

    } else if (this.currentStep === 'address') {
      this.currentStep = null;
      this.userProgressService.markIntroSeen();
      // Revisar una mejor solución para iniciar a contar el tiempo
      // de inactividad ya que al iniciar el servicio, solo inicia
      // si la intro ya fue vista.
      this.inactivityService.start();
      this.router.navigate(['/menu']);
    }

    this.cd.markForCheck();
  }

  cancelStep() {
    if (!this.currentStep) return;

    this.saySequence(['repetir'], () => {
      this.playAudio(
        () => this.listenFor(this.currentStep!),
        this.messages[this.currentStep!].audio
      );
    });
  }

  /* =========================
     DESTROY
  ========================== */

  ngOnDestroy() {
    this.stopAudio();
    this.voiceService.stopListening();
    this.errorSub?.unsubscribe();
    this.listeningSub?.unsubscribe();
  }
}
