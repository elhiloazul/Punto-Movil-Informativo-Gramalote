import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InteractiveSlide } from '../interactive-slide';
import { AgendaEvent, CustomSlide } from '../../../models/slide.model';

@Component({
  selector: 'app-slide-agenda',
  imports: [CommonModule],
  templateUrl: './slide-agenda.component.html',
  styleUrl: './slide-agenda.component.scss'
})
export class SlideAgendaComponent implements InteractiveSlide, OnInit, OnDestroy {
  @Input() slide!: CustomSlide;
  @Output() completed = new EventEmitter<void>();
  selectedImage: string | null = null;
  private audio?: HTMLAudioElement;

  get eventos(): AgendaEvent[] {
    const events = this.slide?.metadata?.['events'];
    return Array.isArray(events) ? (events as AgendaEvent[]) : [];
  }

  openImage(imageUrl: string) {
    this.selectedImage = imageUrl;
  }

  closeImage() {
    this.selectedImage = null;
  }

  ngOnInit() {
    this.playAudio('audio/actividades/modulo-agendate/slide-2.mp3');
  }

  private playAudio(audioPath: string) {
    this.audio = new Audio(audioPath);
    this.audio.play().catch(err => console.error('Error reproduciendo audio', err));
  }

  ngOnDestroy() {
    if (this.audio) {
      this.audio.pause();
      this.audio.src = '';
      this.audio = undefined;
    }
  }
}
