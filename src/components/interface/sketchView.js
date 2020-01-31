import React from 'react';
import Sketch from 'react-p5';
import TranslateControl from '../../renderLogic/translateControl';

const dim = { width: 0, height: 0 };
let translateControl;

const setup = (p5, parentRef) => {
  dim.width = parentRef.offsetWidth;
  dim.height = parentRef.offsetHeight;

  p5.createCanvas(dim.width, dim.height).parent(parentRef);
  translateControl = new TranslateControl(parentRef);
}

const draw = (p5, items) => {
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

export default function SketchView({ items }) {
  return <Sketch setup={setup} draw={p5 => draw(p5, items)} />
}