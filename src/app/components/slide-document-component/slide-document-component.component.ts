import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DocumentSlide } from '../../models/slide.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { LoggerService } from '../../core/logger/logger.service';

@Component({
  selector: 'app-slide-document-component',
  templateUrl: './slide-document-component.component.html',
  styleUrl: './slide-document-component.component.scss'
})
export class SlideDocumentComponentComponent {
  @Input({ required: true }) slide!: DocumentSlide;
  @Output() completed = new EventEmitter<void>();

  protected audio?: HTMLAudioElement;
  private readonly PDF_PARAMS = '#toolbar=0&navpanes=0&scrollbar=0&view=FitH&statusbar=0&messages=0';
  pdfUrl!: SafeResourceUrl;

  constructor(
    private sanitizer: DomSanitizer,
    private logger: LoggerService
  ) {}

  ngOnInit() {

    if (this.slide.documentUrl) {
      this.pdfUrl = this.getCleanPdfUrl(this.slide.documentUrl);
    }

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

  /**
   * Toma la URL base del slide y le añade los parámetros de visualización
   * de forma dinámica.
   */
  getCleanPdfUrl(baseUrl: string): SafeResourceUrl {
    if (!baseUrl) return '';
    
    // Unimos la ruta con nuestra configuración
    const finalUrl = `${baseUrl}${this.PDF_PARAMS}`;
    
    // Retornamos la URL marcada como segura para el iframe
    return this.sanitizer.bypassSecurityTrustResourceUrl(finalUrl);
  }
}
