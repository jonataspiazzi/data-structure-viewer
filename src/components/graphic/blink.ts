import Timeline from '../../renderLogic/timeline';
import { bounceEaseInOutCubic } from '../../renderLogic/bouceFunctions';
import { lerp } from '../../renderLogic/mathFunctions';
import { GraphicItem } from '../../types';
import p5 from 'p5';

export default class Blink implements GraphicItem {
  x: number;
  y: number;
  radius: number;
  minRadius: number;
  maxRadius: number;
  tl: Timeline;
  rgb: Array<number>;

  constructor(x: number, y: number, initialRadius: number) {
    this.x = x;
    this.y = y;
    this.radius = initialRadius;
    this.minRadius = initialRadius - initialRadius * .6;
    this.maxRadius = initialRadius + initialRadius * .1;
    this.tl = new Timeline(bounceEaseInOutCubic, 2000, true, true);
    this.rgb = new Array<number>();
  }

  animate() {
    const a = this.tl.alpha();
    this.rgb = [lerp(0, 255, a), lerp(255, 0, a), 0];
    this.radius = lerp(this.minRadius, this.maxRadius, a);
  }

  render(p5: p5) {
    p5.fill(this.rgb[0], this.rgb[1], this.rgb[2]);
    p5.ellipse(this.x, this.y, this.radius);
  }
}