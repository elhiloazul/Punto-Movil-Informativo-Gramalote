import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TutorialService {
  constructor() {}

  stepsTutorialsFooter = [
    {
      element: '.volume-up-btn',
      audio: 'audio/home/tutorial-volume.mp3',
      popover: {
        description:
          'Para iniciar, si el volumen de mi voz es muy bajo o muy alto, da un toque al símbolo de la bocina, de allí saldrá una pequeña barra, con la cual podrás controlar el volumen de mi voz.',
      },
    },
    {
      element: '.repeat-btn',
      audio: 'audio/home/tutorial-repeat.mp3',
      popover: {
        description:
          'Si algo quizás no te queda claro en cualquier momento, puedes repetir la información dando un toque al símbolo de las flechas.',
      },
    },
    {
      element: '.home-btn',
      audio: 'audio/home/tutorial-home.mp3',
      popover: {
        description:
          'Si en algún momento debes irte, ¡lo entiendo!, pero no olvides volver al inicio, dando un toque en el símbolo de la casa, así podré conocer más personas.',
      },
    },
    {
      element: '.gamepad-btn',
      audio: 'audio/home/tutorial-game.mp3',
      popover: {
        description:
          'Te cuento además, que tengo unos juegos muy divertidos para todas las edades. Si quieres relajarte un rato y jugar conmigo, da un toque en la casilla de los dados.',
      },
    },
  ];

  stepsTutorialsMenu = [
    {
      element: '.conoce-nuestro-proyecto-btn',
      audio: 'audio/menu/conoce-nuestro-proyecto.mp3',
      popover: {
        description:
          'Conoce nuestro proyecto. Aquí te cuento un poco de la historia de Gramalote y qué es lo que hacemos.',
      },
    },
    {
      element: '.nuestra-licencia-ambiental-btn',
      audio: 'audio/menu/nuestra-licencia-ambiental.mp3',
      popover: {
        description:
          'Nuestra licencia ambiental. Primero te explico que es una licencia ambiental y cómo funciona la nuestra. ',
      },
    },
    {
      element: '.conoce-el-meia-btn',
      audio: 'audio/menu/conoce-meia.mp3',
      popover: {
        description:
          'Conoce La MEIA. Aquí puedes conocer la modificación de nuestra Licencia Ambiental.',
      },
    },
    {
      element: '.tu-cuentas-sqr-btn',
      audio: 'audio/menu/tu-cuentas-sqr.mp3',
      popover: {
        description:
          'Tú cuentas. Aquí, te escuchamos, por lo que te contaré como te puedes comunicar con nosotros a través de diferentes medios, para resolver todas tus dudas, quejas o reclamos.',
      },
    },
    /* {
      element: '.agendate-btn',
      audio: 'audio/menu/agendate.mp3',
      popover: {
        description:
          'Agéndate. En Gramalote estamos siempre en contacto con la comunidad, por lo que tenemos diferentes jornadas donde nos encantaría que nos acompañes, aquí podrás conocer toda nuestra programación.',
      },
    }, */
  ];
}
