const width = '800'
const height = '800'

let coords = {A:[100,100],B:[600,300]}
let perpCoords = {A:[600,300],B:[100,100]}

function midpoint(x1, y1, x2, y2) {
    return [(x1 + x2) / 2, (y1 + y2) / 2];
}

function findSlope(x1, y1, x2, y2)
{
    if (x2 - x1 != 0)
    {
        return (y2 - y1) / (x2 - x1);
    }
    return Number.MAX_VALUE;
}

let cx = midpoint(coords.A[0], coords.A[1], coords.B[0], coords.B[1])[0]
let cy = midpoint(coords.A[0], coords.A[1], coords.B[0], coords.B[1])[1]
let slope = findSlope(coords.A[0], coords.A[1], coords.B[0], coords.B[1])

console.log(slope)

var svg = d3.select('body').append('svg')
    .attr('width', width)
    .attr('height', height)

svg.append('line')
    .style("stroke", "red")
    .style("stroke-width", 2)
    .attr("x1", coords.A[0])
    .attr("y1", coords.A[1])
    .attr("x2", coords.B[0])
    .attr("y2", coords.B[1]); 

svg.append('line')
    .style("stroke", "red")
    .style("stroke-width", 2)
    .attr("x1", perpCoords.A[0])
    .attr("y1", perpCoords.A[1])
    .attr("x2", perpCoords.B[0])
    .attr("y2", perpCoords.B[1]); 

svg.append('circle')
    .attr('cx', cx)
    .attr('cy', cy)
    .attr('r', 5)
    .style('fill', 'hotpink');

