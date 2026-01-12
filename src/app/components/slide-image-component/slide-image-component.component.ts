import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ImageSlide } from '../../models/slide.model';

@Component({
  selector: 'app-slide-image-component',
  imports: [],
  templateUrl: './slide-image-component.component.html',
  styleUrl: './slide-image-component.component.scss'
})
export class SlideImageComponentComponent {
  @Input({ required: true }) slide!: ImageSlide;
  @Output() completed = new EventEmitter<void>(); 
  
  ngOnInit() {
      if (this.slide.audio) {
        const audio = new Audio(this.slide.audio);
        audio.currentTime = 0; // reinicia el audio
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
