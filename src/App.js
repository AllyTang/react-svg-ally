import React, { useState } from 'react';
import './style/App.scss';
const validPlotType = ['r', 'c', 'p'];

export default function App() {
  const [arr, setArr] = useState([]);
  const [str, setStr] = useState('');
  const [color, setColor] = useState('pink');

  function checkCommand(arr) {
    arr.forEach((plot, index) => {
      const type = plot.trim().slice(0, 1);
      let params;
      if (type === 'r') {
        params = plot.substring(1).trim().split(' ');
        if (params.length !== 4) {
          alert('Set rectangle parameter like this r 100 50 100 100');
        }
      } else if (type === 'c') {
        params = plot.substring(1).trim().split(' ');

        if (params.length !== 3) {
          alert('Set circle command like this c 100 100 20 ');
        }
      } else if (type === 'p') {
        params = plot.substring(1).trim();
        if (params.split(' ').length !== 3) {
          alert('Set polygon commands like this p 200,10 250,190 160,210');
        }
      }
    });
  }
  function outPut() {
    const colors = [
      'blue',
      'pink',
      'yellow',
      'red',
      'purple',
      'orange',
      'green',
    ];
    let item = colors[Math.floor(Math.random() * colors.length)];
    setColor(item);
    const arr = str.split('\n');
    setArr(arr);
    checkCommand(arr);
  }
  const handleChange = (e) => {
    setStr(e.target.value);
  };
  return (
    <div className='container'>
      <svg
        className='shapes'
        width='250px'
        height='250px'
        xmlns='http://www.w3.org/2000/svg'
        version='1.1'
      >
        {arr &&
          arr.map((plot, index) => {
            const type = plot.trim().slice(0, 1);
            if (!validPlotType.includes(type)) return;
            let params;
            switch (type) {
              case 'r':
                params = plot.substring(1).trim().split(' ');

                return (
                  <rect
                    key={index}
                    x={params[0]}
                    y={params[1]}
                    width={params[2]}
                    height={params[3]}
                    style={{
                      fill: { color },
                      strokeWidth: '1',
                      stroke: 'rgb(0,0,0)',
                    }}
                  />
                );
              case 'c':
                params = plot.substring(1).trim().split(' ');

                return (
                  <circle
                    key={index}
                    cx={params[0]}
                    cy={params[1]}
                    r={params[2]}
                    stroke='lightblue'
                    strokeWidth='2'
                    fill={color}
                  />
                );

              case 'p':
                params = plot.substring(1).trim();

                return (
                  <polygon
                    key={index}
                    points={params}
                    stroke='lightblue'
                    strokeWidth='2'
                    fill={color}
                  />
                );
              default:
                break;
            }
          })}
      </svg>
      <textarea
        className='command'
        name=''
        id=''
        cols='30'
        rows='10'
        onChange={handleChange}
        placeholder='Example&#10;p 200,10 250,190 160,210&#10;c 125 125 125&#10;r 100 50 120 120'
      ></textarea>
      <button className='btn' onClick={outPut}>
        render
      </button>
    </div>
  );
}
