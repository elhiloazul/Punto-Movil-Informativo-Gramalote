import { EventEmitter } from '@angular/core';

export interface InteractiveSlide {
  completed: EventEmitter<void>;
}