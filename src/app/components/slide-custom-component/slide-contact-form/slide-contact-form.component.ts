import { Component, EventEmitter, Output } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { InteractiveSlide } from '../interactive-slide';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-slide-contact-form',
  imports: [CommonModule],
  templateUrl: './slide-contact-form.component.html',
  styleUrl: './slide-contact-form.component.scss',
})
export class SlideContactFormComponent implements InteractiveSlide {
  @Output() completed = new EventEmitter<void>();

  readonly formUrl = 'https://gramalote.com/formulario-contacto/';
  readonly trustedUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {
    this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.formUrl);
  }

  onContinue() {
    this.completed.emit();
  }
}
