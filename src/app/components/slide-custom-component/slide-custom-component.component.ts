import { Component, EventEmitter, Input, Output, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { InteractiveSlide } from './interactive-slide';

@Component({
  selector: 'app-slide-custom-component',
  imports: [],
  templateUrl: './slide-custom-component.component.html',
  styleUrl: './slide-custom-component.component.scss'
})
export class SlideCustomComponentComponent {
  @Input() component!: Type<InteractiveSlide>;
  @Output() completed = new EventEmitter<void>(); 

  @ViewChild('host', { read: ViewContainerRef })
  host!: ViewContainerRef;

  private instance?: InteractiveSlide;

  ngAfterViewInit() {
    const ref = this.host.createComponent(this.component);
    this.instance = ref.instance;

    this.instance.completed.subscribe(() => {
      this.completed.emit();
    });
  }

  ngOnDestroy() {
    this.host.clear();
  }
  
}
