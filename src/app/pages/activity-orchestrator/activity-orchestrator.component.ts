import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActivityService } from '../../services/activity.service';
import { Activity } from '../../models/activity.model';
import { FooterComponent } from '../../components/footer/footer.component';
import { SlideTextComponentComponent } from '../../components/slide-text-component/slide-text-component.component';

@Component({
  selector: 'app-activity-orchestrator',
  imports: [
    FooterComponent,
    SlideTextComponentComponent,
  ],
  templateUrl: './activity-orchestrator.component.html',
  styleUrls: ['./activity-orchestrator.component.scss']
})
export class ActivityOrchestratorComponent implements OnInit {

  activity: Activity | undefined;
  currentSlideIndex: number = 0;

  constructor(
    private route: ActivatedRoute,
    private activityService: ActivityService,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.activity = this.activityService.getById(id);
  }

  get currentSlide() {
    if (!this.activity) return undefined;
    return this.activity.slides[this.currentSlideIndex];
  }

}
