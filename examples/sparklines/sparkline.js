var graph = d3.select("#graph").append("svg:svg").attr("width", "100%").attr("height", "100%");

var data = [3, 6, 2, 7, 5, 2, 1, 3, 8, 9, 2, 5, 9, 3, 6, 3, 6, 2, 7, 5, 2, 1, 3, 8, 9, 2, 5, 9, 2, 7, 5, 2, 1, 3, 8, 9, 2, 5, 9, 3, 6, 2, 7, 5, 2, 1, 3, 8, 9, 2, 5, 9];

var x = d3.scale.linear().domain([0, 10]).range([0, 50]);
var y = d3.scale.linear().domain([0, 10]).range([0, 30]);

var line = d3.svg.line()
  .x(function(d,i) { 
    console.log('Plotting X value for data point: ' + d + ' using index: ' + i + ' to be at: ' + x(i) + ' using our xScale.');
    return x(i); 
  })
  .y(function(d) { 
    console.log('Plotting Y value for data point: ' + d + ' to be at: ' + y(d) + " using our yScale.");
    return y(d); 
  })

graph.append("svg:path").attr("d", line(data));


