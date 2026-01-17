import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TutorialService {

  constructor() { }

  stepsTutorials = [
   {
      element: '.home-btn',
      audio: 'audio/home/tutorial-home.mp3',
      popover: {
        title: 'Inicio',
        description: 'Si en cualquier momento debes irte, te esperaremos de regreso pronto, pero no olvides volver a la pantalla de inicio para dejarme conocer a más personas.',
      }
    },
    {
      element: '.repeat-btn',
      audio: 'audio/home/tutorial-repeat.mp3',
      popover: {
        title: 'Repetir',
        description: 'Si algo no te quedó claro, siempre podrás repetir la información desde aquí.',
      }
    },
    {
      element: '.gamepad-btn',
      audio: 'audio/home/tutorial-game.mp3',
      popover: {
        title: 'Juegos',
        description: 'Si por el momento quieres saltar a la diversion para despertar tu curiosidad, dando un toque en esta casilla', 
      }
    },
    {
      element: '.volume-up-btn',
      audio: 'audio/home/tutorial-volume.mp3',
      popover: {
        title: 'Volumen',
        description: 'Si el volumen de mi voz esta muy bajo o muy alto, da un toque a la bocina del lado inferior derecho, donde aparecerá una barrita, con ella podrás manejar el volumen de mi voz.',
      }
    }
  ];

}
