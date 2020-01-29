import React, { useState } from 'react';
import SketchView from './components/interface/sketchView';
import './App.css';
import Blink from './components/graphic/blink';

export default function App() {
  const [items, setItems] = useState([new Blink(100, 100, 90)]);
  
  return (
    <div className="App">
      <SketchView items={items} />
    </div>
  );
}
