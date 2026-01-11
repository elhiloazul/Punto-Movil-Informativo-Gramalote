import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { OpenaiService } from '../../services/openai.service';
import { FormsModule } from '@angular/forms';
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { TutorialService } from '../../services/tutorial.service';
import { FooterComponent } from '../../components/footer/footer.component';
import { VoiceService } from '../../services/voice.service';
import { MicComponent } from '../../components/mic/mic.component';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

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

  volume: number = 1;
  startExperienced: boolean = true;

  currentStep: 'name' | 'age' | 'address' | null = null;

  name: string = "";
  age: string = "";
  address: string = "";

  micVisible: boolean = false;
  maxAttempts: number = 5;
  attempts: number = 0;
  errorSub!: Subscription;

  private messages = {
    name: {
      question: "¿Cuál es tu nombre?",
      confirm: (val: string) => `Acabas de decir que te llamas ${val}.`
    },
    age: {
      question: "¿Cuántos años tienes?",
      confirm: (val: string) => `Acabas de decir que tienes ${val} años.`
    },
    address: {
      question: "¿Dónde vives?",
      confirm: (val: string) => `Acabas de decir que vives en ${val}.`
    }
  };

  constructor(
    private openaiService: OpenaiService,
    private tutorialService: TutorialService,
    private cd: ChangeDetectorRef,
    private voiceService: VoiceService,
    private router: Router
  ) { }

  ngOnInit() {
    this.voiceService.isListening$.subscribe(isListening => {
      this.micVisible = isListening;
      this.cd.markForCheck();
    });
  }

  ngOnDestroy() {
    if (this.errorSub) this.errorSub.unsubscribe();
  }

  clickSound() {
    this.voiceService.speak(
      "Hola, soy Tico, un mono Titi que está emocionado por conocerte. Estoy muy feliz de que estés aquí, y tengo mucho que contarte, pero primero, aprendamos a usar la pantalla",
      () => {
        this.startTutorial();
      }
    );
  }

  startTutorial() {
    const steps = this.tutorialService.stepsTutorials;
    let currentStepIndex = 0;

    const driverObj = driver({
      popoverClass: 'driverjs-theme',
      onHighlightStarted: (element) => {
        const step = steps[currentStepIndex];
        if (element && element.classList.contains(step.element.replace('.', ''))) {
          this.voiceService.speak(step.text, () => {
            currentStepIndex++;
            if (currentStepIndex < steps.length) {
              driverObj.highlight(steps[currentStepIndex]);
            } else {
              driverObj.destroy();
              this.startExperienced = false;
              this.currentStep = "name";
              this.cd.markForCheck();
              this.voiceService.speak(this.messages.name.question, () => {
                this.listenFor('name');
              });
            }
          });
        }
      }
    });

    driverObj.highlight(steps[currentStepIndex]);
  }

  listenFor(field: 'name' | 'age' | 'address') {
    this.micVisible = true;
    this.cd.markForCheck();

    this.voiceService.startListening((text: string) => {
      if (text && text.trim() !== "") {
        this.micVisible = false;
        this.cd.markForCheck();
        this.attempts = 0;

        (this as any)[field] = text;

        this.voiceService.speak(this.messages[field].confirm(text));
      }
    });

    if (this.errorSub) this.errorSub.unsubscribe();

    this.errorSub = this.voiceService.error$.subscribe(err => {
      if (err === "no-speech") {
        this.attempts++;
        console.log("Intento fallido:", this.attempts);
        this.retryListen(field);
      }
    });
  }

  private retryListen(field: 'name' | 'age' | 'address') {
    if (this.attempts < this.maxAttempts) {
      this.voiceService.speak("No te he escuchado, intenta de nuevo.", () => {
        setTimeout(() => this.listenFor(field), 800);
      });
    } else {
      this.voiceService.speak("He intentado escucharte varias veces y no pude. Voy a detenerme por ahora.");
      this.micVisible = false;
      this.cd.markForCheck();
      this.voiceService.stopListening();
    }
  }

  confirmStep() {
    if (this.currentStep === "name") {
      this.currentStep = "age";
      this.voiceService.speak(this.messages.age.question, () => {
        this.listenFor("age");
      });
    } else if (this.currentStep === "age") {
      this.currentStep = "address";
      this.voiceService.speak(this.messages.address.question, () => {
        this.listenFor("address");
      });
    } else if (this.currentStep === "address") {
      this.currentStep = null;
      this.voiceService.speak("¡Perfecto! Gracias por compartir tu información.");
      this.router.navigate(['/menu']);
    }
    this.cd.markForCheck();
  }

  cancelStep() {
    if (this.currentStep) {
      this.voiceService.speak("Vamos a repetirlo, por favor dime de nuevo.");
      this.listenFor(this.currentStep);
    }
  }

}
