import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideDescribeMineralsGameComponent } from './slide-describe-minerals-game.component';

describe('SlideDescribeMineralsGameComponent', () => {
  let component: SlideDescribeMineralsGameComponent;
  let fixture: ComponentFixture<SlideDescribeMineralsGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlideDescribeMineralsGameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlideDescribeMineralsGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
