import P5 from "p5";

export interface GraphicItem {
  animate(): void;
  render(p5: P5): void;
  hasGraphicUpdates(): boolean;
}

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