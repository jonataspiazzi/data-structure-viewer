import React from 'react';
import logo from './logo.svg';
import Sketch from 'react-p5';
import './App.css';

class App extends React.Component {
  y = 0;
  direction = '^';
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload. Ok
        </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
        </a>
        </header>
        <section>
          <Sketch
            setup={(p5, parentRef) => {
              p5.createCanvas(200, 200).parent(parentRef);
            }}
            draw={p5 => {
              console.log(this.y, this.direction);
              p5.background(0);
              p5.fill(255, this.y * 1.3, 0);
              p5.ellipse(p5.width / 2, this.y, 50);
              if (this.y > p5.height) this.direction = '';
              if (this.y < 0) {
                this.direction = '^';
              }
              if (this.direction === '^') this.y += 8;
              else this.y -= 4;
            }}
          />
        </section>
      </div>
    );
  }
}

export default App;
