import p5 from "p5";

export interface GraphicItem {
  animate: () => void;
  render: (p5: p5) => void;
}

export interface EasingFunc {
  (value: number): number;
}

export interface Vector2d {
  x: number;
  y: number;
}