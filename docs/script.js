// Refactored graph creation function
function createGraph(csvFile, elementId) {
  // Set the dimensions and margins of the graph
  var margin = { top: 50, right: 30, bottom: 50, left: 80 },
    width = 500 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

  // Append the SVG object to the body of the page
  var svg = d3.select("#" + elementId)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Read the data
  d3.csv(csvFile).then(function (data) {

    // Add X axis
    var x = d3.scaleLinear()
      .domain(d3.extent(data, function (d) { return d.year; }))
      .range([0, width]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).tickFormat(d3.format("d")))
      .append("text")      // Text for the X axis
      .attr("x", width / 2)
      .attr("y", margin.bottom / 1.5)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("fill", "#000")
      .text("Year");

    // Add Y axis
    var y = d3.scaleLinear()
      .domain([0, d3.max(data, function (d) { return +d.total_points; })])
      .range([height, 0]);
    svg.append("g")
      .call(d3.axisLeft(y))
      .append("text")      // Text for the Y axis
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left)
      .attr("x", -(height / 2))
      .attr("dy", "1em")
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("fill", "#000")
      .text("Total Points per Season");

    // Add the line
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function (d) { return x(d.year) })
        .y(function (d) { return y(d.total_points) })
      );

    svg.append("text")
      .attr("x", (width / 2))
      .attr("y", -margin.top / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "20px")
      .style("text-decoration", "underline")
      .text("Total Points per NBA Season By Year");
  });
}

// Event listeners for the buttons
document.getElementById("button1").addEventListener("click", function() {
  document.getElementById('graph1').style.display = 'block';
  document.getElementById('graph2').style.display = 'none';
  document.getElementById('graph3').style.display = 'none';
  createGraph("scores_final.csv", "graph1");
});

document.getElementById("button2").addEventListener("click", function() {
  document.getElementById('graph1').style.display = 'none';
  document.getElementById('graph2').style.display = 'block';
  document.getElementById('graph3').style.display = 'none';
  createGraph("C3pt_final.csv", "graph2");
});

document.getElementById("button3").addEventListener("click", function() {
  document.getElementById('graph1').style.display = 'none';
  document.getElementById('graph2').style.display = 'none';
  document.getElementById('graph3').style.display = 'block';
  createGraph("3pt_final.csv", "graph3");
});
