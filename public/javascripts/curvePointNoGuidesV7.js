const width = '100%'
const height = '675px'

let svg = d3.select('body').append('svg')
    .attr('width', width)
    .attr('height', height)

d3.select("body").insert("div")
    .append("button")
    .text("Draw Line")
    .on("click", drawLine);

function drawLine() {
    let self = this, line, lineData = [], curvePointData = [],  m1, m2, isDown = false, isDrag = false;

    svg.on('mousedown', function(event) {
        m1 = d3.pointer(event)
        if (!isDown && !isDrag) {
            // LINE
            self.lineData = [ { x: m1[0], y: m1[1] }, { x: m1[0], y: m1[1] } ];
            // LINE

            // PATH
            self.pathElement = svg.append('path').attr('class', 'path');
            self.pathElement2 = svg.append('path').attr('class', 'path');
            // PATH

            // END POINTS
            self.pointElement1 = svg.append('circle').attr('class', 'pointC');
            self.pointElement2 = svg.append('circle').attr('class', 'pointC');
            // END POINTS

            // CURVE POINT
            self.curvePointData = [{ x: m1[0], y: m1[1] }];
            self.pointElementCP = svg.append('circle').attr('class', 'pointC');
            // CURVE POINT
            
            updateFigureA()
            isDrag = false;
        } else {
            isDrag = true;
            self.pointElement1.call(dragC1)
            self.pointElement2.call(dragC2)
            self.pointElementCP.call(dragC3)
        }
        isDown = !isDown
    })
    
    .on('mousemove', function(event) {
        m2 = d3.pointer(event)
        if(isDown && !isDrag) { 
            let midPoint = findLineMidpoint(self.lineData[0].x, self.lineData[0].y, m2[0], m2[1])
            self.lineData[1] = { x: m2[0], y: m2[1] };
            self.curvePointData = [{ x: midPoint[0], y:  midPoint[1]}];
            updateFigureA();
        } 
    });  

    // END POINTS
    let dragC1 = d3.drag().on('drag', dragPoint1);
    let dragC2 = d3.drag().on('drag', dragPoint2);
    // END POINTS
    
    // CURVE POINTS
    let dragC3 = d3.drag().on('drag', dragPoint3);
    // CURVE POINTS

    // END POINTS
    function dragPoint1(event) {
        d3.select(self.pointElement1._groups[0][0])
            .attr('cx', self.lineData[0].x += event.dx )
            .attr('cy', self.lineData[0].y += event.dy );  
        updateFigureA();   
    }   
    
    function dragPoint2(event) {
        d3.select(self.pointElement2._groups[0][0])
            .attr('cx', self.lineData[1].x += event.dx )
            .attr('cy', self.lineData[1].y += event.dy );
        updateFigureA();   
    }
    // END POINTS

    // CURVE POINT
    function dragPoint3(event) {
        d3.select(self.pointElementCP._groups[0][0])
            .attr('cx', self.curvePointData[0].x += event.dx )
            .attr('cy', self.curvePointData[0].y += event.dy );
        updateFigureA();   
    }
    // CURVE POINT
    

    function updateFigureA() {
        let curvePointAnchor = findPerpendicularFromPoint(self.lineData, self.curvePointData[0])

        let rightTriangleDataA = findRightTriangle(self.lineData[0], self.curvePointData[0])
        let solveTriangleDataA = solvTriangleALL(rightTriangleDataA.sides, self.lineData[0].x, self.lineData[0].y, self.lineData[1].x, self.lineData[1].y, self.curvePointData[0].x, self.curvePointData[0].y, curvePointAnchor[0], curvePointAnchor[1])
        let intersectingPointA = findIntersectingPoint(self.curvePointData[0].x, self.curvePointData[0].y, curvePointAnchor[0], curvePointAnchor[1], solveTriangleDataA.coords.coord_A[0], solveTriangleDataA.coords.coord_A[1], solveTriangleDataA.coords.coord_B[0], solveTriangleDataA.coords.coord_B[1])
        let circRadiusA = getDistance(self.curvePointData[0].x, self.curvePointData[0].y, intersectingPointA.x, intersectingPointA.y)

        let rightTriangleDataB = findRightTriangle(self.curvePointData[0], self.lineData[1])
        let solveTriangleDataB = solvTriangleALL(rightTriangleDataB.sides, self.lineData[1].x, self.lineData[1].y, self.lineData[0].x, self.lineData[0].y, self.curvePointData[0].x, self.curvePointData[0].y, curvePointAnchor[0], curvePointAnchor[1])
        let intersectingPointB = findIntersectingPoint(self.curvePointData[0].x, self.curvePointData[0].y, curvePointAnchor[0], curvePointAnchor[1], solveTriangleDataB.coords.coord_A[0], solveTriangleDataB.coords.coord_A[1], solveTriangleDataB.coords.coord_B[0], solveTriangleDataB.coords.coord_B[1])
        let circRadiusB = getDistance(self.curvePointData[0].x, self.curvePointData[0].y, intersectingPointB.x, intersectingPointB.y)

        // PATH
        let path = d3.select(self.pathElement._groups[0][0])
        path.style('fill', 'none')
        path.style('stroke', 'grey')
        path.style('stroke-width', 3)

        let path2 = d3.select(self.pathElement2._groups[0][0])
        path2.style('fill', 'none')
        path2.style('stroke', 'grey')
        path2.style('stroke-width', 3)
        
        if(inRange(self.curvePointData[0].x, (curvePointAnchor[0] - 0.5), (curvePointAnchor[0]) + 0.5) === true && inRange(self.curvePointData[0].y, (curvePointAnchor[1] - 0.5), (curvePointAnchor[1]) + 0.5)) {
            console.log('str')
            path.attr('d', describeStraightPath(self.lineData[0].x, self.lineData[0].y, self.curvePointData[0].x, self.curvePointData[0].y))
            path2.attr('d', describeStraightPath(self.curvePointData[0].x, self.curvePointData[0].y, self.lineData[1].x, self.lineData[1].y))
            path.style('stroke', 'red')
            path2.style('stroke', 'blue')
        } else {
            console.log('arc')
            path.attr('d', describeArcPath(circRadiusA, self.curvePointData[0].x, self.curvePointData[0].y, self.lineData[0].x, self.lineData[0].y, solveTriangleDataA.arcFlag, solveTriangleDataA.sweepFlagWest))
            path2.attr('d', describeArcPath(circRadiusB, self.lineData[1].x, self.lineData[1].y, self.curvePointData[0].x, self.curvePointData[0].y, solveTriangleDataB.arcFlag, solveTriangleDataB.sweepFlagEast))
        }
        // PATH

        // END POINTS
        let point1 = d3.select(self.pointElement1._groups[0][0]);
        point1.attr('r', 5)
                .attr('cx', self.lineData[0].x)
                .attr('cy', self.lineData[0].y)
                .attr('fill', '#97b9e9');

        let point2 = d3.select(self.pointElement2._groups[0][0]);
        point2.attr('r', 5)
                .attr('cx', self.lineData[1].x)
                .attr('cy', self.lineData[1].y)
                .attr('fill', '#97b9e9');
        // END POINTS

        // CURVE POINT
        let pointCP = d3.select(self.pointElementCP._groups[0][0]);
        pointCP.attr('r', 5)
                .attr('cx', self.curvePointData[0].x)
                .attr('cy', self.curvePointData[0].y)
                .attr('fill', 'pink');
        // CURVE POINT
    }
}




// Find the length of a line segment between two coordinates
function getDistance(x1, y1, x2, y2) {
    let y = x2 - x1;
    let x = y2 - y1;
    
    return Math.sqrt(x * x + y * y);
}

// Find the midpoint of a line segment between two coordinates
function findLineMidpoint(x1, y1, x2, y2) {
    return [(x1 + x2) / 2, (y1 + y2) / 2];
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

function findPerpendicularFromPoint(lineData, curvePoint){
    let path1 = {pointA:{x:lineData[0].x, y:lineData[0].y},pointB:{x:lineData[1].x, y:lineData[1].y}}
    let path2 = {pointA:{x:0, y:0},pointB:{x:0, y:0}}
    path2.pointA.x = curvePoint.x
    path2.pointA.y = curvePoint.y

    if (path1.pointA.y == path1.pointB.y) { // AB is horizontal
        path2.pointB.x = path2.pointA.x
        path2.pointB.y = path1.pointA.y

        let xy2 = [path2.pointB.x, path2.pointB.y]
        
        return xy2
    } else if (path1.pointA.x == path1.pointB.x) { // AB is vertical
        path2.pointB.x = path1.pointA.x
        path2.pointB.y = path2.pointA.y

        let xy2 = [path2.pointB.x, path2.pointB.y]
        
        return xy2
    } else { // need some geometry
        let gradientOfpath1 = (path1.pointA.y - path1.pointB.y) / (path1.pointA.x - path1.pointB.x);
        let interceptOfpath1 = path1.pointA.y - gradientOfpath1 * path1.pointA.x;
        let gradientOfpath2 = -1 / gradientOfpath1;
        let interceptOfpath2 = path2.pointA.y - gradientOfpath2 * path2.pointA.x;
        path2.pointB.x = (interceptOfpath1 - interceptOfpath2) / (gradientOfpath2 - gradientOfpath1);
        path2.pointB.y = gradientOfpath2 * path2.pointB.x + interceptOfpath2;

        let xy2 = [path2.pointB.x, path2.pointB.y]
        
        return xy2
    }
}

function findRightTriangle(startCoords, endCoords) {
    let rightTriangleDataA = {
        coords: {
            coord_A:[startCoords.x, startCoords.y],
            coord_B:[endCoords.x, endCoords.y],
            coord_C:[endCoords.x, startCoords.y],
        },
        sides: {
            side_A: getDistance(endCoords.x, endCoords.y, endCoords.x, startCoords.y),
            side_B: getDistance(endCoords.x, startCoords.y, startCoords.x, startCoords.y),
            side_C: getDistance(endCoords.x, endCoords.y, startCoords.x, startCoords.y)
        },
    }
    return rightTriangleDataA
}

function findIntersectingPoint(line1StartX, line1StartY, line1EndX, line1EndY, line2StartX, line2StartY, line2EndX, line2EndY) {
    // if the lines intersect, the result contains the x and y of the intersection (treating the lines as infinite) and booleans for whether line segment 1 or line segment 2 contain the point
    let denominator, a, b, numerator1, numerator2, result = {
        x: null,
        y: null,
        onLine1: false,
        onLine2: false
    };
    denominator = ((line2EndY - line2StartY) * (line1EndX - line1StartX)) - ((line2EndX - line2StartX) * (line1EndY - line1StartY));
    if (denominator == 0) {
        return result;
    }
    a = line1StartY - line2StartY;
    b = line1StartX - line2StartX;
    numerator1 = ((line2EndX - line2StartX) * a) - ((line2EndY - line2StartY) * b);
    numerator2 = ((line1EndX - line1StartX) * a) - ((line1EndY - line1StartY) * b);
    a = numerator1 / denominator;
    b = numerator2 / denominator;

    // if we cast these lines infinitely in both directions, they intersect here:
    result.x = line1StartX + (a * (line1EndX - line1StartX));
    result.y = line1StartY + (a * (line1EndY - line1StartY));

    // if line1 is a segment and line2 is infinite, they intersect if:
    if (a > 0 && a < 1) {
        result.onLine1 = true;
    }
    // if line2 is a segment and line1 is infinite, they intersect if:
    if (b > 0 && b < 1) {
        result.onLine2 = true;
    }
    // if line1 and line2 are segments, they intersect if both of the above are trues
    return result;
};

function describeArcPath(radius, x1, y1, x2, y2, arcFlag, sweepFlag){
    let d = [
        "M", x1, y1, 
        "A", radius, radius, 0, arcFlag, sweepFlag, x2, y2,
    ].join(" ");
    return d;
}

function describeStraightPath(x1, y1, x2, y2){
    let d = [
        "M", x1, y1, 
        "L", x2, y2,
    ].join(" ");
    return d;
}

function inRange(x, min, max) {
    return ((x-min)*(x-max) <= 0);
}












function solvTriangleALL(triangleA_sides, ap1x, ap1y, ap2x, ap2y, cpX, cpY, cpAnchorX, cpAnchorY) {
    let sinOfAngle_A = triangleA_sides.side_A / triangleA_sides.side_C
    let base_angle_A = Math.asin(sinOfAngle_A) * (180/Math.PI)
    let angle_A = base_angle_A * (Math.PI/180)
    let side_C_length = triangleA_sides.side_C / 2
    let side_A_length = side_C_length * (Math.sin(angle_A))
    let side_B_length = side_C_length * (Math.cos(angle_A))
    let coord_A = findLineMidpoint(ap1x, ap1y, cpX, cpY)
    let coord_C = ''
    let coord_B = ''

    let arcFlagVar = 0
    let sweepFlagWestVar = 0
    let sweepFlagEastVar = 0

    findPoints(ap1x, ap1y, ap2x, ap2y, cpX, cpY, cpAnchorX, cpAnchorY)
    
    function findPoints(anchorPoint1x, anchorPoint1y, anchorPoint2x, anchorPoint2y, curvePointX, curvePointY, curvePointAnchorX, curvePointAnchorY) {
        if (anchorPoint1y < anchorPoint2y) {
            if (anchorPoint1x < anchorPoint2x) {
                if (curvePointY < curvePointAnchorY) {
                    // console.log('Shape 1')
                    sweepFlagWestVar = 0
                    sweepFlagEastVar = 1
                    if (anchorPoint1x > curvePointAnchorX) {
                        // console.log('AP Axis Section 1')
                        arcFlagVar = 1
                        if(anchorPoint1x > curvePointX) {
                            // console.log('XY Axis Section 1')
                            coord_C = [(coord_A[0] + side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] - side_B_length)]
                        } else {
                            // console.log('XY Axis Section 2')
                            coord_C = [(coord_A[0] + side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] + side_B_length)]
                        }
                    } else {
                        // console.log('AP Axis Section 2')
                        if(anchorPoint1y > curvePointY) {
                            // console.log('XY Axis Section 1')
                            coord_C = [(coord_A[0] + side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] + side_B_length)]
                        } else {
                            // console.log('XY Axis Section 2')
                            coord_C = [(coord_A[0] - side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] + side_B_length)]
                        }
                    }
                } else {
                    // console.log('Shape 2')
                    sweepFlagWestVar = 1
                    sweepFlagEastVar = 0
                    if (anchorPoint1x < curvePointAnchorX) {
                        // console.log('AP Axis Section 1')
                        if(anchorPoint1x < curvePointX) {
                            // console.log('XY Axis Section 1')
                            coord_C = [(coord_A[0] + side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] - side_B_length)]
                        } else {
                            // console.log('XY Axis Section 2')
                            coord_C = [(coord_A[0] + side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] + side_B_length)]
                        }
                    } else {
                        // console.log('AP Axis Section 2')
                        arcFlagVar = 1
                        if(anchorPoint1y < curvePointY) {
                            // console.log('XY Axis Section 1')
                            coord_C = [(coord_A[0] + side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] + side_B_length)]
                        } else {
                            // console.log('XY Axis Section 2')
                            coord_C = [(coord_A[0] - side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] + side_B_length)]
                        }
                    }
                }
            } else {
                if (curvePointY < curvePointAnchorY) {
                    // console.log('Shape 3')
                    sweepFlagWestVar = 1
                    sweepFlagEastVar = 0
                    if (anchorPoint1x > curvePointAnchorX) {
                        // console.log('AP Axis Section 1')
                        if(anchorPoint1y < curvePointY) {
                            // console.log('XY Axis Section 1')
                            coord_C = [(coord_A[0] + side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] + side_B_length)]
                        } else {
                            // console.log('XY Axis Section 2')
                            coord_C = [(coord_A[0] - side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] + side_B_length)]
                        }
                    } else {
                        // console.log('AP Axis Section 2')
                        arcFlagVar = 1
                        if(anchorPoint1x > curvePointX) {
                            // console.log('XY Axis Section 1')
                            coord_C = [(coord_A[0] - side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] + side_B_length)]
                        } else {
                            // console.log('XY Axis Section 2')
                            coord_C = [(coord_A[0] - side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] - side_B_length)]
                        }
                    }
                } else {
                    // console.log('Shape 4')
                    sweepFlagWestVar = 0
                    sweepFlagEastVar = 1
                    if (anchorPoint1x < curvePointAnchorX) {
                        // console.log('AP Axis Section 1')
                        arcFlagVar = 1
                        if(anchorPoint1y > curvePointY) {
                            // console.log('XY Axis Section 1')
                            coord_C = [(coord_A[0] + side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] + side_B_length)]
                        } else {
                            // console.log('XY Axis Section 2')
                            coord_C = [(coord_A[0] - side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] + side_B_length)]
                        }
                    } else {
                        // console.log('AP Axis Section 2')
                        if(anchorPoint1x < curvePointX) {
                            // console.log('XY Axis Section 1')
                            coord_C = [(coord_A[0] - side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] + side_B_length)]
                        } else {
                            // console.log('XY Axis Section 2')
                            coord_C = [(coord_A[0] - side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] - side_B_length)]
                        }
                    }
                }
            }
        } else {
            if (anchorPoint1x < anchorPoint2x) {
                if (curvePointY < curvePointAnchorY) {
                    // console.log('Shape 5')
                    sweepFlagWestVar = 0
                    sweepFlagEastVar = 1
                    if (anchorPoint1x > curvePointAnchorX) {
                        // console.log('AP Axis Section 1')
                        arcFlagVar = 1
                        if(anchorPoint1y < curvePointY) {
                            // console.log('XY Axis Section 1')
                            coord_C = [(coord_A[0] - side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] - side_B_length)]
                        } else {
                            // console.log('XY Axis Section 2')
                            coord_C = [(coord_A[0] + side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] - side_B_length)]
                        }
                    } else {
                        // console.log('AP Axis Section 2')
                        if(anchorPoint1x > curvePointX) {
                            // console.log('XY Axis Section 1')
                            coord_C = [(coord_A[0] + side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] - side_B_length)]
                        } else {
                            // console.log('XY Axis Section 2')
                            coord_C = [(coord_A[0] + side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] + side_B_length)]
                        }
                    }
                } else {
                    // console.log('Shape 6')
                    sweepFlagWestVar = 1
                    sweepFlagEastVar = 0
                    if (anchorPoint1x < curvePointAnchorX) {
                        // console.log('AP Axis Section 1')
                        if(anchorPoint1y > curvePointY) {
                            // console.log('XY Axis Section 1')
                            coord_C = [(coord_A[0] - side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] - side_B_length)]
                        } else {
                            // console.log('XY Axis Section 2')
                            coord_C = [(coord_A[0] + side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] - side_B_length)]
                        }
                    } else {
                        // console.log('AP Axis Section 2')
                        arcFlagVar = 1
                        if(anchorPoint1x < curvePointX) {
                            // console.log('XY Axis Section 1')
                            coord_C = [(coord_A[0] + side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] - side_B_length)]
                        } else {
                            // console.log('XY Axis Section 2')
                            coord_C = [(coord_A[0] + side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] + side_B_length)]
                        }
                    }
                }
            } else {
                if (curvePointY < curvePointAnchorY) {
                    // console.log('Shape 7')
                    sweepFlagWestVar = 1
                    sweepFlagEastVar = 0
                    if (anchorPoint1x > curvePointAnchorX) {
                        // console.log('AP Axis Section 1')
                        if(anchorPoint1x > curvePointX) {
                            // console.log('XY Axis Section 1')
                            coord_C = [(coord_A[0] - side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] + side_B_length)]
                        } else {
                            // console.log('XY Axis Section 2')
                            coord_C = [(coord_A[0] - side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] - side_B_length)]
                        }
                    } else {
                        // console.log('AP Axis Section 2')
                        arcFlagVar = 1
                        if(anchorPoint1y > curvePointY) {
                            // console.log('XY Axis Section 1')
                            coord_C = [(coord_A[0] - side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] - side_B_length)]
                        } else {
                            // console.log('XY Axis Section 2')
                            coord_C = [(coord_A[0] + side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] - side_B_length)]
                        }
                    }
                } else {
                    // console.log('Shape 8')
                    sweepFlagWestVar = 0
                    sweepFlagEastVar = 1
                    if (anchorPoint1x < curvePointAnchorX) {
                        // self.lineElement = svg.append('line').attr('class', 'line').call(dragL);('AP Axis Section 1')
                        arcFlagVar = 1
                        if(anchorPoint1x < curvePointX) {
                            // console.log('XY Axis Section 1')
                            coord_C = [(coord_A[0] - side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] + side_B_length)]
                        } else {
                            // console.log('XY Axis Section 2')
                            coord_C = [(coord_A[0] - side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] - side_B_length)]
                        }
                    } else {
                        // console.log('AP Axis Section 2')
                        if(anchorPoint1y < curvePointY) {
                            // console.log('XY Axis Section 1')
                            coord_C = [(coord_A[0] - side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] - side_B_length)]
                        } else {
                            // console.log('XY Axis Section 2')
                            coord_C = [(coord_A[0] + side_A_length), coord_A[1]]
                            coord_B = [coord_C[0], (coord_C[1] - side_B_length)]
                        }
                    }
                }
            }
        }
    }

    // if (ap1x == ap2x && ap1y == ap2y) {
    //     if(math === 'west'){console.log('No Line')}
    //     coord_C = [coord_A[0], coord_A[1]]
    //     coord_B = [coord_C[0], coord_C[1]]
    // } else if (ap1x > ap2x && ap1y == ap2y) {
    //     // if(math === 'west'){console.log('Y+ Horizontal WEST')}
    //     // if(math === 'east'){console.log('Y+ Horizontal EAST')}
    //     coord_C = [(coord_A[0]), coord_A[1]]
    //     coord_B = (math === 'west') ? [coord_C[0], (coord_C[1] + side_B_length)] : [coord_C[0], (coord_C[1] - side_B_length)]
    // } else if (ap1x == ap2x && ap1y > ap2y) {
    //     // if(math === 'west'){console.log('X+ Vertical WEST')}
    //     // if(math === 'east'){console.log('X+ Vertical EAST')}
    //     coord_C = (math === 'west') ? [(coord_A[0] + side_A_length), coord_A[1]] : [(coord_A[0] - side_A_length), coord_A[1]]
    //     coord_B = [coord_C[0], (coord_C[1])]
    // } else if (ap1x < ap2x && ap1y == ap2y) {
    //     // if(math === 'west'){console.log('Y- Horizontal WEST')}
    //     // if(math === 'east'){console.log('Y- Horizontal EAST')}
    //     coord_C = [(coord_A[0]), coord_A[1]]
    //     coord_B = (math === 'west') ? [coord_C[0], (coord_C[1] - side_B_length)] : [coord_C[0], (coord_C[1] + side_B_length)]
    // } else if (ap1x == ap2x && ap1y < ap2y) {
    //     // if(math === 'west'){console.log('X- Vertical WEST')}
    //     // if(math === 'east'){console.log('X- Vertical EAST')}
    //     coord_C = (math === 'west') ? [(coord_A[0] - side_A_length), coord_A[1]] : [(coord_A[0] + side_A_length), coord_A[1]]
    //     coord_B = [coord_C[0], (coord_C[1])]
    // }

    let solveTriangleData = {
        coords: {
            coord_A: coord_A,
            coord_B: coord_B,
            coord_C: coord_C,
        },

        arcFlag: arcFlagVar,
        sweepFlagWest: sweepFlagWestVar,
        sweepFlagEast: sweepFlagEastVar,

    }
    return solveTriangleData
}