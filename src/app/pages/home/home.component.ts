import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { OpenaiService } from '../../services/openai.service';
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    MatIconModule,
    RouterLink

  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  constructor(private openaiService: OpenaiService) { }


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

  speak(text: string, callback?: () => void) {
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "es-419";
    utterance.rate = 1;
    utterance.pitch = 1;

    utterance.onend = () => {
      console.log("✅ Terminó de hablar");
      if (callback) {
        callback();
      }
    };

    speechSynthesis.speak(utterance);
  }

  clickSound() {
    this.speak(
      "Hola, soy Tico, un mono Titi que está emocionado por conocerte. Estoy muy feliz de que estés aquí, y tengo mucho que contarte, pero primero, aprendamos a usar la pantalla",
      () => {
        this.startTutorial();
      }
    );
  }

  startTutorial() {
    const steps = [
      {
        element: '.home-btn',
        text: "Si en cualquier momento debes irte, te esperaremos de regreso pronto, pero no olvides volver a la pantalla de inicio para dejarme conocer a más personas.",
        popover: {
          title: 'Inicio',
          description: 'Si en cualquier momento debes irte, te esperaremos de regreso pronto, pero no olvides volver a la pantalla de inicio para dejarme conocer a más personas.',
        }
      },
      {
        element: '.repeat-btn',
        text: "Si algo no te quedó claro, siempre podrás repetir la información desde aquí.",
        popover: {
          title: 'Repetir',
          description: 'Si algo no te quedó claro, siempre podrás repetir la información desde aquí.',
        }
      },
      {
        element: '.fast-forward-btn',
        text: "Cuando tengas todo claro y veas que la información ha terminado, da un toque aquí, para continuar.",
        popover: {
          title: 'Continuar',
          description: 'Cuando tengas todo claro y veas que la información ha terminado, da un toque aquí, para continuar.',
        }
      },
      {
        element: '.gamepad-btn',
        text: "Si por el momento quieres saltar a la diversion para despertar tu curiosidad, dando un toque a la casilla 'juegos' en la parte inferior derecha.",
        popover: {
          title: 'Juegos',
          description: 'Si por el momento quieres saltar a la diversion para despertar tu curiosidad, dando un toque a la casilla "juegos" en la parte inferior derecha.',
        }
      },
      {
        element: '.volume-up-btn',
        text: "Si el volumen de mi voz esta muy bajo o muy alto, da un toque a la bocina del lado inferior derecho, donde aparecerá una barrita, con ella podrás manejar el volumen de mi voz.",
        popover: {
          title: 'Volumen',
          description: 'Si el volumen de mi voz esta muy bajo o muy alto, da un toque a la bocina del lado inferior derecho, donde aparecerá una barrita, con ella podrás manejar el volumen de mi voz.',
        }
      }
    ];

    let currentStep = 0;

    const driverObj = driver({
      popoverClass: 'driverjs-theme',
      onHighlightStarted: (element) => {
        const step = steps[currentStep];
        if (element && element.classList.contains(step.element.replace('.', ''))) {
          this.speak(step.text, () => {
            currentStep++;
            if (currentStep < steps.length) {
              driverObj.highlight(steps[currentStep]);
            } else {
              driverObj.destroy();
            }
          });
        }
      }
    });

    // 👇 empieza desde el primer paso
    driverObj.highlight(steps[currentStep]);
  }






}
