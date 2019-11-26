import React,{useState} from 'react'
import * as d3 from 'd3'

const style = {
  stroke:"black",
  cursor:"pointer"
}

const  Arc = ({arcData,onClick}) => {
  const [radiusAdd,setRadiusAdd] = useState(0)

  function mouseover(){
    setRadiusAdd(20)
  }
  function mouseout(){
    setRadiusAdd(0)
  }

  const arc =  d3.arc().innerRadius(radiusAdd + 15).outerRadius(205 + radiusAdd);
    return <path d={arc(arcData)} onClick={onClick} fill={d3.interpolateBuPu(arcData.data.value)} onMouseOver={mouseover} onMouseOut={mouseout}  style={style}  />;
}

const PieChart=({data,x,y})=>{
  const [renderData,setRenderData] = useState(data)

  function drillDown(index){
      setRenderData(renderData[index].children)
  }

  const pie = d3.pie().value(d=>d.value)
  return(
    <g transform={`translate(${x},${y})`}>
      {
        pie(renderData).map((d,i)=>(
          <Arc arcData={d} key={i} onClick={ () => drillDown(d.index) }  />
        ))
      }
    </g>
  )
}
export default PieChart;
