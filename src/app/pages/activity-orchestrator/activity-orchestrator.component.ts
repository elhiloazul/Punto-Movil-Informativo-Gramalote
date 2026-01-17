import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityService } from '../../services/activity.service';
import { Activity, ActivitySlide } from '../../models/activity.model';
import { FooterComponent } from '../../components/footer/footer.component';
import { SlideTextComponentComponent } from '../../components/slide-text-component/slide-text-component.component';
import { SlideImageComponentComponent } from '../../components/slide-image-component/slide-image-component.component';
import { Slide } from '../../models/slide.model';
import { slideAnimations } from '../../components/slide.animations';
import { LoggerService } from '../../core/logger/logger.service';
import { SlideVideoComponentComponent } from '../../components/slide-video-component/slide-video-component.component';
import { SlideDocumentComponentComponent } from '../../components/slide-document-component/slide-document-component.component';
import { SlideCustomComponentComponent } from '../../components/slide-custom-component/slide-custom-component.component';

@Component({
  selector: 'app-activity-orchestrator',
  imports: [
    FooterComponent,
    SlideTextComponentComponent,
    SlideImageComponentComponent,
    SlideVideoComponentComponent,
    SlideDocumentComponentComponent,
    SlideCustomComponentComponent,
  ],
  animations: [ slideAnimations ],
  templateUrl: './activity-orchestrator.component.html',
  styleUrls: ['./activity-orchestrator.component.scss']
})
export class ActivityOrchestratorComponent implements OnInit {
  
  private readonly TRANSITION_DELAY_MS = 800;
  activity: Activity | undefined;
  currentSlideIndex: number = 0;

  constructor(
    private route: ActivatedRoute,
    private activityService: ActivityService,
    private logger: LoggerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.logger.debug("Starting activity ", id)

    this.activity = this.activityService.getById(id);
  }

  onSlideCompleted() {
    this.logger.debug("Slide completed, moving to next slide", this.currentSlideIndex);

    setTimeout(() => {
        this.goToNextSlide();
      }, 
      this.TRANSITION_DELAY_MS
    );
  }

  private goToNextSlide() {
    this.currentSlideIndex++;

    if (this.currentSlideIndex >= this.activity!.slides.length) {
      this.finishActivity();
    }
  }

  private finishActivity() {
    this.logger.debug('Activity finished, redirecting to menu');

    this.router.navigate(['/menu']);
  }


  get currentSlide(): ActivitySlide | undefined {
    if (!this.activity) return undefined;
    return this.activity.slides[this.currentSlideIndex];
  }

  prepareSlide(slide: Slide) {
    return slide.id;
  }

}
