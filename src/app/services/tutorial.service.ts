import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TutorialService {

  constructor() { }

  stepsTutorialsFooter = [
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

   stepsTutorialsMenu = [
   {
      element: '.conoce-nuestro-proyecto-btn',
      audio: 'audio/menu/conoce-nuestro-proyecto.mp3',
      popover: {
        description: 'Conoce nuestro proyecto, donde te cuento un poco de la historia de GRAMALOTE, cómo funciona y qué es lo que hacemos.',
      }
    },
    {
      element: '.nuestra-licencia-ambiental-btn',
      audio: 'audio/menu/nuestra-licencia-ambiental.mp3',
      popover: {
        description: 'Segundo: Nuestra licencia ambiental. Te explico todo sobre que es una licencia ambiental y cómo funciona la nuestra, además de sus adaptaciones al proyecto. Recuerda que esto se hace para garantizar que el proyecto sea seguro, sostenible y responsable con la comunidad y el medio ambiente.',
      }
    },
    {
      element: '.conoce-el-meia-btn',
      audio: 'audio/menu/conoce-meia.mp3',
      popover: {
        description: 'Tercero: Conoce la MEIA. ¿Recuerdas que te dije que nuestra licencia ambiental se adapta a lo que hacemos?, pues aquí puedes conocer cada modificación, te recomiendo que antes de entrar aquí, ya hayas conocido que es una licencia ambiental.',
      }
    },
    {
      element: '.tu-cuentas-sqr-btn',
      audio: 'audio/menu/tu-cuentas-sqr.mp3',
      popover: {
        description: 'Cuarto: tú cuentas. Aquí, te escuchamos, por lo que te contaré como te puedes comunicar con nosotros, a través de diferentes medios, para conocer todas tus dudas, quejas, reclamos o solicitudes.',
      }
    },
    {
      element: '.agendate-btn',
      audio: 'audio/menu/agendate.mp3',
      popover: {
        description: 'Quinto: Agéndate. Desde GRAMALOTE estamos en constante movimiento y contacto con la comunidad, por lo que tenemos diferentes jornadas donde nos encantaría que nos acompañes, aquí podrás conocer nuestra programación como Jornadas informativas, reuniones comunitarias o disponibilidad de atención.',
      }
    }
  ];

}
