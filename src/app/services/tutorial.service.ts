import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TutorialService {

  constructor() { }

  stepsTutorials = [
   /*  {
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
    }, */
    {
      element: '.mic-btn',
      text: "Si el microfono esta de color verde es porque estoy escuchando, pero si esta de color gris es porque no estoy escuchando.",
      popover: {
        title: 'Microfono',
        description: 'Si el microfono esta de color verde es porque estoy escuchando, pero si esta de color gris es porque no estoy escuchando.',
      }
    }
  ];

}
