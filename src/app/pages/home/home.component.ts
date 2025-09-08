import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { OpenaiService } from '../../services/openai.service';
import { FormsModule } from '@angular/forms';
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { TutorialService } from '../../services/tutorial.service';
import { FooterComponent } from '../../components/footer/footer.component';
import { VoiceService } from '../../services/voice.service';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    MatIconModule,
    FormsModule,
    FooterComponent

  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  volume: number = 1;
  startExperienced: boolean = true;
  isName: boolean = false;
  name: string = "";
  error: string = "";

  constructor(private openaiService: OpenaiService, private tutorialService: TutorialService, private cd: ChangeDetectorRef, private voiceService: VoiceService) { }


  ngOnInit(): void {
    //this.hablarOpenAI("Bienvenido al punto móvil informativo de Gramalote. Aquí encontrarás información relevante sobre nuestra comunidad, eventos y servicios disponibles. Explora las diferentes secciones para mantenerte informado y conectado con lo que sucede en Gramalote. ¡Gracias por visitarnos!");
  }

  hablarOpenAI(text: string) {
    this.openaiService.speakDirect(text).then(blob => {
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audio.play();
    });
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

    let currentStep = 0;

    const driverObj = driver({
      popoverClass: 'driverjs-theme',
      onHighlightStarted: (element) => {
        const step = steps[currentStep];
        if (element && element.classList.contains(step.element.replace('.', ''))) {
          this.voiceService.speak(step.text, () => {
            currentStep++;
            if (currentStep < steps.length) {
              driverObj.highlight(steps[currentStep]);
            } else {
              driverObj.destroy();
              this.startExperienced = false;
              this.isName = true;
              this.cd.markForCheck();
              this.listeningName();
            }
          });
        }
      }
    });

    // 👇 empieza desde el primer paso
    driverObj.highlight(steps[currentStep]);
  }

  listeningName() {
    this.voiceService.startListening((text: string) => {
      this.name = text;
      console.log("Nombre reconocido:", this.name);
      this.voiceService.speak("Acabas de decir que te llamas " + this.name + ".");
    });

    this.voiceService.error$.subscribe(err => {
      if (err === "no-speech") {
        this.voiceService.speak("No te he escuchado, por favor intenta de nuevo.", () => {
          this.listeningName();
        });
      }
    });
  }


}
