import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DocumentSlide } from '../../models/slide.model';
import { SafePipe } from '../../pipes/safe.pipe';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-slide-document-component',
  imports: [SafePipe],
  templateUrl: './slide-document-component.component.html',
  styleUrl: './slide-document-component.component.scss'
})
export class SlideDocumentComponentComponent {
  @Input({ required: true }) slide!: DocumentSlide;
  @Output() completed = new EventEmitter<void>();

  
  private readonly PDF_PARAMS = '#toolbar=0&navpanes=0&scrollbar=0&view=FitH&statusbar=0&messages=0';

  constructor(private sanitizer: DomSanitizer) {}

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
