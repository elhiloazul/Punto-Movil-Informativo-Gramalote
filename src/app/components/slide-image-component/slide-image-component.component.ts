import { Component, Input } from '@angular/core';
import { ImageSlide } from '../../models/slide.model';

@Component({
  selector: 'app-slide-image-component',
  imports: [],
  templateUrl: './slide-image-component.component.html',
  styleUrl: './slide-image-component.component.scss'
})
export class SlideImageComponentComponent {
  @Input({ required: true }) slide!: ImageSlide;

  ngOnInit() {
    

  }

} 
