import React from 'react';
import Sketch from 'react-p5';
import TranslateControl from '../../renderLogic/translateControl';
import P5 from 'p5';
import { GraphicItem } from '../../types';

const dim = { width: 0, height: 0 };
let translateControl: TranslateControl;

const setup = (p5: P5, parentRef: HTMLElement): void => {
  dim.width = parentRef.offsetWidth;
  dim.height = parentRef.offsetHeight;

  p5.createCanvas(dim.width, dim.height).parent(parentRef);
  translateControl = new TranslateControl(parentRef);
}

const draw = (p5: P5, items: Array<GraphicItem>): void => {
  p5.push();

  const t = translateControl.getCurrentTranslation();
  p5.translate(t.x, t.y);

  p5.fill(0);
  p5.rect(-100, -100, dim.width + 100, dim.height + 100);

  for (const item of items) {
    item.animate();
  }

  for (const item of items) {
    item.render(p5);
  }

  p5.pop();
};

export interface SketchViewProps {
  items: Array<GraphicItem>;
}

export default function SketchView(props: SketchViewProps) {
  return <Sketch setup={setup} draw={(p5: P5) => draw(p5, props.items)} />
}