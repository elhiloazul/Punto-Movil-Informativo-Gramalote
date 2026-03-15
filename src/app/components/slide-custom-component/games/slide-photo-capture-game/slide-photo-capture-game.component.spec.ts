import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoggerService } from '../../../../core/logger/logger.service';

import { SlidePhotoCaptureGameComponent } from './slide-photo-capture-game.component';

// Mock para LoggerService
class MockLoggerService {
  log(message: string) {
    console.log(message);
  }
}

describe('SlidePhotoCaptureGameComponent', () => {
  let component: SlidePhotoCaptureGameComponent;
  let fixture: ComponentFixture<SlidePhotoCaptureGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlidePhotoCaptureGameComponent],
      providers: [
        { provide: LoggerService, useClass: MockLoggerService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlidePhotoCaptureGameComponent);
    component = fixture.componentInstance;
    
    // Mock para getUserMedia
    Object.defineProperty(navigator, 'mediaDevices', {
      writable: true,
      value: {
        getUserMedia: jasmine.createSpy('getUserMedia').and.returnValue(Promise.resolve(new MediaStream()))
      }
    });
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});