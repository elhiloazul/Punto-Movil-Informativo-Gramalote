import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ImageSlide } from '../../models/slide.model';
import { LoggerService } from '../../core/logger/logger.service';

@Component({
  selector: 'app-slide-image-component',
  imports: [],
  templateUrl: './slide-image-component.component.html',
  styleUrl: './slide-image-component.component.scss'
})
export class SlideImageComponentComponent {
  @Input({ required: true }) slide!: ImageSlide;
  @Output() completed = new EventEmitter<void>(); 
  
  constructor(private logger: LoggerService) { }
  protected audio?: HTMLAudioElement;

  ngOnInit() {
    if (this.slide.audio) {
      this.playAudio();
    }
  }
  
  private playAudio() {
    this.logger.debug("Playing audio for slide ", this.slide.id);
    this.audio = new Audio(this.slide.audio);
    this.audio.currentTime = 0;
    this.audio.play()
    this.audio.onended = () => {
        this.logger.debug("Audio ended for slide ", this.slide.id);
        this.completed.emit();
      };
  }

  private stopAudio() {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.audio.src = '';
      this.audio = undefined;
    }
  }


  toggleAudio() {
    if (!this.audio) return;

    if (this.audio.paused) {
      this.audio.play();
    } else {
      this.audio.pause();
    }
  }

  ngOnDestroy() {
    this.stopAudio();
  }


} 
