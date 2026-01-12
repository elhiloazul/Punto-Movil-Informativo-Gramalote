import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DocumentSlide } from '../../models/slide.model';

@Component({
  selector: 'app-slide-document-component',
  imports: [],
  templateUrl: './slide-document-component.component.html',
  styleUrl: './slide-document-component.component.scss'
})
export class SlideDocumentComponentComponent {
  @Input({ required: true }) slide!: DocumentSlide;
  @Output() completed = new EventEmitter<void>();

}
