import { GraphicItem, Vector2d } from "../../types";
import P5 from 'p5';

export default class Connector implements GraphicItem {
  node1: any;
  node2: any;
  position1: Vector2d;
  position2: Vector2d;

  constructor(node1: any, node2: any, pos1: Vector2d, pos2: Vector2d) {
    this.node1 = node1;
    this.node2 = node2;
    this.position1 = pos1;
    this.position2 = pos2;
  }

  animate(): void {
    throw new Error("Method not implemented.");
  }

  render(p5: P5): void {
    throw new Error("Method not implemented.");
  }
  
  hasGraphicUpdates(): boolean {
    throw new Error("Method not implemented.");
  }

}