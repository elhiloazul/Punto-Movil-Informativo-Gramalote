import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideSarchingMineralsGameComponent } from './slide-sarching-minerals-game.component';

describe('SlideSarchingMineralsGameComponent', () => {
  let component: SlideSarchingMineralsGameComponent;
  let fixture: ComponentFixture<SlideSarchingMineralsGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlideSarchingMineralsGameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlideSarchingMineralsGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
