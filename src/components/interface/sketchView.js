import React, { useState } from 'react';
import Sketch from 'react-p5';

export default function SketchView({ items }) {
  const setup = (p5, parentRef) => {
    p5.createCanvas(400, 400).parent(parentRef);
  }

  const draw = p5 => {
    p5.fill(0);
    p5.rect(0, 0, 400, 400);

    for (const item of items) {
      item.animate();
    }

    for (const item of items) {
      item.render(p5);
    }
  };

  return <Sketch setup={setup} draw={draw} />
}