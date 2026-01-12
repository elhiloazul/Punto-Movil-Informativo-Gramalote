import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityOrchestratorComponent } from './activity-orchestrator.component';

describe('ActivityOrchestratorComponent', () => {
  let component: ActivityOrchestratorComponent;
  let fixture: ComponentFixture<ActivityOrchestratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityOrchestratorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityOrchestratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
