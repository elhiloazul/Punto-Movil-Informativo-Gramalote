import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { InteractiveSlide } from '../interactive-slide';
import { CommonModule } from '@angular/common';
import { CustomSlide } from '../../../models/slide.model';
import { LoggerService } from '../../../core/logger/logger.service';

@Component({
  selector: 'app-slide-contact-form',
  imports: [CommonModule],
  templateUrl: './slide-contact-form.component.html',
  styleUrl: './slide-contact-form.component.scss',
})
export class SlideContactFormComponent implements InteractiveSlide {
  @Input() slide?: CustomSlide;
  @Output() completed = new EventEmitter<void>();

  readonly formUrl = 'https://gramalote.com/formulario-contacto/';
  readonly trustedUrl: SafeResourceUrl;
  protected audio?: HTMLAudioElement;
  protected noAudio = false;
  private audioInitialized = false;

  constructor(private sanitizer: DomSanitizer, private logger: LoggerService) {
    this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.formUrl);
  }

  ngOnInit() {
    this.initAudio();
  }

  ngOnChanges() {
    if (!this.audioInitialized) {
      this.initAudio();
    }
  }

  private initAudio() {
    if (this.slide?.audio && !this.audioInitialized) {
      this.audioInitialized = true;
      this.playAudio();
    }
  }

  private playAudio() {
    this.logger.debug('Playing audio for slide ', this.slide?.id);
    this.noAudio = false;
    this.audio = new Audio(this.slide!.audio);
    this.audio.currentTime = 0;
    this.audio.play();
    this.audio.onended = () => {
      this.noAudio = true;
      this.logger.debug('Audio ended for slide ', this.slide?.id);
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

  onContinue() {
    this.completed.emit();
  }

  ngOnDestroy() {
    this.stopAudio();
  }
}
