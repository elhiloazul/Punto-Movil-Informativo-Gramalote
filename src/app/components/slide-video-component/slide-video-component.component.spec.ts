import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideVideoComponentComponent } from './slide-video-component.component';

describe('SlideVideoComponentComponent', () => {
  let component: SlideVideoComponentComponent;
  let fixture: ComponentFixture<SlideVideoComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlideVideoComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlideVideoComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
