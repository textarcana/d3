


var graph = d3.select("#graph").append("svg:svg").attr("width", "100%").attr("height", "100%");

var data = [5,7,1,3,6,8,2,4,5,7,1,3,6,8,2,4,5,7,1,3,6,8,2,4,5,7,1,3,6,8,2,4,5,7,1,3,6,8,2,4,5,7,1,3,6,8,2,4,5,7,1,3,6,8,2,4,5,7,1,3,6,8,2,4].reverse()

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


/* Example 2 */

d3.json("nlwest.json", function(json) {
    // calculate max and min values in the NLWest data
    var max=0, min=0, len=0;
    for(var team in json) {
        min = d3.min([d3.min(json[team]), min]);
        max = d3.max([d3.max(json[team]), max]);
        len = d3.max([json[team].length, len]);
    }

    var h = 50,
        w = 400,
        p = 2,
        fill = d3.scale.category10()
        x = d3.scale.linear().domain([0, len]).range([p, w - p]),
        y = d3.scale.linear().domain([min, max]).range([h - p, p]),
        line = d3.svg.line()
                     .x(function(d, i) { return x(i); })
                     .y(function(d) { return y(d); });

    var svg = d3.select("#sparkline")
                .append("svg:svg")
                .attr("height", h)
                .attr("width", w);

    for(var team in json) {
        var g = svg.append("svg:g");
        g.append("svg:path")
         .attr("d", line(json[team]))
         .attr("stroke", function(d) { return fill(team); })
         .attr("class", team);
        g.append("svg:title")
         .text(team);
    }
});
