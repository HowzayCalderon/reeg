import { useMemo, useContext } from "react"
import {scaleBand,scaleLinear} from 'd3'
import { performanceContext } from "../../../context"


const Xaxis = () => {
    const data = useContext(performanceContext)

    const width = 1000;
    const height = 500;
        
    const yScale = scaleBand()
    .domain(!data ? [] : data.map((d:any)=> d['key']))
    .range([0,height])

    const xScale = scaleLinear()
    .domain([0,60])
    .range([0,width])

        return (
          <svg width={width} height={height}>
            {data?.map((d:any) =>  (<rect x={0} y={yScale(d['key'])} width={60} height={yScale.bandwidth()} key={d['key']}/>))}
          </svg>
        )
}

export default Xaxis