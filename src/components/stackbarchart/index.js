import { Fragment, useEffect, useRef } from "react";
import *as d3 from "d3";
import useResizeObserver from "./resizeObserver/resizeObserver.js";

function StackedBarChart({ data, keys, colors }) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);


  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect();

    const stackGenerator = d3.stack()
      .keys(keys)
      .order(d3.stackOrderAscending);
    const layers = stackGenerator(data);
    const extent = [
      0,
      d3.max(layers, layer => d3.max(layer, sequence => sequence[1]))
    ];


    const xScale = d3.scaleBand()
      .domain(data.map(d => d.month))
      .range([0, width])
      .padding(0.25);

    const yScale = d3.scaleLinear()
      .domain(extent)
      .range([height, 0]);

    svg
      .selectAll(".layer")
      .data(layers)
      .join("g")
      .attr("class", "layer")
      .attr("fill", layer => colors[layer.key])
      .selectAll("rect")
      .data(layer => layer)
      .join("rect")
      .attr("x", sequence => xScale(sequence.data.month))
      .attr("width", xScale.bandwidth())
      .attr("y", sequence => yScale(sequence[1]))
      .attr("height", sequence => yScale(sequence[0]) - yScale(sequence[1]));

    const xAxis = d3.axisBottom(xScale);
    svg
      .select(".x-axis")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxis);

    const yAxis = d3.axisLeft(yScale);
    svg.select(".y-axis").call(yAxis);
  }, [colors, data, dimensions, keys]);

  return (
    <Fragment>
      <div ref={wrapperRef} style={{ marginBottom: "2rem" }}>
        <svg ref={svgRef}>
          <g className="x-axis" />
          <g className="y-axis" />
        </svg>
      </div>
    </Fragment>
  );
}

export default StackedBarChart
