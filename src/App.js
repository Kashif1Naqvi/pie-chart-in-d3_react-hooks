import React from 'react';
import './index.css';
import chorma from 'chroma-js'
import DrilldownPie from './DrilldownPie';
import * as d3 from 'd3';
import faker from 'faker'

function genrateData(level,prevIndex,color){
  let N = d3.randomUniform(3,10)()
  const colors = color
      ? d3.range(N).map(i =>
          chorma(color)
            .brighten(i * 0.1)
            .hex())
            : d3.schemePaired;

  return d3.range(N).map(i => ({
       value: Math.abs(d3.randomNormal()()),
       id: `${level}-${i}`,
       level:level,
       index:i,
       prevIndex:prevIndex,
       name: faker.internet.userName(),
       color:colors[i],
       children: level > 0 ?  genrateData(level - 1 ) : []
  }));
}
function App(){
  const data = genrateData(6)
  console.log(data)
  return(
    <div className="App" >
        <h1>DrillDown pie chart in React & D3</h1>
        <svg height="500" width="500" >
            <DrilldownPie data={data} x={250} y={250}  />
        </svg>
    </div>
  )
}
export default App;
