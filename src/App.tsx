import React, { useState, useEffect } from 'react';
import SketchView from './components/interface/sketchView';
import './App.css';
import Tree from './components/graphic/tree';
import { createGraphicTreeData } from './dataStructure/testSamples';
import { GraphicItem } from './types';

const App = () => {
  const [items, setItems] = useState(new Array<GraphicItem>());

  useEffect(() => {
    const qItems = createGraphicTreeData();
    const tree = new Tree(qItems[101], {
      width: 40,
      height: 40,
      spaceBetweenSiblings: 10,
      spaceBetweenCousins: 20,
      spaceBetweenParentAndChild: 30,
      ignoreUnevenSiblings: false
    });

    setItems([tree]);
  }, []);

  return (
    <div className="App">
      <section className="render-area">
        <SketchView items={items} />
      </section>
      <aside className="controls">

      </aside>
    </div>
  );
}

export default App;