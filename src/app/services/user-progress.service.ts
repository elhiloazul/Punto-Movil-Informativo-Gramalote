import { Injectable } from "@angular/core";
import { ActivityProgress, UserProgress } from "../models/user-progress.model";

@Injectable({ providedIn: 'root' })
export class UserProgressService {
    private readonly KEY = 'user_progress';

    private get storage(): Storage | null {
        return typeof localStorage !== 'undefined' ? localStorage : null;
    }

    get(): UserProgress {
        const stored = this.storage?.getItem(this.KEY);
        if (!stored) return this.default();
        return { ...this.default(), ...JSON.parse(stored) };
    }

    save(progress: UserProgress) {
        this.storage?.setItem(this.KEY, JSON.stringify(progress));
    }

    clear() {
        this.storage?.removeItem(this.KEY);
    }

    initSession(): void {
        const progress = this.get();
        progress.sessionId = crypto.randomUUID();
        progress.startedAt = Date.now();
        this.save(progress);
    }

    private default(): UserProgress {
        return {
            sessionId: '',
            introSeen: false,
            menuSeen: false,
            name: '',
            age: '',
            neighborhood: '',
            activities: {},
            startedAt: Date.now(),
            lastActivityAt: Date.now(),
        };
    }

    savePersonalInfo(name: string, age: string, neighborhood: string): void {
        const progress = this.get();
        progress.name = name;
        progress.age = age;
        progress.neighborhood = neighborhood;
        this.save(progress);
    }

    updateActivityProgress(activityId: string, name: string, lastSlideIndex: number): void {
        const progress = this.get();
        const existing = progress.activities[activityId];
        progress.activities[activityId] = {
            name,
            lastSlideIndex,
            completed: existing?.completed ?? false,
            completedAt: existing?.completedAt,
        };
        progress.lastActivityAt = Date.now();
        this.save(progress);
    }

    markActivityCompleted(activityId: string, name: string): void {
        const progress = this.get();
        const existing = progress.activities[activityId];
        progress.activities[activityId] = {
            name,
            lastSlideIndex: existing?.lastSlideIndex ?? 0,
            completed: true,
            completedAt: Date.now(),
        };
        progress.lastActivityAt = Date.now();
        this.save(progress);
    }

    isActivityCompleted(activityId: string): boolean {
        return !!this.get().activities[activityId]?.completed;
    }

    getActivityProgress(activityId: string): ActivityProgress | undefined {
        return this.get().activities[activityId];
    }

    isMenuSeen(): boolean {
        return this.get().menuSeen;
    }

    markMenuSeen(): void {
        const progress = this.get();
        progress.menuSeen = true;
        this.save(progress);
    }

    isIntroSeen(): boolean {
        return this.get().introSeen;
    }

    markIntroSeen(): void {
        const progress = this.get();
        progress.introSeen = true;
        this.save(progress);
    }
}
