"use strict";

document.getElementById("action").addEventListener("click", processForm);

let xInput, yInput, choice;

function processForm() {
  /* Get data from the form */
  xInput = Number(document.getElementById("xInput").value);
  yInput = Number(document.getElementById("yInput").value);

  /* STEP 9: CHECK SELECT MENU OPTION HERE USING VARIABLE CHOICE */
  choice = document.getElementById("choice").value;
  console.log("choice =", choice);

  // Clear everything except the border
  drawing.selectAll("svg>*:not(#border)").remove();

  // Call external drawing function (Lab 5 requirement)
  drummer(drawing, xInput, yInput, true, choice);
}

/* set up the drawing canvas */
let drawing = d3.select("#canvas")
  .append("svg")
  .attr("width", 500)
  .attr("height", 500);

let border = drawing.append("rect")
  .attr("id", "border")
  .attr("width", 500)
  .attr("height", 500)
  .attr("fill", "none")
  .attr("stroke", "red");