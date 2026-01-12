import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideTextComponentComponent } from './slide-text-component.component';

describe('SlideTextComponentComponent', () => {
  let component: SlideTextComponentComponent;
  let fixture: ComponentFixture<SlideTextComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlideTextComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlideTextComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
