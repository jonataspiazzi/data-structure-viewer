import ItemBase from './itemBase';
import Timeline from '../../renderLogic/timeline';
import { bounceEaseInOutCubic } from '../../renderLogic/bouceFunctions';
import { lerp } from '../../renderLogic/mathFunctions';

export default class Blink extends ItemBase {
  constructor(x, y, initialRadius) {
    super();
    this.x = x;
    this.y = y;
    this.radius = initialRadius;
    this.minRadius = initialRadius - initialRadius * .6;
    this.maxRadius = initialRadius + initialRadius * .1;
    this.tl = new Timeline(bounceEaseInOutCubic, 2000, true, true);
  }
  
  animate() {
    const a = this.tl.alpha();
    this.rgb = [lerp(0, 255, a), lerp(255, 0, a), 0];
    this.radius = lerp(this.minRadius, this.maxRadius, a);
  }

  render(p5) {
    p5.fill.apply(p5, this.rgb);
    p5.ellipse(this.x, this.y, this.radius);
  }
}