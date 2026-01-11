import { Component } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { ActivityService } from '../../services/activity.service';
import { Activity } from '../../models/activity.model';

@Component({
  selector: 'app-menu',
  imports: [
    FooterComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {

  activities: Activity[] = [];

  constructor(private activityService: ActivityService) { }
  
  ngOnInit() {
    this.activities = this.activityService.getActivities();
  }
}
