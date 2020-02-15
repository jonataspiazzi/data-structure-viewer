import { GraphicItem } from "../../types";
import P5 from 'p5';
import QuadirectionalTree, { QuadirectionalTreeTranslateConfig as QuadirectionalTreeGraphicConfig, QuadirectionalTreeFillConfig as QuadirectionalTreeCopyConfig } from "../../dataStructure/quadirectionalTree";

export default class Tree implements GraphicItem {
  configCopy: QuadirectionalTreeCopyConfig;
  configGraphics: QuadirectionalTreeGraphicConfig;

  constructor(configCopy: QuadirectionalTreeCopyConfig, configGraphics: QuadirectionalTreeGraphicConfig) {
    this.configCopy = configCopy;
    this.configGraphics = configGraphics;
  }

  /**
   * Add a new data structure, the differences between this data source and previous
   * data sources will be animated.
   * 
   * @param dataSource The data source with a generic structure. Should be compatible with configCopy passed on constructor.
   */
  stackAnimation(dataSource: any) {

  }

  animate(): void {
  }

  render(p5: P5): void {
    p5.push();
    p5.translate(this.config.width / 2, this.config.height / 2);
    let item: QuadirectionalTree = null;

    for (item of this.qTree) {
      if (!item.parent) continue;

      p5.strokeWeight(3);
      p5.stroke(0, 0, 255);
      p5.line(
        item.graphics.x,
        item.graphics.y - this.config.height / 2,
        item.parent.graphics.x,
        item.parent.graphics.y + this.config.height / 2);
    }

    for (item of this.qTree) {
      p5.noStroke();
      p5.fill(255, 0, 0);
      p5.circle(item.graphics.x, item.graphics.y, this.config.width);

      p5.fill(255, 255, 255);
      p5.textAlign(p5.CENTER, p5.CENTER);
      p5.text(item.data,
        item.graphics.x - this.config.width / 2,
        item.graphics.y - this.config.height / 2,
        this.config.width,
        this.config.height);
    }

    p5.pop();
  }

  pushChange(qTree: QuadirectionalTree) {
    qTree.updateGraphics(this.config);

    
  }

  hasGraphicUpdates() {
    return true;
  }
}