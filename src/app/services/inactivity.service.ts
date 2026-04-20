import { Injectable } from '@angular/core';
import { UserProgressService } from './user-progress.service';
import { SessionService } from './session.service';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class InactivityService {

  private timeoutId: any;
  private readonly TIMEOUT = 5 * 60 * 1000;

  private inactiveSubject = new Subject<void>();
  inactive$ = this.inactiveSubject.asObservable();

  constructor(
    private userProgress: UserProgressService,
    private sessionService: SessionService,
  ) {}

  start() {
    if(this.userProgress.isIntroSeen()){
        this.resetTimer();

        ['click', 'mousemove', 'keydown', 'touchstart'].forEach(event =>
          window.addEventListener(event, () => this.resetTimer())
        );
    }
  }

  confirmStillHere() {
    this.resetTimer();
  }

  restart() {
    this.sessionService.sync();
    this.userProgress.clear();
  }

  private resetTimer() {
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => this.onInactive(), this.TIMEOUT);
  }

  private onInactive() {
    this.inactiveSubject.next();
  }

}