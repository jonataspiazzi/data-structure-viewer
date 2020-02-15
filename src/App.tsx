import React, { useEffect, useRef } from 'react';
import { init, animate } from './scene';
import './App.css';

const App = () => {
  const renderArea = useRef<HTMLElement>();

  useEffect(() => {
    init(renderArea.current);
    animate();
  }, []);

  return (
    <>
      <div className="App">
        <section className="render-area" ref={renderArea}>
        </section>
        <aside className="controls">
        </aside>
      </div>
    </>
  );
}

export default App;