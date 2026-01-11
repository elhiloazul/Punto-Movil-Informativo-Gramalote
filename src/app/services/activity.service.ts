import { Injectable } from '@angular/core';
import { ACTIVITIES } from '../data';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor() { }

  getActivities() {
    return ACTIVITIES;
  }
}
