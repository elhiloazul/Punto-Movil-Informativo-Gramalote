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
        description: 'Si en algún momento debes irte, ¡lo entiendo!, pero no olvides volver al inicio antes de hacerlo, así yo poder conocer a más personas, lo puedes hacer dando un toque al símbolo de la casa.',
      }
    },
    {
      element: '.repeat-btn',
      audio: 'audio/home/tutorial-repeat.mp3',
      popover: {
        title: 'Repetir',
        description: 'Si algo quizás no te queda claro en cualquier momento, puedes repetir la información dando un toque al símbolo de las flechas.',
      }
    },
    {
      element: '.gamepad-btn',
      audio: 'audio/home/tutorial-game.mp3',
      popover: {
        title: 'Juegos',
        description: 'Te cuento que también tengo unos juegos muy divertidos y para todas las edades, por lo que si quieres relajarte un rato y jugar conmigo, lo puedes hacer dando un toque en la casilla de los dados en cualquier momento.', 
      }
    },
    {
      element: '.volume-up-btn',
      audio: 'audio/home/tutorial-volume.mp3',
      popover: {
        title: 'Volumen',
        description: 'Primero que todo, si el volumen de mi voz es muy bajo o muy alto, da un toque al símbolo de la bocina, de allí saldrá una pequeña barra, con la cual podrás controlar el volumen de mi voz.',
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
