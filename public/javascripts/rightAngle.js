const width = '800'
const height = '800'

let path1 = {pointA:{x:79, y:400},pointB:{x:600, y:544}}

// Find the length of a line segment between two coordinates
function getDistance(x1, y1, x2, y2){
    let y = x2 - x1;
    let x = y2 - y1;
    
    return Math.sqrt(x * x + y * y);
}

// Find the slope of a line segment between two coordinates
function findSlope(x1, y1, x2, y2)
{
    if (x2 - x1 != 0)
    {
        return (y2 - y1) / (x2 - x1);
    }
    return Number.MAX_VALUE;
}

// Find the midpoint of a line segment between two coordinates
function midpoint(x1, y1, x2, y2) {
    return [(x1 + x2) / 2, (y1 + y2) / 2];
}
let cx = midpoint(path1.pointA.x, path1.pointA.y, path1.pointB.x, path1.pointB.y)[0]
let cy = midpoint(path1.pointA.x, path1.pointA.y, path1.pointB.x, path1.pointB.y)[1]

// Test Math functions
function getCircleY(radians) {
    return Math.sin(radians);
    }
// console.log(getCircleY(1.0472))

// Calculate angle of right triangle created by line segment of two coordinates
let poly1Coord1 = [0,0]
let poly1Coord2 = [0,0]
let poly1Coord3 = [0,0]

let poly2Coord1 = [0,0]
let poly2Coord2 = [0,0]
let poly2Coord3 = [0,0]

function solveTraingle() {
    let coord_A = path1.pointB
    let coord_B = path1.pointA
    let coord_C = [path1.pointA.x,path1.pointB.y]
    let path_a = getDistance(coord_B.x,coord_B.y,coord_C[0],coord_C[1])
    let path_b = getDistance(coord_C[0],coord_C[1],coord_A.x,coord_A.y)
    let path_c = getDistance(coord_B.x,coord_B.y,coord_A.x,coord_A.y)
    let sinOfAngle_A = path_a / path_c
    let angle_A = Math.asin(sinOfAngle_A) * 180/Math.PI

    drawPerpendicular(angle_A, path_c)
    poly1Coord1 = coord_A
    poly1Coord2 = coord_B
    poly1Coord3 = coord_C
}
solveTraingle()

function drawPerpendicular(base_angle_A, base_path_c){
    let angle_A = (base_angle_A) * (Math.PI/180)
    let coord_A = midpoint(path1.pointA.x, path1.pointA.y, path1.pointB.x, path1.pointB.y)
    let path_c = (base_path_c / 2)
    let path_a = path_c*(Math.sin(angle_A))
    let path_b = path_c*(Math.cos(angle_A))
    let coord_C = [(coord_A[0] + path_a),coord_A[1]]
    let coord_B = [coord_C[0], (coord_C[1] - path_b)]

    poly2Coord1 = coord_A
    poly2Coord2 = coord_B
    poly2Coord3 = coord_C

    // d3.select("body").insert("div")
    // .text(angle_A)
}

// Draw a perpendicular line from specified coordinate to line segment between two specified coordinates
let path2 = {pointA:{x:0, y:0},pointB:{x:0, y:0}}
path2.pointA.x = 300
path2.pointA.y = 10
// (blue point)

if (path1.pointA.y == path1.pointB.y) { // AB is horizontal
    path2.pointB.x = path2.pointA.x
    path2.pointB.y = path1.pointA.y
    } else if (path1.pointA.x == path1.pointB.x) { // AB is vertical
    path2.pointB.x = path1.pointA.x
    path2.pointB.y = path2.pointA.y
    } else { // need some geometry

    var gradientOfpath1 = (path1.pointA.y - path1.pointB.y) / (path1.pointA.x - path1.pointB.x);
    var interceptOfpath1 = path1.pointA.y - gradientOfpath1 * path1.pointA.x;
    
    var gradientOfpath2 = -1 / gradientOfpath1;
    var interceptOfpath2 = path2.pointA.y - gradientOfpath2 * path2.pointA.x;
    
    path2.pointB.x = (interceptOfpath1 - interceptOfpath2) / (gradientOfpath2 - gradientOfpath1);
    path2.pointB.y = gradientOfpath2 * path2.pointB.x + interceptOfpath2;
    // (green point)
}




// Draw SVGs
// var svg = document.querySelector("#arc-shape")
var svg = d3.select('body').append('svg')
    .attr('width', width)
    .attr('height', height)

// Path1 Path
svg.append('line')
    .style("stroke", "red")
    .style("stroke-width", 2)
    .attr("x1", path1.pointA.x)
    .attr("y1", path1.pointA.y)
    .attr("x2", path1.pointB.x)
    .attr("y2", path1.pointB.y)

// Path1 Points
svg.append('circle')
    .attr('cx', path1.pointA.x)
    .attr('cy', path1.pointA.y)
    .attr('r', 5)
    .style('fill', 'black');
    
svg.append('circle')
    .attr('cx', path1.pointB.x)
    .attr('cy', path1.pointB.y)
    .attr('r', 5)
    .style('fill', 'brown');

// Path1 Midpoint
svg.append('circle')
    .attr('cx', cx)
    .attr('cy', cy)
    .attr('r', 5)
    .style('fill', 'hotpink');

// Path1 Triangle Paths
svg.append('line')
    .style("stroke", "grey")
    .style("stroke-width", .5)
    .attr("x1", poly1Coord1.x)
    .attr("y1", poly1Coord1.y)
    .attr("x2", poly1Coord2.x)
    .attr("y2", poly1Coord2.y)

svg.append('line')
    .style("stroke", "grey")
    .style("stroke-width", .5)
    .attr("x1", poly1Coord1.x)
    .attr("y1", poly1Coord1.y)
    .attr("x2", poly1Coord3[0])
    .attr("y2", poly1Coord3[1])

svg.append('line')
    .style("stroke", "grey")
    .style("stroke-width", .5)
    .attr("x1", poly1Coord2.x)
    .attr("y1", poly1Coord2.y)
    .attr("x2", poly1Coord3[0])
    .attr("y2", poly1Coord3[1])

// Path1 Triangle Points
svg.append('circle')
    .attr('cx', poly1Coord1.x)
    .attr('cy', poly1Coord1.y)
    .attr('r', 2.5)
    .style('fill', 'green');

svg.append('circle')
    .attr('cx', poly1Coord2.x)
    .attr('cy', poly1Coord2.y)
    .attr('r', 2.5)
    .style('fill', 'yellow');

svg.append('circle')
    .attr('cx', poly1Coord3[0])
    .attr('cy', poly1Coord3[1])
    .attr('r', 2.5)
    .style('fill', 'grey');

// Path2 Path
svg.append('line')
    .style("stroke", "red")
    .style("stroke-width", 2)
    .attr("x1", poly2Coord1[0])
    .attr("y1", poly2Coord1[1])
    .attr("x2", poly2Coord2[0])
    .attr("y2", poly2Coord2[1])

// Path2 Triangle Paths
svg.append('line')
    .style("stroke", "grey")
    .style("stroke-width", .5)
    .attr("x1", poly2Coord1[0])
    .attr("y1", poly2Coord1[1])
    .attr("x2", poly2Coord2[0])
    .attr("y2", poly2Coord2[1])

svg.append('line')
    .style("stroke", "grey")
    .style("stroke-width", .5)
    .attr("x1", poly2Coord1[0])
    .attr("y1", poly2Coord1[1])
    .attr("x2", poly2Coord3[0])
    .attr("y2", poly2Coord3[1])

svg.append('line')
    .style("stroke", "grey")
    .style("stroke-width", .5)
    .attr("x1", poly2Coord2[0])
    .attr("y1", poly2Coord2[1])
    .attr("x2", poly2Coord3[0])
    .attr("y2", poly2Coord3[1])

//Path2 Triangle Points
svg.append('circle')
    .attr('cx', poly2Coord1[0])
    .attr('cy', poly2Coord1[1])
    .attr('r', 2.5)
    .style('fill', 'red');

svg.append('circle')
    .attr('cx', poly2Coord2[0])
    .attr('cy', poly2Coord2[1])
    .attr('r', 2.5)
    .style('fill', 'yellow');

svg.append('circle')
    .attr('cx', poly2Coord3[0])
    .attr('cy', poly2Coord3[1])
    .attr('r', 2.5)
    .style('fill', 'grey');


// // Path3 Path
// svg.append('line')
//     .style("stroke", "black")
//     .style("stroke-width", 2)
//     .attr("x1", path2.pointA.x)
//     .attr("y1", path2.pointA.y)
//     .attr("x2", path2.pointB.x)
//     .attr("y2", path2.pointB.y);

// // Path3 Points
// svg.append('circle')
//     .attr('cx', path2.pointA.x)
//     .attr('cy', path2.pointA.y)
//     .attr('r', 5)
//     .style('fill', 'blue');

// svg.append('circle')
//     .attr('cx', path2.pointB.x)
//     .attr('cy', path2.pointB.y)
//     .attr('r', 5)
//     .style('fill', 'green');