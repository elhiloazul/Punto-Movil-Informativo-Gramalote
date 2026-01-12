import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TextSlide } from '../../models/slide.model';
import { LoggerService } from '../../core/logger/logger.service';

@Component({
  selector: 'app-slide-text-component',
  imports: [],
  templateUrl: './slide-text-component.component.html',
  styleUrl: './slide-text-component.component.scss'
})
export class SlideTextComponentComponent {

  @Input({ required: true }) slide!: TextSlide;
  @Output() completed = new EventEmitter<void>();

  protected audio?: HTMLAudioElement;

  constructor(private logger: LoggerService) { }

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

  ngOnDestroy() {
    this.stopAudio();
  }

}


