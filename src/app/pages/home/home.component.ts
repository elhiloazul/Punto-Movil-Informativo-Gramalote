import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { OpenaiService } from '../../services/openai.service';
import { time } from 'console';
import { timeout } from 'rxjs';

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
    this.speak("Hola, soy Tico, un mono Titi que está emocionado por conocerte. Estoy muy feliz de que estés aquí, y tengo mucho que contarte, pero primero, aprendamos a usar la pantalla", () => {
      console.log("👉 Ahora puedo pasar al siguiente paso del tutorial");
    });
  }



}
