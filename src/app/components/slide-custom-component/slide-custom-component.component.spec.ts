import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideCustomComponentComponent } from './slide-custom-component.component';

describe('SlideCustomComponentComponent', () => {
  let component: SlideCustomComponentComponent;
  let fixture: ComponentFixture<SlideCustomComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlideCustomComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlideCustomComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
