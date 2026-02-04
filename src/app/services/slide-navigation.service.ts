import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SlideNavigationService {
  private currentSlideIndexSubject = new BehaviorSubject<number>(0);
  private canGoBackSubject = new BehaviorSubject<boolean>(false);
  
  currentSlideIndex$ = this.currentSlideIndexSubject.asObservable();
  canGoBack$ = this.canGoBackSubject.asObservable();

  private goToPreviousSlideCallback?: () => void;

  setCurrentSlideIndex(index: number) {
    this.currentSlideIndexSubject.next(index);
    this.canGoBackSubject.next(index > 0);
  }

  setGoToPreviousSlideCallback(callback: () => void) {
    this.goToPreviousSlideCallback = callback;
  }

  goToPreviousSlide() {
    if (this.goToPreviousSlideCallback && this.canGoBackSubject.value) {
      this.goToPreviousSlideCallback();
    }
  }

  reset() {
    this.currentSlideIndexSubject.next(0);
    this.canGoBackSubject.next(false);
    this.goToPreviousSlideCallback = undefined;
  }
}