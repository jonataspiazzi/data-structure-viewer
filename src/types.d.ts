export interface EasingFunc {
  (value: number): number;
}

export interface Vector2d {
  x: number;
  y: number;
}

export interface TimeTrack {
  start(at: Date): void;
  alpha(): number;
  isFinished(): boolean;
  finishedAt(): Date;
}