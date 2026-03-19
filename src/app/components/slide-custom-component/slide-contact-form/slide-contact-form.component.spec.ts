import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SlideContactFormComponent } from './slide-contact-form.component';

describe('SlideContactFormComponent', () => {
  let component: SlideContactFormComponent;
  let fixture: ComponentFixture<SlideContactFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlideContactFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlideContactFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit completed when onContinue is called', () => {
    spyOn(component.completed, 'emit');
    component.onContinue();
    expect(component.completed.emit).toHaveBeenCalled();
  });
});
