import React from 'react';
import logo from './logo.svg';
import './App.css';

const mandelbrotLimit = 2;
const maxIterations = 100;
const roundingFactor = 1000000;

type real = number;
type imaginary = number;
type complex = [real, imaginary];

function pow2(num: number): number {
  return Math.pow(num, 2);
};

function mandelbrot(cnum: complex): number {
  const absImaginary = (num: complex): number => Math.sqrt(pow2(num[0]) + pow2(num[1]));
  let value: complex = [0, 0];
  let i = 0;

  while ((i < maxIterations) && (mandelbrotLimit >= absImaginary(value))) {
    const real = pow2(value[0]) - pow2(value[1]) + cnum[0];
    const imaginary = (2 * value[0] * value[1]) + cnum[1];
    value = [real, imaginary];
    i++;
  }

  const isInSet = (i === maxIterations) && (mandelbrotLimit >= absImaginary(value));
  return isInSet ? 0 : i;
}

function round(num: number): number {
  return Math.round(num * roundingFactor) / roundingFactor;
}

function App() {
  const [zoom, setZoom] = React.useState(1);
  const [center, setCenter] = React.useState([-0.5,0]);
  const [showGrid, setShowGrid] = React.useState(false);

  const width = 0.8 * Math.min(window.innerHeight, window.innerWidth);
  const scaleFactor = 2 * mandelbrotLimit * 2 / width; //radius doubled, 2 px per point
  const viewRadius = mandelbrotLimit / zoom;
  const scale = scaleFactor / zoom;
  const pan = viewRadius / 10
  const grid = [];

  for (let y = viewRadius + center[1]; y >= center[1] - viewRadius; y = round(y - scale)) {
    const row = [];

    for (let x = center[0] - viewRadius; x <= center[0] + viewRadius; x = round(x + scale)) {
      const iterations = mandelbrot([x, y]);
      const isInOrigin = (Math.abs(x) <= (2 * scale)) && (Math.abs(y) <= (2 * scale));
      const isInCenter = (Math.abs(x - center[0]) <= (2 * scale)) && (Math.abs(y - center[1]) <= (2 * scale));
      const isInSet = iterations === 0;
      const isOnAxis = (round(Math.abs(x % 1)) <= scale) || (round(Math.abs(y % 1)) <= scale);
      let className = "pixel";
      let style = { backgroundColor: "white" };

      if (isInOrigin && showGrid) {
        style.backgroundColor = "red";
      } else if (isInCenter || (isOnAxis && showGrid)) {
        style.backgroundColor = "lightgrey";
      }  else if (isInSet) {
        style.backgroundColor = "black";
      } else {
        style.backgroundColor = `hsl(${Math.round(320 * iterations / maxIterations)}, 100%, 50%)`;
      }

      row.push(<div className={className} style={style}></div>);
    }

    grid.push(<div className="row">{row}</div>);
  }

  return (
    <div className="app">
      <header className="header">
        <title className="title">
          <img src={logo} className="logo" alt="logo" />
          <h1>Explore the Mandelbrot Set</h1>
          <img src={logo} className="logo" alt="logo" />
        </title>
        <div className="controls">
          <div className="coords">
            <div>
              <code className="label">X</code>
              <button onClick={() => setCenter([round(center[0] - pan), center[1]])} className="button">{"<"}</button>
              <button onClick={() => setCenter([round(center[0] + pan), center[1]])} className="button">{">"}</button>
            </div>
            <div>
              <code className="label">Y</code>
                <button onClick={() => setCenter([center[0], round(center[1] - pan)])} className="button">{"<"}</button>
                <button onClick={() => setCenter([center[0], round(center[1] + pan)])} className="button">{">"}</button>
            </div>
            <div>
              <code className="label">Z</code>
              <button onClick={() => setZoom(0.1 * zoom)} className="button">-</button>
              <button onClick={() => setZoom(10 * zoom)} className="button">+</button>
            </div>
          </div>
          <div className="stats">
            <p>Current Center : {center.join(" , ")}</p>
            <p>Zoom Factor : {zoom}</p>
            <div>
              <button onClick={() => {
                setZoom(1);
                setCenter([-0.5,0]);
              }} className="reset">Reset View</button>
              <button onClick={() => setShowGrid(!showGrid)}>Show Grid</button>
            </div>
          </div>
        </div>
      </header>
      <>{Array.from(grid.values())}</>
      <footer className="footer">
        <p>Edit <code>src/App.tsx</code> and save to reload</p>
      </footer>
    </div>
  );
}

export default App;
