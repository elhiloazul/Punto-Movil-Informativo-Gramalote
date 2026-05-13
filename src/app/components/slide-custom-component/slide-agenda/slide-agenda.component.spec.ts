import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideAgendaComponent } from './slide-agenda.component';

describe('SlideAgendaComponent', () => {
  let component: SlideAgendaComponent;
  let fixture: ComponentFixture<SlideAgendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlideAgendaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlideAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
