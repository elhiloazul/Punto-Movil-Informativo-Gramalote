import { Injectable } from '@angular/core';
import { ACTIVITIES } from '../data';
import { Activity } from '../models/activity.model';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor() { }

  getActivities() {
    return ACTIVITIES;
  }

  getById(id: string): Activity | undefined {
    return ACTIVITIES.find(activity => activity.id === id);
  }
}
