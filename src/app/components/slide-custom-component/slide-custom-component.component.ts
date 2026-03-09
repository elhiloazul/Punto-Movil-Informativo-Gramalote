import { Component, EventEmitter, Input, Output, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { InteractiveSlide } from './interactive-slide';
import { CustomSlide } from '../../models/slide.model';

@Component({
  selector: 'app-slide-custom-component',
  imports: [],
  templateUrl: './slide-custom-component.component.html',
  styleUrl: './slide-custom-component.component.scss'
})
export class SlideCustomComponentComponent {
  @Input({ required: true }) slide!: CustomSlide;
  @Input() component!: Type<InteractiveSlide>;
  @Output() completed = new EventEmitter<void>(); 

  @ViewChild('host', { read: ViewContainerRef })
  host!: ViewContainerRef;

  private instance?: InteractiveSlide;

  get backgroundStyle() {
    return this.slide?.backgroundImage ? `url(${this.slide.backgroundImage})` : null;
  }

  ngAfterViewInit() {
    const ref = this.host.createComponent(this.slide.component);
    this.instance = ref.instance as InteractiveSlide;

    this.instance.completed.subscribe(() => {
      this.completed.emit();
    });
  }

  ngOnDestroy() {
    this.host.clear();
  }
  
}
