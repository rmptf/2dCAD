const width = '800'
const height = '800'

// let coords = {A:[100,100],B:[600,300]}
// let perpCoords = {A:[600,300],B:[100,100]}

let path1 = {pointA:{x:80, y:90},pointB:{x:600, y:500}}
let path2 = {pointA:{x:0, y:0},pointB:{x:0, y:0}}

function midpoint(x1, y1, x2, y2) {
    return [(x1 + x2) / 2, (y1 + y2) / 2];
}

let cx = midpoint(path1.pointA.x, path1.pointA.y, path1.pointB.x, path1.pointB.y)[0]
let cy = midpoint(path1.pointA.x, path1.pointA.y, path1.pointB.x, path1.pointB.y)[1]

function findSlope(x1, y1, x2, y2)
{
    if (x2 - x1 != 0)
    {
        return (y2 - y1) / (x2 - x1);
    }
    return Number.MAX_VALUE;
}

path2.pointA.x = 300
path2.pointA.y = 10
// (blue point)

// This draws a perpendicular line from some point on path1 to a set point
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

    // console.log('p2Bx = ')
    // console.log(path2.pointB.x)

    // console.log(interceptOfpath1)
    // console.log(interceptOfpath2)
    // console.log(gradientOfpath1)
    // console.log(gradientOfpath2)


    // Path1:
    // slope1 = (a1Y - b1Y) / (a1X - b1X)
    // intercept1 = a1Y - slope1 * a1X

    // Path2:
    // slope2 = -1 / slope
    // intercept2 = a2Y - slope2 * a2X

    // b2X = (intercept1 - intercept2) / (slope2 - slope1) // x = (b1 - b2) / (m1 - m2)
    // // point slope formula??: (y – y1) = m(x – x1) 
    // b2Y = slope2 * b2X + intercept2 // y = mx + b
    // // slope intercept formular: y = mx + b

    // path3:
    // set (b3X, b3Y) to (Path1 midpoint X, Path1 midpoint Y)
    // slope3 = -1 / slope
    // intercept3 = b3Y - slope3 * b3X

    // a3X = set length along slope3
    // a3Y = set length along slope3


    
    //     y = mx + b

    // y = (slope3 * x) + yIntercept    

    // path2.pointB.x = 0;
    // path2.pointB.y = -interceptOfpath2 / gradientOfpath2;
    }


var svg = d3.select('body').append('svg')
    .attr('width', width)
    .attr('height', height)

svg.append('line')
    .style("stroke", "red")
    .style("stroke-width", 2)
    .attr("x1", path1.pointA.x)
    .attr("y1", path1.pointA.y)
    .attr("x2", path1.pointB.x)
    .attr("y2", path1.pointB.y);

svg.append('line')
    .style("stroke", "black")
    .style("stroke-width", 2)
    .attr("x1", path2.pointA.x)
    .attr("y1", path2.pointA.y)
    .attr("x2", path2.pointB.x)
    .attr("y2", path2.pointB.y);

svg.append('circle')
    .attr('cx', cx)
    .attr('cy', cy)
    .attr('r', 5)
    .style('fill', 'hotpink');

svg.append('circle')
    .attr('cx', path2.pointA.x)
    .attr('cy', path2.pointA.y)
    .attr('r', 5)
    .style('fill', 'blue');

svg.append('circle')
    .attr('cx', path2.pointB.x)
    .attr('cy', path2.pointB.y)
    .attr('r', 5)
    .style('fill', 'green');