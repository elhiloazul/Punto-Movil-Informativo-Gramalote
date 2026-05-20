import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InteractiveSlide } from '../interactive-slide';

@Component({
  selector: 'app-slide-agenda',
  imports: [CommonModule],
  templateUrl: './slide-agenda.component.html',
  styleUrl: './slide-agenda.component.scss'
})
export class SlideAgendaComponent implements InteractiveSlide, OnInit, OnDestroy {
  @Output() completed = new EventEmitter<void>();
  selectedImage: string | null = null;
  private audio?: HTMLAudioElement;

  eventos = [
    { name: 'Evento 1', imagen: 'images/actividades/modulo-6/evento-1.jpeg' },
    { name: 'Evento 2', imagen: 'images/actividades/modulo-6/evento-2.jpeg' },
    { name: 'Evento 3', imagen: 'images/actividades/modulo-6/evento-3.jpeg' },
    { name: 'Evento 4', imagen: 'images/actividades/modulo-6/evento-4.jpeg' },
    { name: 'Evento 5', imagen: 'images/actividades/modulo-6/evento-5.jpeg' },
    { name: 'Evento 6', imagen: 'images/actividades/modulo-6/evento-6.jpeg' },
    
  ];

  openImage(imagen: string) {
    this.selectedImage = imagen;
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
