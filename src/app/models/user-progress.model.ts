export interface UserProgress {
  introSeen: boolean;
  menuSeen: boolean;
  completedActivities: Record<string, boolean>;
  lastActivityAt: number;
}