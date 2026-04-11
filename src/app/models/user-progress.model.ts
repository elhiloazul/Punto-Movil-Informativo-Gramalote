export interface ActivityProgress {
  name: string;
  lastSlideIndex: number;
  completed: boolean;
  completedAt?: number;
}

export interface UserProgress {
  sessionId: string;
  introSeen: boolean;
  menuSeen: boolean;
  name: string;
  age: string;
  neighborhood: string;
  activities: Record<string, ActivityProgress>;
  startedAt: number;
  lastActivityAt: number;
}