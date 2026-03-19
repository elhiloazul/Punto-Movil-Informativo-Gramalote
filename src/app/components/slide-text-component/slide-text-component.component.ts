import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextSlide } from '../../models/slide.model';
import { LoggerService } from '../../core/logger/logger.service';

@Component({
  selector: 'app-slide-text-component',
  imports: [CommonModule],
  templateUrl: './slide-text-component.component.html',
  styleUrl: './slide-text-component.component.scss',
})
export class SlideTextComponentComponent {
  @Input({ required: true }) slide!: TextSlide;
  @Output() completed = new EventEmitter<void>();

  protected audio?: HTMLAudioElement;
  protected noAudio = false;

  get text(): string {
    return this.slide.text || '';
  }

  constructor(private logger: LoggerService) {}

  ngOnInit() {
    if (this.slide.audio) {
      this.playAudio();
    }
  }

  private playAudio() {
    this.logger.debug('Playing audio for slide ', this.slide.id);

    this.noAudio = false;
    this.audio = new Audio(this.slide.audio);
    this.audio.currentTime = 0;
    this.audio.play();
    this.audio.onended = () => {
      this.noAudio = true;
      this.logger.debug('Audio ended for slide ', this.slide.id);
      this.completed.emit();
    };
  }

  private stopAudio() {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.audio.src = '';
      this.audio = undefined;
      this.noAudio = true;
    }
  }

  toggleAudio() {
    if (!this.audio) return;

    if (this.audio.paused) {
      this.noAudio = false;
      this.audio.play();
    } else {
      this.noAudio = true;
      this.audio.pause();
    }
  }

  ngOnDestroy() {
    this.stopAudio();
  }
}
