import { Injectable } from "@angular/core";
import { UserProgress } from "../models/user-progress.model";

@Injectable({ providedIn: 'root' })
export class UserProgressService {
    private readonly KEY = 'user_progress';

    get(): UserProgress {
        const stored = localStorage.getItem(this.KEY);
        return stored ? JSON.parse(stored) : this.default();
    }

    save(progress: UserProgress) {
        localStorage.setItem(this.KEY, JSON.stringify(progress));
    }

    clear() {
        localStorage.removeItem(this.KEY);
    }

    private default(): UserProgress {
        return {
            introSeen: false,
            menuSeen: false,
            completedActivities: {},
            lastActivityAt: Date.now()
        };
    }

    markActivityCompleted(activityId: string): void {
        const progress = this.get();

        progress.completedActivities[activityId] = true;
        progress.lastActivityAt = Date.now();

        this.save(progress);
    }

    isActivityCompleted(activityId: string): boolean {
        const progress = this.get();
        return !!progress.completedActivities[activityId];
    }

    isMenuSeen(): boolean {
        const progress = this.get();
        return progress.menuSeen;
    }

    markMenuSeen(): void {
        const progress = this.get();
        progress.menuSeen = true;
        this.save(progress);
    }

    isIntroSeen(): boolean{
        const progress = this.get();
        return progress.introSeen;
    }

    markIntroSeen(): void {
        const progress = this.get();
        progress.introSeen = true;
        this.save(progress);
    }

}
