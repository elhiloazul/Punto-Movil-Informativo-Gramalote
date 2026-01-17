import { Component, EventEmitter, Output } from '@angular/core';
import { InteractiveSlide } from '../../interactive-slide';
import { Mineral } from './models/Mineral';

@Component({
  selector: 'app-slide-describe-minerals-game',
  imports: [],
  templateUrl: './slide-describe-minerals-game.component.html',
  styleUrl: './slide-describe-minerals-game.component.scss'
})
export class SlideDescribeMineralsGameComponent implements InteractiveSlide {
  @Output() completed = new EventEmitter<void>(); 
  text: string = '';
  currentTarget!: Mineral;
  finished = false;

   minerals: Mineral[] = [
    { id: 'gold', name: 'Oro', nameWithPronoun: 'el oro', image: 'images/actividades/modulo-5/searching-minerals/oro.png', found: false },
    { id: 'silver', name: 'Plata', nameWithPronoun: 'la plata', image: 'images/actividades/modulo-5/searching-minerals/plata.png', found: false },
    { id: 'copper', name: 'Cobre', nameWithPronoun: 'el cobre', image: 'images/actividades/modulo-5/searching-minerals/cobre.png', found: false },
    { id: 'coal', name: 'Carbón', nameWithPronoun: 'el carbón', image: 'images/actividades/modulo-5/searching-minerals/carbon.png', found: false },
    { id: 'quartz', name: 'Metal', nameWithPronoun: 'el metal', image: 'images/actividades/modulo-5/searching-minerals/metal.png', found: false }
  ];
  
  audioErrors: any[] = [
    { id: 'gold', audio: 'audio/actividades/modulo-5/describe-minerals/wrong-gold.mp3' },
    { id: 'silver', audio: 'audio/actividades/modulo-5/describe-minerals/wrong-silver.mp3' },
    { id: 'copper', audio: 'audio/actividades/modulo-5/describe-minerals/wrong-copper.mp3' },
    { id: 'coal', audio: 'audio/actividades/modulo-5/describe-minerals/wrong-coal.mp3' },
  ]

  audioMineralsToFind: any[] = [
    { id: 'silver', audio: 'audio/actividades/modulo-5/describe-minerals/find-silver.mp3'},
    { id: 'copper', audio: 'audio/actividades/modulo-5/describe-minerals/find-copper.mp3'},
    { id: 'coal', audio: 'audio/actividades/modulo-5/describe-minerals/find-coal.mp3'}
  ]

  ngOnInit() {
    this.initializeGame();
  }

  initializeGame() {
    this.currentTarget = this.minerals[0];
    this.text = 'Genial, ahora que los encontramos, debemos saber ¿Cuales son?.';
    const audio = this.playAudio('audio/actividades/modulo-5/describe-minerals/initial-instructions.mp3');
    audio.onended = () => {
      this.text = 'dime, ¿Cuál es el oro entre los minerales que encontraste? Por favor, selecciona el que crees que es el oro.'
    };
  }

  private pickNextMineral() {
    const remaining = this.minerals.filter(m => !m.found);

    if (remaining.length === 0) {
      this.text = 'Felicitaciones, has encontrado todos los minerales!';
      this.finished = true;
      setTimeout(() => this.completed.emit(), 1200);
      return;
    }

    this.currentTarget =
      remaining[Math.floor(Math.random() * remaining.length)];
    
      this.playAudio(this.audioMineralsToFind.find(a => a.id === this.currentTarget.id)?.audio);
      this.text = 'dime, ¿Cuál es ' + this.currentTarget.nameWithPronoun + ' entre los minerales que encontraste? Por favor, selecciona el que crees que es ' + this.currentTarget.nameWithPronoun + '.';
  }

  onMineralSelected(mineral: Mineral) {
    if (mineral.id === this.currentTarget.id) {
      mineral.found = true;
      this.text = 'Felicitaciones sigue asi!';

      setTimeout(() => {
        this.pickNextMineral();
      }, 1000);
    } else {
      this.text = 'Ooops, este no es ' + this.currentTarget.nameWithPronoun + ', Vuelve a intentarlo.';
      const audio = this.playAudio(this.audioErrors.find(a => a.id === this.currentTarget.id)?.audio);
      audio.onended = () => {
        this.text = '¿Cuál es '+ this.currentTarget.nameWithPronoun +' entre los minerales que encontraste? Por favor, selecciona el que crees que es ' + this.currentTarget.nameWithPronoun + '.';
      };
    }
  }

  private playAudio(audioUrl: string) : HTMLAudioElement {
    if (!audioUrl) return undefined as any;

    const audio = new Audio(audioUrl);
    audio.currentTime = 0;
    audio.play();
    return audio;
  }

}
