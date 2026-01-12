import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TextSlide } from '../../models/slide.model';

@Component({
  selector: 'app-slide-text-component',
  imports: [],
  templateUrl: './slide-text-component.component.html',
  styleUrl: './slide-text-component.component.scss'
})
export class SlideTextComponentComponent {

  @Input({ required: true }) slide!: TextSlide;
  @Output() completed = new EventEmitter<void>();

  ngOnInit() {
    if (this.slide.audio) {
      const audio = new Audio(this.slide.audio);
      audio.currentTime = 0;
      audio.play().catch(err => {
        console.error('No se pudo reproducir el audio', err);
      }).then(() => {
        audio.onended = () => {
          this.completed.emit();
        };
      });
    }
  }
  
}


