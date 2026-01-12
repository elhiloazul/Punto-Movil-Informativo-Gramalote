import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActivityService } from '../../services/activity.service';
import { Activity, ActivitySlide } from '../../models/activity.model';
import { FooterComponent } from '../../components/footer/footer.component';
import { SlideTextComponentComponent } from '../../components/slide-text-component/slide-text-component.component';
import { SlideImageComponentComponent } from '../../components/slide-image-component/slide-image-component.component';
import { Slide } from '../../models/slide.model';
import { slideAnimations } from '../../components/slide.animations';

@Component({
  selector: 'app-activity-orchestrator',
  imports: [
    FooterComponent,
    SlideTextComponentComponent,
    SlideImageComponentComponent,
  ],
  animations: [ slideAnimations ],
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

  onSlideCompleted() {
    console.log('Slide completed, moving to next slide');
    this.currentSlideIndex++;
    // TODO: verificar si hay más slides o finalizar la actividad
  }

  get currentSlide(): ActivitySlide | undefined {
    if (!this.activity) return undefined;
    return this.activity.slides[this.currentSlideIndex];
  }

  prepareSlide(slide: Slide) {
    return slide.id;
  }

}
