import React,{useState,useRef,useEffect} from 'react';
import useInterval from 'use-interval';
import * as d3 from 'd3';
import './App.css';

const Circle = () => {
  const circleGenrator=()=>(
    Array(10).fill(10).map(()=>[
      Math.random() * 80 + 10,
      Math.random() * 35 + 10
    ])
  )
  const [data,setData] = useState(circleGenrator())
  const ref = useRef()

useEffect(()=>{
  // let scaleValues = [1,2,3,4,5,6,7,8]
  const xAxis = d3.scaleLinear().domain([0,10]).range([10,80])
  const axis = d3.axisBottom(xAxis).ticks(4)

  let svgElement = d3.select(ref.current).attr("transform","translate(110,111)")
      // svgElement.selectAll("circle").data(data)
      //           .join("circle")
      //           .attr("cx",d=>d[0])
      //           .attr("cy",d=>d[1])
      //           .attr("r",3)
      //           .style("fill","red")
      svgElement.selectAll("circle").data(data,d=>d)
                      .join(
                        enter => (
                          enter.append("circle")
                               .attr("cx",d=> Math.round(d[0]) )
                               .attr("cy",10)
                               .attr("r",0)
                               .attr("fill","blue")
                                 .call(
                                   enter => (
                                     enter.transition().duration(1200)
                                     .attr("cy",10)
                                     .attr("r",6)
                                     .style("opacity",1)
                                   )
                                 )
                        ),
                        update => (
                          update.attr("fill","yellow")
                        ),
                        exit => (
                          exit.attr("fill","red")
                              .call(
                                exit => (
                                  exit.transition().duration(1200)
                                      .attr("r",0)
                                      .style("opacity",0)
                                      .remove()
                                )
                              )
                        ),
                      )
  svgElement.call(axis)

},[data])

useInterval(()=>{
  setData(circleGenrator())
},2000)

  return(
    <svg ref={ref}  viewBox = "0 0 100 20" />
  )
}
export default Circle
