import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideImageComponentComponent } from './slide-image-component.component';

describe('SlideImageComponentComponent', () => {
  let component: SlideImageComponentComponent;
  let fixture: ComponentFixture<SlideImageComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlideImageComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlideImageComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
