import { Component, EventEmitter, Output } from '@angular/core';
import { InteractiveSlide } from '../../interactive-slide';
import { LoggerService } from '../../../../core/logger/logger.service';
import { Mineral } from './models/Mineral';

@Component({
  selector: 'app-slide-sarching-minerals-game',
  imports: [],
  templateUrl: './slide-sarching-minerals-game.component.html',
  styleUrl: './slide-sarching-minerals-game.component.scss'
})
export class SlideSarchingMineralsGameComponent implements InteractiveSlide{
  @Output() completed = new EventEmitter<void>(); 
  text: string = '';
  foundMineral: Mineral | null = null;
  minerals: Mineral[] = [];
  message: string | null = null;

  private readonly AVAILABLE_MINERALS = [
    { name: 'Oro', image: 'images/actividades/modulo-5/searching-minerals/oro.png' },
    { name: 'Plata', image: 'images/actividades/modulo-5/searching-minerals/plata.png' },
    { name: 'Cobre', image: 'images/actividades/modulo-5/searching-minerals/cobre.png' },
    { name: 'Carbón', image: 'images/actividades/modulo-5/searching-minerals/carbon.png' },
    { name: 'Metal', image: 'images/actividades/modulo-5/searching-minerals/metal.png' }
  ];

  constructor(private logger: LoggerService) { }

  ngOnInit() {
    this.initializeGame();
    this.generateMinerals();
  }
  
  initializeGame() {
    this.text = 'Busca los minerales que hay en la zona, da un toque en cada uno cuando los veas, Ten en cuenta que sabemos que hay 5 en toda la zona.';  
    this.playAudio('audio/actividades/modulo-5/searching-minerals/initial-instructions.mp3');
  }

  private generateMinerals() {
    const shuffledMinerals = [...this.AVAILABLE_MINERALS]
      .sort(() => Math.random() - 0.5);

    this.minerals = Array.from({ length: this.AVAILABLE_MINERALS.length }).map((_, i) => {
      const mineral = shuffledMinerals[i];

      return {
        id: crypto.randomUUID(),
        name: mineral.name,
        image: mineral.image,
        x: Math.random() * 85,
        y: Math.random() * 80,
        found: false
      };
    });
  }

  onMineralClick(mineral: Mineral) {
    mineral.found = true;
    this.foundMineral = mineral;

    setTimeout(() => {
      this.foundMineral = null;

      if (this.minerals.every(m => m.found)) {
        setTimeout(() => this.completed.emit(), 600);
      }
    }, 1500);
  }

  private playAudio(audioUrl: string) {
    const audio = new Audio(audioUrl);
    audio.currentTime = 0;
    audio.play();
  }
  
}
