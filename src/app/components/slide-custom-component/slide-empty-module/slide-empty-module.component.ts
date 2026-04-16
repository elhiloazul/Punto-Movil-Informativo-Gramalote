import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { InteractiveSlide } from '../interactive-slide';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-slide-empty-module',
  imports: [CommonModule],
  templateUrl: './slide-empty-module.component.html',
  styleUrl: './slide-empty-module.component.scss',
})
export class SlideEmptyModuleComponent implements InteractiveSlide {
  @Output() completed = new EventEmitter<void>();

  constructor(private router: Router) {}

  onGoToMenu() {
    this.router.navigate(['/menu']);
    this.completed.emit();
  }
}
