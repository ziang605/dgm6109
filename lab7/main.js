"use strict";

/* ===============================
   Configuration variables*/
let svgWidth = 600;
let svgHeight = 400;
let margin = 25;

/* Resize div to match width of visualization. */
d3.select("#container")
    .style("width", String(svgWidth) + "px");

/* Create drawing canvas */
let svg = d3.select("#canvas")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

/* Draw canvas border */
svg.append("rect")
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

/* Draw margin border (dashed guide) */
svg.append("rect")
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-dasharray", "5")
    .attr("x", margin)
    .attr("y", margin)
    .attr("width", svgWidth - margin * 2)
    .attr("height", svgHeight - margin * 2);


let dataset = [
    { gapHours: 14.78, sleepLatencyMin: 4 },   // 21/01 1pm -> 03:47
    { gapHours: 12.42, sleepLatencyMin: 15 },  // 22/01 3pm -> 03:25
    { gapHours: 14.37, sleepLatencyMin: 9 },   // 23/01 1pm -> 03:22
    { gapHours: 14.05, sleepLatencyMin: 13 },  // 26/01 1pm -> 03:03
    { gapHours: 14.47, sleepLatencyMin: 17 },  // 27/01 1pm -> 03:28
    { gapHours: 14.03, sleepLatencyMin: 27 },  // 28/01 1pm -> 03:02
    { gapHours: 12.38, sleepLatencyMin: 5 },   // 29/01 3pm -> 03:23
    { gapHours: 13.92, sleepLatencyMin: 5 },   // 02/02 1pm -> 02:55
    { gapHours: 14.18, sleepLatencyMin: 5 },   // 03/02 1pm -> 03:11
    { gapHours: 13.35, sleepLatencyMin: 6 },   // 04/02 1pm -> 02:21
    { gapHours: 11.97, sleepLatencyMin: 5 },   // 05/02 3pm -> 02:58
    { gapHours: 14.42, sleepLatencyMin: 6 },   // 06/02 1pm -> 03:25
    { gapHours: 13.78, sleepLatencyMin: 7 },   // 09/02 1pm -> 02:47
    { gapHours: 12.77, sleepLatencyMin: 49 }   // 10/02 1pm -> 01:46
];

/* Max values for labels */
let xMax = d3.max(dataset, function (d) { return d.gapHours; });
let yMax = d3.max(dataset, function (d) { return d.sleepLatencyMin; });

/* Keep origin at 0 for the required 0,0 label */
let xDomainMax = Math.ceil(xMax + 1);   // small padding
let yDomainMax = Math.ceil(yMax + 5);   // small padding

/* Scales */
let xScale = d3.scaleLinear()
    .domain([0, xDomainMax])
    .range([margin, svgWidth - margin]);

let yScale = d3.scaleLinear()
    .domain([0, yDomainMax])
    .range([svgHeight - margin, margin]);

/* Plot points */
let circles = svg.selectAll("circle")
    .data(dataset)
    .join("circle");

circles
    .attr("r", 7)
    .attr("cx", function (d) {
        return xScale(d.gapHours);
    })
    .attr("cy", function (d) {
        return yScale(d.sleepLatencyMin);
    })
    /* Optional: gray via opacity only (still black-and-white) */
    .attr("opacity", 0.75);

/**** Axis labels (units included) ****/
svg.append("text")
    .attr("x", svgWidth / 2)
    .attr("y", svgHeight - (margin / 2) + 8)  // pushed down to avoid overlap
    .attr("text-anchor", "middle")
    .text("Gap Before Bed (hours)");

svg.append("text")
    .attr("x", -svgHeight / 2)
    .attr("y", margin / 2)
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle")
    .text("Sleep Latency (minutes)")
    .attr("transform", "rotate(-90)");

/**** Key coordinate labels ****/
/* Origin label */
svg.append("text")
    .attr("x", xScale(0) - 10)                 // nudged left to avoid x-axis label
    .attr("y", svgHeight - (margin / 2) + 2)
    .attr("text-anchor", "middle")
    .text("0,0");

/* X max label */
svg.append("text")
    .attr("x", xScale(xDomainMax))
    .attr("y", svgHeight - (margin / 2) + 2)
    .attr("text-anchor", "middle")
    .text(String(xDomainMax));

/* Y max label */
svg.append("text")
    .attr("x", margin - 2)
    .attr("y", yScale(yDomainMax))
    .attr("text-anchor", "end")
    .attr("alignment-baseline", "middle")
    .text(String(yDomainMax));