


var graph = d3.select("#graph").append("svg:svg").attr("width", "100%").attr("height", "100%");

var data = [5,7,1,3,6,8,2,4,5,7,1,3,6,8,2,4,5,7,1,3,6,8,2,4,5,7,1,3,6,8,2,4,5,7,1,3,6,8,2,4,5,7,1,3,6,8,2,4,5,7,1,3,6,8,2,4,5,7,1,3,6,8,2,4].reverse();

var webDeploysPerDay2011 = [22, 0, 0, 29, 26, 24, 27, 19, 1, 0, 21, 15, 13, 10, 4, 0, 5, 2, 0, 24, 32, 28, 6, 2, 37, 31, 33, 28, 27, 0, 1, 37, 27, 24, 30, 26, 3, 0, 19, 21, 22, 29, 24, 1, 0, 31, 23, 26, 34, 29, 0, 0, 29, 23, 33, 18, 28, 0, 0, 27, 32, 31, 33, 5, 0, 5, 27, 20, 28, 18, 23, 1, 2, 25, 20, 26, 21, 25, 5, 0, 19, 27, 28, 27, 29, 1, 2, 18, 20, 27, 23, 29, 7, 4, 27, 31, 30, 20, 1, 2, 5, 28, 17, 20, 38, 30, 3, 8, 36, 27, 23, 24, 27, 5, 0, 16, 27, 33, 23, 22, 0, 0, 20, 22, 23, 18, 32, 0, 2, 29, 25, 29, 29, 30, 0, 0, 29, 14, 23, 27, 17, 2, 3, 24, 22, 27, 27, 30, 8, 0, 18, 18, 30, 24, 33, 1, 1, 21, 19, 28, 36, 1, 1, 4, 28, 23, 30, 34, 30, 0, 0, 22, 23, 36, 11, 22, 2, 3, 21, 22, 31, 23, 19, 0, 0, 20, 28, 22, 22, 18, 3, 1, 27, 19, 24, 17, 0, 0, 0, 26, 14, 20, 23, 16, 0, 0, 17, 15, 18, 17, 21, 0, 0, 17, 19, 20, 23, 16, 0, 0, 21, 21, 24, 20, 16, 0, 0, 18, 18, 20, 27, 24, 3, 3, 26, 22, 22, 10, 19, 0, 4, 24, 23, 13, 21, 15, 0, 2, 18, 13, 15, 16, 16, 0, 1, 17, 16, 19, 15, 13, 0, 2, 21, 21, 13, 20, 13, 0, 0, 16, 20, 18, 17, 21, 0, 4, 24, 20, 24, 19, 20, 1, 3, 22, 20, 22, 24, 17, 0, 0, 23, 22, 21, 20, 0, 8, 2, 13, 16, 14, 14, 16, 4, 1, 16, 23, 16, 26, 19, 3, 2, 22, 19, 16, 23, 17, 0, 2, 2, 13, 19, 15, 25, 0, 3, 26, 27, 22, 18, 0, 2, 0, 20, 13, 19, 16, 17, 0, 1, 12, 14, 23, 14, 22, 0, 0, 0, 7, 17, 3, 14, 0, 0, 0, 11, 9, 18, 19, 0, 0, 8, 14, 11, 14, 6, 0].reverse();

data = webDeploysPerDay2011;

var x = d3.scale.linear().domain([0, 366]).range([0, 366]);
var y = d3.scale.linear().domain([40, 0]).range([0, 20]);

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
