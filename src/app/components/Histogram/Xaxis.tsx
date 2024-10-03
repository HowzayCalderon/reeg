import { useMemo } from "react"
import * as d3 from 'd3'


const Xaxis = () => {
        const ticks = useMemo(() => {
          const xScale = d3.scaleLinear()
            .domain([0, 100])
            .range([10, 1000])
      
          return xScale.ticks()
            .map(value => ({
              value,
              xOffset: xScale(value)
            }))
        }, [])
        // INPUT CLASS DATA, DOMAIN REQUIRES CLASS TOPICS
        const bars = d3.scaleBand()
            .domain()

    
        return (
          <svg className="w-full">
            <path
              d="M 9.5 0.5 H 1000"
              stroke="currentColor"
            />
            {ticks.map(({ value, xOffset }) => (
              <g
                key={value}
                transform={`translate(${xOffset}, 0)`}
              >
                <line
                  y2="6"
                  stroke="currentColor"
                />
                <text
                  key={value}
                  style={{
                    fontSize: "10px",
                    textAnchor: "middle",
                    transform: "translateY(20px)"
                  }}>
                  { value }
                </text>
              </g>
            ))}
          </svg>
        )
}

export default Xaxis