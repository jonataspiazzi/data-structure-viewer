import React, { useState } from 'react';
import SketchView from './components/interface/sketchView';
import Blink from './components/graphic/blink';
import './App.css';

const App = () => {
  const [items] = useState([new Blink(100, 100, 90)]);

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