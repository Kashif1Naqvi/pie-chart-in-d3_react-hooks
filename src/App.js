import React from 'react';
import './index.css';
import PieChart from './PieChart';
import * as d3 from 'd3';
import faker from 'faker'
function genrateData(level){
  let N = d3.randomUniform(1,10)()
  return d3.range(N).map(i => ({
    value: Math.abs(d3.randomNormal()()),
       id: `${level}-${i}`,
       name: faker.internet.userName(),
    children: level > 0 ?  genrateData(level - 1 ) : []
  }))
}
function App(){
  const data = genrateData(4)
  console.log(data)
  return(
    <div className="App" >
        <h1>DrillDown pie chart</h1>
        <svg height="500" width="500" >
            <PieChart data={data} x={250} y={250}  />
        </svg>
    </div>
  )
}
export default App;
