import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideDocumentComponentComponent } from './slide-document-component.component';

describe('SlideDocumentComponentComponent', () => {
  let component: SlideDocumentComponentComponent;
  let fixture: ComponentFixture<SlideDocumentComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlideDocumentComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlideDocumentComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
