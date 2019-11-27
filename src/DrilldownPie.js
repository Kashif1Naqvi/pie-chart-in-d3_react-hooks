import React,{useState,useReducer,useEffect} from 'react'
import * as d3 from 'd3'
import styled from "styled-components";

// const style = {
//   stroke:"black",
//   cursor:"pointer"
// }

const Path = styled.path`
  fill: ${props => props.color};
  cursor: pointer;
  stroke: black;
`;

function useDrillableData(data){
    const initialState = {
      renderData : data,
      stack: [],
      startAngle: 0
    };
  return useReducer((state,action) => {
    switch(action.type){
      case "drilldown":
        return {
          renderData : state.renderData[action.index].children,
          stack:       [...state.stack, state.renderData],
          startAngle:  action.startAngle
        };
      case "drillup":
        if(state.stack.length > 0 ){
          return {
            renderData:  state.stack.slice(-1)[0],
            stack:       state.stack.slice(0,-1),
            startAngle:  state.startAngle
          };
        } else {
          return state;
        }
      default:
        return state;
    }
  },initialState);
}


const  Arc = ({ arcData , onClick }) => {
  const [radiusAdd , setRadiusAdd] = useState(0)
  const arc =  d3.arc().innerRadius(15 + radiusAdd/2 ).outerRadius(205 + radiusAdd);

  function mouseover(){
    setRadiusAdd(20)
  }

  function mouseout(){
    setRadiusAdd(0)
  }



    return(<g>
      <Path
          d={arc(arcData)}
          color={arcData.data.color}
          onMouseOver={mouseover}
          onMouseOut={mouseout}
          onClick={()=>onClick(arcData)
           }

         />
         </g>
       );
}

const DrilldownPie=({data,x,y})=>{
  const [{renderData, startAngle },dispatch] = useDrillableData(data)
  const [ percentVisible , setPercentVisible ] = useState(0)
  const pie = d3.pie()
                .startAngle(startAngle)
                .endAngle(startAngle + percentVisible * Math.PI * 2 )
                .value(d => d.value);

  function drilldown({ startAngle , index }){
      // setRenderData(renderData[index].children)
      console.log(startAngle)
      dispatch({ type: "drilldown" , index, startAngle })
  }

  function drillup(){

    dispatch({  type: "drillup" });

  }

  useEffect(()=>{
    d3.selection()
      .transition("pie-reveal")
      .duration(3000)
      .ease(d3.easeSinInOut)
      .tween("percentVisible",() => {
        const percentInterpolate = d3.interpolate(0,100);
        return t => setPercentVisible(percentInterpolate(t))
      });
  },[renderData]);
  return(
    <g transform={`translate(${x},${y})`}>
      {
        pie(renderData).map(d=>(
          <Arc arcData={d} key={d.id}  onClick={drilldown}  />
        ))
      }
      <circle cx={0} cy={0} r={15} fill="black" onClick={drillup} ></circle>
    </g>
  )
}
export default DrilldownPie;
