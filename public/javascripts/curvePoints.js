// const { selection } = require("d3");

const width = '100%'
const height = '700px'

let svg = d3.select('body').append('svg')
    .attr('width', width)
    .attr('height', height)

d3.select("body").insert("div")
    .append("button")
    .text("Draw Line")
    .on("click", drawLine);

function drawLine() {
    let self = this, line, lineData = [], curvePointData = [],  m1, m2, isDown = false, isDrag = false;

    svg.on('mousedown', function() {
        m1 = d3.mouse(this);
        if (!isDown && !isDrag) {
            // LINE
            self.lineData = [ { x: m1[0], y: m1[1] }, { x: m1[0], y: m1[1] } ];
            self.lineElement = svg.append('line').attr('class', 'line').call(dragL);
            // LINE

            //ELLIPSE
            self.ellipseElement1 = svg.append('ellipse').attr('class', 'ellipse');
            self.ellipseElement2 = svg.append('ellipse').attr('class', 'ellipse');
            //ELLIPSE

            // PATH
            self.pathElement = svg.append('path').attr('class', 'path');
            self.pathElement2 = svg.append('path').attr('class', 'path');
            // PATH

            // CURVE POINT LEG
            self.lineElementCPLA = svg.append('line').attr('class', 'line');
            self.lineElementCPLB = svg.append('line').attr('class', 'line');
            // CURVE POINT LEG

            // CP PERPENDICULAR LINE
            self.lineElementCPPL = svg.append('line').attr('class', 'line');
            // CP PERPENDICULAR LINE

            // END POINTS
            self.pointElement1 = svg.append('circle').attr('class', 'pointC').call(dragC1);
            self.pointElement2 = svg.append('circle').attr('class', 'pointC').call(dragC2);
            // END POINTS

            // CURVE POINT
            self.curvePointData = [{ x: 100, y: 100 }];
            self.pointElementCP = svg.append('circle').attr('class', 'pointC').call(dragC3);
            // CURVE POINT

            // INTERSECTING POINT
            self.pointElementIPa = svg.append('circle').attr('class', 'pointC');
            self.pointElementIPb = svg.append('circle').attr('class', 'pointC');
            // INTERSECTING POINT

            // SOLVE TRIANGLE 1 Sides
            self.lineElement_solveTriangle_1_sideA = svg.append('line').attr('class', 'line');
            self.lineElement_solveTriangle_1_sideB = svg.append('line').attr('class', 'line');
            self.lineElement_solveTriangle_1_sideC = svg.append('line').attr('class', 'line');
            // SOLVE TRIANGLE 1 Sides

            // SOLVE TRIANGLE 1 Points
            self.pointElement_solveTriangle_1_pointA = svg.append('circle').attr('class', 'pointC');
            self.pointElement_solveTriangle_1_pointB = svg.append('circle').attr('class', 'pointC');
            self.pointElement_solveTriangle_1_pointC = svg.append('circle').attr('class', 'pointC');
            // SOLVE TRIANGLE 1 Points

            // SOLVE TRIANGLE 2 Sides
            self.lineElement_solveTriangle_2_sideA = svg.append('line').attr('class', 'line');
            self.lineElement_solveTriangle_2_sideB = svg.append('line').attr('class', 'line');
            self.lineElement_solveTriangle_2_sideC = svg.append('line').attr('class', 'line');
            // SOLVE TRIANGLE 2 Sides

            // SOLVE TRIANGLE 2 Points
            self.pointElement_solveTriangle_2_pointA = svg.append('circle').attr('class', 'pointC');
            self.pointElement_solveTriangle_2_pointB = svg.append('circle').attr('class', 'pointC');
            self.pointElement_solveTriangle_2_pointC = svg.append('circle').attr('class', 'pointC');
            // SOLVE TRIANGLE 2 Points
            
            updateFigureA()
            isDrag = false;
        } else {
            isDrag = true;
        }
        isDown = !isDown
    })
    
    .on('mousemove', function() {
        m2 = d3.mouse(this);
        if(isDown && !isDrag) { 
            self.lineData[1] = { x: m2[0], y: m2[1] };
            updateFigureA();
        } 
    });  


    // LINE
    let dragL = d3.behavior.drag().on('drag', dragLine);
    // LINE

    // END POINTS
    let dragC1 = d3.behavior.drag().on('drag', dragPoint1);
    let dragC2 = d3.behavior.drag().on('drag', dragPoint2);
    // END POINTS
    // CURVE POINTS
    let dragC3 = d3.behavior.drag().on('drag', dragPoint3);
    // CURVE POINTS


    // LINE
    function dragLine() {
        let e = d3.event
        d3.select(self.lineElement[0][0])
            .attr('x1', self.lineData[0].x += e.dx )
            .attr('y1', self.lineData[0].y += e.dy )
            .attr('x2', self.lineData[1].x += e.dx )
            .attr('y2', self.lineData[1].y += e.dy )
        line.style('cursor', 'move');
        d3.select(self.pointElementCP[0][0])
            .attr('cx', self.curvePointData[0].x += e.dx )
            .attr('cy', self.curvePointData[0].y += e.dy );
        updateFigureA();
    }
    // LINE

    // END POINTS
    function dragPoint1() {
        let e = d3.event;
        d3.select(self.pointElement1[0][0])
            .attr('cx', self.lineData[0].x += e.dx )
            .attr('cy', self.lineData[0].y += e.dy );    
        updateFigureA();   
    }   
    
    function dragPoint2() {
        let e = d3.event;
        d3.select(self.pointElement2[0][0])
            .attr('cx', self.lineData[1].x += e.dx )
            .attr('cy', self.lineData[1].y += e.dy );
        updateFigureA();   
    }
    // END POINTS

    // CURVE POINT
    function dragPoint3() {
        let e = d3.event;
        d3.select(self.pointElementCP[0][0])
            .attr('cx', self.curvePointData[0].x += e.dx )
            .attr('cy', self.curvePointData[0].y += e.dy );
        updateFigureA();   
    }
    // CURVE POINT


    function updateFigureA() {
        // let curvePointLine = findPerpendicularFromPoint(self.curvePointData[0].x, self.curvePointData[0].y, self.lineData[0].x, self.lineData[0].y, self.lineData[1].x, self.lineData[1].y)
        let curvePointLine = findPerpendicularFromPoint(self.lineData, self.curvePointData[0])

        // let rightTriangleData = findRightTriangle(self.lineData[0].x, self.lineData[0].y, self.curvePointData[0].x,self.curvePointData[0].y)
        let rightTriangleData = findRightTriangle(self.lineData[0], self.curvePointData[0])
        let solveTriangleData = solvTriangleALL(rightTriangleData.sides, self.lineData[0].x, self.lineData[0].y, self.curvePointData[0].x, self.curvePointData[0].y, curvePointLine[0], curvePointLine[1], self.curvePointData[0].x, self.curvePointData[0].y, self.lineData[1].x, self.lineData[1].y)
        let solvTriangleCoords = solveTriangleData.coords

        // let rightTriangleData2 = findRightTriangle(self.curvePointData[0].x, self.curvePointData[0].y, self.lineData[1].x,self.lineData[1].y)
        let rightTriangleData2 = findRightTriangle(self.curvePointData[0], self.lineData[1])
        let solveTriangleData2 = solvTriangleALL(rightTriangleData2.sides, self.curvePointData[0].x, self.curvePointData[0].y, self.lineData[1].x, self.lineData[1].y, curvePointLine[0], curvePointLine[1], self.curvePointData[0].x, self.curvePointData[0].y, self.lineData[0].x, self.lineData[0].y)
        let solvTriangleCoords2 = solveTriangleData2.coords

        let intersectingPoint_a_lineInfinite = findIntersectingPoint_lineInfinite(self.curvePointData[0].x, self.curvePointData[0].y, curvePointLine[0], curvePointLine[1], solvTriangleCoords.coord_A[0], solvTriangleCoords.coord_A[1], solvTriangleCoords.coord_B[0], solvTriangleCoords.coord_B[1])
        let intersectingPoint_b_lineInfinite = findIntersectingPoint_lineInfinite(self.curvePointData[0].x, self.curvePointData[0].y, curvePointLine[0], curvePointLine[1], solvTriangleCoords2.coord_A[0], solvTriangleCoords2.coord_A[1], solvTriangleCoords2.coord_B[0], solvTriangleCoords2.coord_B[1])

        const circRadius = getDistance(self.curvePointData[0].x, self.curvePointData[0].y, intersectingPoint_a_lineInfinite.x, intersectingPoint_a_lineInfinite.y)
        const circRadius2 = getDistance(self.curvePointData[0].x, self.curvePointData[0].y, intersectingPoint_b_lineInfinite.x, intersectingPoint_b_lineInfinite.y)
        // console.log(circRadius * 2, circRadius2 * 2)

        // LINE
        line = d3.select(self.lineElement[0][0]);
        line.attr({
            x1:self.lineData[0].x,
            y1:self.lineData[0].y,
            x2:self.lineData[1].x,
            y2:self.lineData[1].y,
        });
        line.style('stroke', 'grey')
        line.style('stroke-width', 5)
        // LINE

        // ELLIPSE
        ellipse1 = d3.select(self.ellipseElement1[0][0]);
        ellipse1
        .attr("cx", intersectingPoint_a_lineInfinite.x)
        .attr("cy", intersectingPoint_a_lineInfinite.y)
        .attr("rx", circRadius)
        .attr("ry", circRadius)
        .attr("fill", "none")
        .attr("stroke", "red")
        .attr("stroke-dasharray", "4 4");

        ellipse2 = d3.select(self.ellipseElement2[0][0]);
        ellipse2
        .attr("cx", intersectingPoint_b_lineInfinite.x)
        .attr("cy", intersectingPoint_b_lineInfinite.y)
        .attr("rx", circRadius2)
        .attr("ry", circRadius2)
        .attr("fill", "none")
        .attr("stroke", "blue")
        .attr("stroke-dasharray", "4 4");
        // ELLIPSE

        // PATH
        let path = d3.select(self.pathElement[0][0]);
        path.attr({d: describeArc(intersectingPoint_a_lineInfinite.x, intersectingPoint_a_lineInfinite.y, circRadius, 220, 300, self.curvePointData[0].x, self.curvePointData[0].y, self.lineData[0].x, self.lineData[0].y, curvePointLine[0], curvePointLine[1], self.curvePointData[0].x, self.curvePointData[0].y, solveTriangleData.arcFlagWest, solveTriangleData.sweepFlagWest)})
        path.style('fill', 'none')
        path.style('stroke', 'red')
        path.style('stroke-width', 3)

        let path2 = d3.select(self.pathElement2[0][0]);
        path2.attr({d: describeArc(intersectingPoint_b_lineInfinite.x, intersectingPoint_b_lineInfinite.y, circRadius2, 220, 300, self.lineData[1].x, self.lineData[1].y, self.curvePointData[0].x, self.curvePointData[0].y, curvePointLine[0], curvePointLine[1], self.curvePointData[0].x, self.curvePointData[0].y, solveTriangleData2.arcFlagEast, solveTriangleData.sweepFlagEast)})
        path2.style('fill', 'none')
        path2.style('stroke', 'blue')
        path2.style('stroke-width', 3)
        // PATH

        // CURVE POINT LEG
        let lineCPLA = d3.select(self.lineElementCPLA[0][0]);
        lineCPLA.attr({
            x1:self.lineData[0].x,
            y1:self.lineData[0].y,
            x2:self.curvePointData[0].x,
            y2:self.curvePointData[0].y,
        });
        lineCPLA.style('stroke', 'grey')
        lineCPLA.style('stroke-width', 2)
        
        let lineCPLB = d3.select(self.lineElementCPLB[0][0]);
        lineCPLB.attr({
            x1:self.curvePointData[0].x,
            y1:self.curvePointData[0].y,
            x2:self.lineData[1].x,
            y2:self.lineData[1].y,
        });
        lineCPLB.style('stroke', 'grey')
        lineCPLB.style('stroke-width', 2)
        // CURVE POINT LEG

        // CP PERPENDICULAR LINE
        let lineCPPL = d3.select(self.lineElementCPPL[0][0]);
        lineCPPL.attr({
            x1:self.curvePointData[0].x,
            y1:self.curvePointData[0].y,
            x2:curvePointLine[0],
            y2:curvePointLine[1],
        });
        lineCPPL.style('stroke', 'grey')
        lineCPPL.style('stroke-width', 1)
        // CP PERPENDICULAR LINE

        // END POINTS
        let point1 = d3.select(self.pointElement1[0][0]).data(self.lineData);
        point1.attr('r', 10)
                .attr('cx', self.lineData[0].x)
                .attr('cy', self.lineData[0].y)
                .attr('fill', '#97b9e9');

        let point2 = d3.select(self.pointElement2[0][0]).data(self.lineData);
        point2.attr('r', 10)
                .attr('cx', self.lineData[1].x)
                .attr('cy', self.lineData[1].y)
                .attr('fill', '#97b9e9');
        // END POINTS

        // CURVE POINT
        let pointCP = d3.select(self.pointElementCP[0][0]).data(self.curvePointData);
        // let lineMidPointCoords = findLineMidpoint(self.lineData[0].x, self.lineData[0].y, self.lineData[1].x,self.lineData[1].y)
        pointCP.attr('r', 10)
                .attr('cx', self.curvePointData[0].x)
                .attr('cy', self.curvePointData[0].y)
                .attr('fill', 'pink');
        // CURVE POINT

        // INTERSECTING POINT
        let pointIPa = d3.select(self.pointElementIPa[0][0]);
        pointIPa.attr('r', 5)
                .attr('cx', intersectingPoint_a_lineInfinite.x)
                .attr('cy', intersectingPoint_a_lineInfinite.y)
                .attr('fill', 'red');

        let pointIPb = d3.select(self.pointElementIPb[0][0]);
        pointIPb.attr('r', 5)
                .attr('cx', intersectingPoint_b_lineInfinite.x)
                .attr('cy', intersectingPoint_b_lineInfinite.y)
                .attr('fill', 'blue');
        // INTERSECTING POINT

        // SOLVE TRIANGLE 1 Sides
        let line_solveTriangle_1_sideA = d3.select(self.lineElement_solveTriangle_1_sideA[0][0]);
        line_solveTriangle_1_sideA.attr({
            x1:solvTriangleCoords.coord_B[0],
            y1:solvTriangleCoords.coord_B[1],
            x2:solvTriangleCoords.coord_C[0],
            y2:solvTriangleCoords.coord_C[1],
        });
        line_solveTriangle_1_sideA.style('stroke', 'red')
        line_solveTriangle_1_sideA.style('stroke-width', 0.5)

        let line_solveTriangle_1_sideB = d3.select(self.lineElement_solveTriangle_1_sideB[0][0]);
        line_solveTriangle_1_sideB.attr({
            x1:solvTriangleCoords.coord_C[0],
            y1:solvTriangleCoords.coord_C[1],
            x2:solvTriangleCoords.coord_A[0],
            y2:solvTriangleCoords.coord_A[1],
        });
        line_solveTriangle_1_sideB.style('stroke', 'green')
        line_solveTriangle_1_sideB.style('stroke-width', 0.5)

        let line_solveTriangle_1_sideC = d3.select(self.lineElement_solveTriangle_1_sideC[0][0]);
        line_solveTriangle_1_sideC.attr({
            x1:solvTriangleCoords.coord_A[0],
            y1:solvTriangleCoords.coord_A[1],
            x2:solvTriangleCoords.coord_B[0],
            y2:solvTriangleCoords.coord_B[1],
        });
        line_solveTriangle_1_sideC.style('stroke', 'blue')
        line_solveTriangle_1_sideC.style('stroke-width', 0.5)
        // SOLVE TRIANGLE 1 Sides

        // SOLVE TRIANGLE 1 Points
        let point_solveTriangle_1_pointA = d3.select(self.pointElement_solveTriangle_1_pointA[0][0]).data(self.lineData);
        point_solveTriangle_1_pointA.attr('r', 2.5)
                .attr('cx', solvTriangleCoords.coord_A[0])
                .attr('cy', solvTriangleCoords.coord_A[1])
                .attr('fill', 'red');
        
        let point_solveTriangle_1_pointB = d3.select(self.pointElement_solveTriangle_1_pointB[0][0]).data(self.lineData);
        point_solveTriangle_1_pointB.attr('r', 2.5)
                .attr('cx', solvTriangleCoords.coord_B[0])
                .attr('cy', solvTriangleCoords.coord_B[1])
                .attr('fill', 'green');

        let point_solveTriangle_1_pointC = d3.select(self.pointElement_solveTriangle_1_pointC[0][0]).data(self.lineData);
        point_solveTriangle_1_pointC.attr('r', 2.5)
                .attr('cx', solvTriangleCoords.coord_C[0])
                .attr('cy', solvTriangleCoords.coord_C[1])
                .attr('fill', 'blue');
        // SOLVE TRIANGLE 1 Points
//
        // SOLVE TRIANGLE 2 Sides
        let line_solveTriangle_2_sideA = d3.select(self.lineElement_solveTriangle_2_sideA[0][0]);
        line_solveTriangle_2_sideA.attr({
            x1:solvTriangleCoords2.coord_B[0],
            y1:solvTriangleCoords2.coord_B[1],
            x2:solvTriangleCoords2.coord_C[0],
            y2:solvTriangleCoords2.coord_C[1],
        });
        line_solveTriangle_2_sideA.style('stroke', 'red')
        line_solveTriangle_2_sideA.style('stroke-width', 0.5)

        let line_solveTriangle_2_sideB = d3.select(self.lineElement_solveTriangle_2_sideB[0][0]);
        line_solveTriangle_2_sideB.attr({
            x1:solvTriangleCoords2.coord_C[0],
            y1:solvTriangleCoords2.coord_C[1],
            x2:solvTriangleCoords2.coord_A[0],
            y2:solvTriangleCoords2.coord_A[1],
        });
        line_solveTriangle_2_sideB.style('stroke', 'green')
        line_solveTriangle_2_sideB.style('stroke-width', 0.5)

        let line_solveTriangle_2_sideC = d3.select(self.lineElement_solveTriangle_2_sideC[0][0]);
        line_solveTriangle_2_sideC.attr({
            x1:solvTriangleCoords2.coord_A[0],
            y1:solvTriangleCoords2.coord_A[1],
            x2:solvTriangleCoords2.coord_B[0],
            y2:solvTriangleCoords2.coord_B[1],
        });
        line_solveTriangle_2_sideC.style('stroke', 'blue')
        line_solveTriangle_2_sideC.style('stroke-width', 0.5)
        // SOLVE TRIANGLE 2 Sides

        // SOLVE TRIANGLE 2 Points
        let point_solveTriangle_2_pointA = d3.select(self.pointElement_solveTriangle_2_pointA[0][0]).data(self.lineData);
        point_solveTriangle_2_pointA.attr('r', 2.5)
                .attr('cx', solvTriangleCoords2.coord_A[0])
                .attr('cy', solvTriangleCoords2.coord_A[1])
                .attr('fill', 'red');
        
        let point_solveTriangle_2_pointB = d3.select(self.pointElement_solveTriangle_2_pointB[0][0]).data(self.lineData);
        point_solveTriangle_2_pointB.attr('r', 2.5)
                .attr('cx', solvTriangleCoords2.coord_B[0])
                .attr('cy', solvTriangleCoords2.coord_B[1])
                .attr('fill', 'green');

        let point_solveTriangle_2_pointC = d3.select(self.pointElement_solveTriangle_2_pointC[0][0]).data(self.lineData);
        point_solveTriangle_2_pointC.attr('r', 2.5)
                .attr('cx', solvTriangleCoords2.coord_C[0])
                .attr('cy', solvTriangleCoords2.coord_C[1])
                .attr('fill', 'blue');
        // SOLVE TRIANGLE 2 Points
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
            var gradientOfpath1 = (path1.pointA.y - path1.pointB.y) / (path1.pointA.x - path1.pointB.x);
            var interceptOfpath1 = path1.pointA.y - gradientOfpath1 * path1.pointA.x;
            var gradientOfpath2 = -1 / gradientOfpath1;
            var interceptOfpath2 = path2.pointA.y - gradientOfpath2 * path2.pointA.x;
            path2.pointB.x = (interceptOfpath1 - interceptOfpath2) / (gradientOfpath2 - gradientOfpath1);
            path2.pointB.y = gradientOfpath2 * path2.pointB.x + interceptOfpath2;

            let xy2 = [path2.pointB.x, path2.pointB.y]
            
            return xy2
        }
    }

    function findRightTriangle(startCoords, endCoords) {
        let rightTriangleData = {
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
        return rightTriangleData
    }

    function solvTriangleALL(triangleA_sides, p1x, p1y, p2x, p2y, curvePointLineX, curvePointLineY, cpX, cpY, otherAnchorPx, otherAnchorPy) {
        let sinOfAngle_A = triangleA_sides.side_A / triangleA_sides.side_C
        let base_angle_A = Math.asin(sinOfAngle_A) * (180/Math.PI)
        let angle_A = base_angle_A * (Math.PI/180)
        let side_C_length = triangleA_sides.side_C / 2
        let side_A_length = side_C_length * (Math.sin(angle_A))
        let side_B_length = side_C_length * (Math.cos(angle_A))
        let coord_A = findLineMidpoint(p1x, p1y, p2x, p2y)
        let coord_C = ''
        let coord_B = ''
        let math
        let anchorPointX
        let anchorPointY
        let arcFlagWestVar = 0
        let arcFlagEastVar = 0
        let sweepFlagWestVar = 0
        let sweepFlagEastVar = 0

        if (p1x != cpX || p1y != cpY) {
            math = 'west'
            anchorPointX = p1x
            anchorPointY = p1y
        } else if(p1x == cpX & p1y == cpY) {
            math = 'east'
            anchorPointX = p2x
            anchorPointY = p2y
        }

        if (math === 'west') {
            let anchorPoint1x = p1x
            let anchorPoint1y = p1y
            let anchorPoint2x = otherAnchorPx
            let anchorPoint2y = otherAnchorPy
            let curvePointX = p2x
            let curvePointY = p2y
            let curvePointAnchorX = curvePointLineX
            let curvePointAnchorY = curvePointLineY

            if (anchorPoint1y < anchorPoint2y) {
                if (anchorPoint1x < anchorPoint2x) {
                    if (curvePointY < curvePointAnchorY) {
                        // not clockwise
                        console.log('Shape 1')
                        if (anchorPoint1x < curvePointAnchorX) {
                            console.log('AP Axis Section 1')
                            if(anchorPoint1y < curvePointY) {
                                console.log('XY Axis Section 1')
                            } else {
                                console.log('XY Axis Section 2')
                            }
                        } else {
                            console.log('AP Axis Section 2')
                            if(anchorPoint1x < curvePointX) {
                                console.log('XY Axis Section 1')
                            } else {
                                console.log('XY Axis Section 2')
                            }
                        }
                    } else {
                        console.log('Shape 2')
                        if (anchorPoint1x > curvePointAnchorX) {
                            console.log('AP Axis Section 1')
                            if(anchorPoint1y > curvePointY) {
                                console.log('XY Axis Section 1')
                            } else {
                                console.log('XY Axis Section 2')
                            }
                        } else {
                            console.log('AP Axis Section 2')
                            if(anchorPoint1x > curvePointX) {
                                console.log('XY Axis Section 1')
                            } else {
                                console.log('XY Axis Section 2')
                            }
                        }
                    }
                } else {
                    if (curvePointY < curvePointAnchorY) {
                        console.log('Shape 3')
                        if (anchorPoint1x > curvePointAnchorX) {
                            console.log('AP Axis Section 1')
                            if(anchorPoint1y < curvePointY) {
                                console.log('XY Axis Section 1')
                            } else {
                                console.log('XY Axis Section 2')
                            }
                        } else {
                            console.log('AP Axis Section 2')
                            if(anchorPoint1x > curvePointX) {
                                console.log('XY Axis Section 1')
                            } else {
                                console.log('XY Axis Section 2')
                            }
                        }
                    } else {
                        console.log('Shape 4')
                        if (anchorPoint1x < curvePointAnchorX) {
                            console.log('AP Axis Section 1')
                            if(anchorPoint1y > curvePointY) {
                                console.log('XY Axis Section 1')
                            } else {
                                console.log('XY Axis Section 2')
                            }
                        } else {
                            console.log('AP Axis Section 2')
                            if(anchorPoint1x < curvePointX) {
                                console.log('XY Axis Section 1')
                            } else {
                                console.log('XY Axis Section 2')
                            }
                        }
                    }
                }
            } else {
                if (anchorPoint1x < anchorPoint2x) {
                    if (curvePointY < curvePointAnchorY) {
                        console.log('Shape 5')
                        if (anchorPoint1x < curvePointAnchorX) {
                            console.log('AP Axis Section 1')
                            if(anchorPoint1y > curvePointY) {
                                console.log('XY Axis Section 1')
                            } else {
                                console.log('XY Axis Section 2')
                            }
                        } else {
                            console.log('AP Axis Section 2')
                            if(anchorPoint1x < curvePointX) {
                                console.log('XY Axis Section 1')
                            } else {
                                console.log('XY Axis Section 2')
                            }
                        }
                    } else {
                        console.log('Shape 6')
                        // Shape 6
                    }
                } else {
                    if (curvePointY < curvePointAnchorY) {
                        console.log('Shape 7')
                        // Shape 7
                    } else {
                        console.log('Shape 8')
                        // Shape 8
                    }
                }
            }

            // if (anchorPoint1x < curvePointAnchorX) {
            //     console.log('AP Axis Section 1')
            //     // AP Axis Section 1
            // } else {
            //     console.log('AP Axis Section 2')
            //     // AP Axis Section 2
            // }

            // if(anchorPoint1x < curvePointX) {
            //     if (anchorPoint1y < curvePointY){
            //         console.log('XY Axis Section 1')
            //         // XY Axis Section 1
            //     } else {
            //         console.log('XY Axis Section 2')
            //         // XY Axis Section 2
            //     }
            // } else {
            //     if (anchorPoint1y > curvePointY){
            //         console.log('XY Axis Section 3')
            //         // XY Axis Section 3
            //     } else {
            //         console.log('XY Axis Section 4')
            //         // XY Axis Section 4
            //     }
            // }
        } else {
        }

        // function findShape() {
        //     if (anchorPoint1y < anchorPoint2y) {
        //         if (anchorPoint1x < anchorPoint2x) {
        //             if (curvePointY < curvePointAnchorY) {
        //                 findSection1()
        //             } else {
        //                 findSection1()
        //             }
        //         }
        //     }
        // }

        // function findSection1() {
        //     if (anchorPoint1x < curvePointAnchorX) {
        //         findSection2()
        //     } else {
        //         findSection2()
        //     }
        // }

        // function findSection2() {
        //     if(anchorPoint1x < curvePointX) {
        //         if (anchorPoint1y < curvePointY){
        //             plotPoint()
        //         } else {
        //             plotPoint()
        //         }
        //     } else {
        //         if (anchorPoint1y > curvePointY){
        //             plotPoint()
        //         } else {
        //             plotPoint()
        //         }
        //     }
        // }

        // function plotPoint() {
        //     coord_C = [(coord_A[0] + side_A_length), coord_A[1]]
        //     coord_B = [coord_C[0], (coord_C[1] - side_B_length)]
        // }
        



        if (p1x == p2x && p1y == p2y) {
            if(math === 'west'){console.log('No Line')}
            coord_C = [coord_A[0], coord_A[1]]
            coord_B = [coord_C[0], coord_C[1]]
        } else if (p1x > p2x && p1y == p2y) {
            // if(math === 'west'){console.log('Y+ Horizontal WEST')}
            // if(math === 'east'){console.log('Y+ Horizontal EAST')}
            coord_C = [(coord_A[0]), coord_A[1]]
            coord_B = (math === 'west') ? [coord_C[0], (coord_C[1] + side_B_length)] : [coord_C[0], (coord_C[1] - side_B_length)]
        } else if (p1x == p2x && p1y > p2y) {
            // if(math === 'west'){console.log('X+ Vertical WEST')}
            // if(math === 'east'){console.log('X+ Vertical EAST')}
            coord_C = (math === 'west') ? [(coord_A[0] + side_A_length), coord_A[1]] : [(coord_A[0] - side_A_length), coord_A[1]]
            coord_B = [coord_C[0], (coord_C[1])]
        } else if (p1x < p2x && p1y == p2y) {
            // if(math === 'west'){console.log('Y- Horizontal WEST')}
            // if(math === 'east'){console.log('Y- Horizontal EAST')}
            coord_C = [(coord_A[0]), coord_A[1]]
            coord_B = (math === 'west') ? [coord_C[0], (coord_C[1] - side_B_length)] : [coord_C[0], (coord_C[1] + side_B_length)]
        } else if (p1x == p2x && p1y < p2y) {
            // if(math === 'west'){console.log('X- Vertical WEST')}
            // if(math === 'east'){console.log('X- Vertical EAST')}
            coord_C = (math === 'west') ? [(coord_A[0] - side_A_length), coord_A[1]] : [(coord_A[0] + side_A_length), coord_A[1]]
            coord_B = [coord_C[0], (coord_C[1])]



        } else if (anchorPointX > curvePointLineX && curvePointLineY > cpY) {
            // if(math === 'west'){console.log('1W')}
            // if(math === 'east'){console.log('1E')}
            if(math === 'west'){arcFlagWestVar = 1}
            if(math === 'east'){arcFlagEastVar = 0}

            coord_C = ((anchorPointY < cpY) ? [(coord_A[0] + side_A_length), coord_A[1]] : [(coord_A[0] - side_A_length), coord_A[1]]);
            // coord_B = [coord_C[0], (coord_C[1] + side_B_length)]
            if (math === 'west' && anchorPointY > otherAnchorPy) {
                coord_B = [coord_C[0], (coord_C[1] + side_B_length)]
            } else {
                coord_B = (anchorPointX > cpX) ? [coord_C[0], (coord_C[1] + side_B_length)] : [coord_C[0], (coord_C[1] - side_B_length)]
            }
            if (math === 'east' && anchorPointY < otherAnchorPy) {
                coord_B = [coord_C[0], (coord_C[1] + side_B_length)]
            } else {
                coord_B = (anchorPointX > cpX) ? [coord_C[0], (coord_C[1] + side_B_length)] : [coord_C[0], (coord_C[1] - side_B_length)]
            }
        } else if (anchorPointX < curvePointLineX && curvePointLineY < cpY) {
            // if(math === 'west'){console.log('2W')}
            // if(math === 'east'){console.log('2E')}
            if(math === 'west'){arcFlagWestVar = 0}
            if(math === 'east'){arcFlagEastVar = 1}

            coord_C = ((anchorPointY < cpY) ? [(coord_A[0] + side_A_length), coord_A[1]] : [(coord_A[0] - side_A_length), coord_A[1]]);
            // coord_B = [coord_C[0], (coord_C[1] - side_B_length)]
            if (math === 'west' && anchorPointY > otherAnchorPy) {
                coord_B = [coord_C[0], (coord_C[1] - side_B_length)]
            } else {
                coord_B = (anchorPointX < cpX) ? [coord_C[0], (coord_C[1] - side_B_length)] : [coord_C[0], (coord_C[1] + side_B_length)]
            }
            if (math === 'east' && anchorPointY < otherAnchorPy) {
                coord_B = [coord_C[0], (coord_C[1] - side_B_length)]
            } else {
                coord_B = (anchorPointX < cpX) ? [coord_C[0], (coord_C[1] - side_B_length)] : [coord_C[0], (coord_C[1] + side_B_length)]
            }
        } else if (anchorPointX > curvePointLineX && curvePointLineY < cpY) {
            // if(math === 'west'){console.log('3W')}
            // if(math === 'east'){console.log('3E')}
            if(math === 'west'){arcFlagWestVar = 1}
            if(math === 'east'){arcFlagEastVar = 0}

            if (math === 'west' && anchorPointY > otherAnchorPy) {
                coord_C = [(coord_A[0] - side_A_length), coord_A[1]]
            } else {
                coord_C = (anchorPointY < cpY) ? [(coord_A[0] - side_A_length), coord_A[1]] : [(coord_A[0] + side_A_length), coord_A[1]]
            }
            if (math === 'east' && anchorPointY < otherAnchorPy) {
                coord_C = [(coord_A[0] - side_A_length), coord_A[1]]
            } else {
                coord_C = (anchorPointY < cpY) ? [(coord_A[0] - side_A_length), coord_A[1]] : [(coord_A[0] + side_A_length), coord_A[1]]
            }
            // coord_C = [(coord_A[0] - side_A_length), coord_A[1]]
            coord_B = ((anchorPointX < cpX) ? [coord_C[0], (coord_C[1] + side_B_length)] : [coord_C[0], (coord_C[1] - side_B_length)])
        } else if (anchorPointX < curvePointLineX && curvePointLineY > cpY) {
            // if(math === 'west'){console.log('4W')}
            // if(math === 'east'){console.log('4E')}
            if(math === 'west'){arcFlagWestVar = 0}
            if(math === 'east'){arcFlagEastVar = 1}
            
            if (math === 'west' && anchorPointY > otherAnchorPy) {
                coord_C = [(coord_A[0] + side_A_length), coord_A[1]]
            } else {
                coord_C = (anchorPointY > cpY) ? [(coord_A[0] + side_A_length), coord_A[1]] : [(coord_A[0] - side_A_length), coord_A[1]]
            }
            if (math === 'east' && anchorPointY < otherAnchorPy) {
                coord_C = [(coord_A[0] + side_A_length), coord_A[1]]
            } else {
                coord_C = (anchorPointY > cpY) ? [(coord_A[0] + side_A_length), coord_A[1]] : [(coord_A[0] - side_A_length), coord_A[1]]
            }
            // coord_C = [(coord_A[0] + side_A_length), coord_A[1]]
            coord_B = ((anchorPointX < cpX) ? [coord_C[0], (coord_C[1] + side_B_length)] : [coord_C[0], (coord_C[1] - side_B_length)]);
        }

        let solveTriangleData = {
            coords: {
                coord_A: coord_A,
                coord_B: coord_B,
                coord_C: coord_C,
            },
            arcFlagWest: arcFlagWestVar,
            arcFlagEast: arcFlagEastVar,
            sweepFlagWest: sweepFlagWestVar,
            sweepFlagEast: sweepFlagEastVar
        }
        return solveTriangleData
    }

    function findIntersectingPoint_lineInfinite(line1StartX, line1StartY, line1EndX, line1EndY, line2StartX, line2StartY, line2EndX, line2EndY) {
        // if the lines intersect, the result contains the x and y of the intersection (treating the lines as infinite) and booleans for whether line segment 1 or line segment 2 contain the point
        var denominator, a, b, numerator1, numerator2, result = {
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

    function describeArc(x, y, radius, startAngle, endAngle, x1, y1, x2, y2, perpPointX, perpPointY, curvePointX, curvePointY, arcFlagPass, sweepFlagPass){
        let arcFlag = arcFlagPass
        // let sweepFlag = sweepFlagPass
        let sweepFlag = perpPointY > curvePointY ? 0 : 1
        let d = [
            "M", x1, y1, 
            "A", radius, radius, 0, arcFlag, sweepFlag, x2, y2,
        ].join(" ");
        return d;
    }
}


function figureItOUT() {
    // Relationships:
    // AP1 - AP2
    // AP1 - CP
    // AP2 - CP
    // CP - CA
    // CP - XYaxis
    // CP - APaxis

    // if(AP1x = AP2x) {
    //     apx = 0
    // } else if(AP1x < AP2x) {
    //     apx = 1
    // } else {
    //     apx = 2
    // }

    // let straightLine = true || false
    // let straightLineDirection = vertical || horizontal
    // let coord_C_symbol = + || -
    // let coord_B_symbol = + || -
    // let arcFlag = 0 || 1
    // let sweepFlag = 0 || 1


    // coord_C = [(coord_A[0] ~ side_A_length), coord_A[1]]
    // coord_B = [coord_C[0], (coord_C[1] ~ side_B_length)]

    // coord_C = [(coord_A[0]), coord_A[1]]
    // coord_B = [coord_C[0], (coord_C[1] ~ side_B_length)]

    // coord_C = [(coord_A[0] ~ side_A_length), coord_A[1]]
    // coord_B = [coord_C[0], (coord_C[1])]

    // arcFlag = ~
    // sweepFlag = ~


    // determin shape
    // shape 1
    // shape 2
    // shape 3
    // shape 4
    // shape 5
    // shape 6
    // shape 7
    // shape 8

    // for each shape
    // determin which side
    // west side
    // east side

    // for each side 
    // determin anchor point axis section
    // section 1
    // section 2
    // section 3
    // section 4

    // for each anchor point axis section 
    // determin x y axis section 
    // section 1
    // section 2


    // if (anchorPointPathX ~ anchorPointCurveX && anchorPointCurveY ~ curvePointY) {}
    // if (anchorPointX ~ cpX) {}
    // if (anchorPointY ~ cpY) {}
    

}


// function describeArcWest(x, y, radius, startAngle, endAngle, x1, y1, x2, y2, perpPointX, perpPointY, curvePointX, curvePointY, arcFlag){
//     //   var start = polarToCartesian(x, y, radius, endAngle);
//     //   var end = polarToCartesian(x, y, radius, startAngle);

//     // let upDown
//     // if (x1 > x2) {
//     //     console.log('ass')
//     //     upDown = perpPointY > curvePointY ? 0 : 1
//     // } else {
//     //     console.log('tis')
//     //     upDown = perpPointY > curvePointY ? 1 : 0
//     // }

//     let arcFlag1 = arcFlag
//     let sweepFlag = perpPointY > curvePointY ? 0 : 1
//     // var arcSweep = endAngle - startAngle <= 180 ? "0" : "1";
//     // let arcSweep = 0
//     // let arcSweep = 1

//     let d = [
//         "M", x1, y1, 
//         "A", radius, radius, 0, arcFlag1, sweepFlag, x2, y2,
//         // "A", radius, radius, 0, 0, sweepFlag, x2, y2,
//         // "M", start.x, start.y, 
//         // "A", radius, radius, 0, arcSweep, 0, end.x, end.y,
//         //   "L", x,y,
//         //   "L", start.x, start.y
//     ].join(" ");
//     return d;
// }



// function solvTriangleWEST(triangleA_sides, p1x, p1y, p2x, p2y, curvePointLineX, curvePointLineY, cpX, cpY) {
//     let sinOfAngle_A = triangleA_sides.side_A / triangleA_sides.side_C
//     let base_angle_A = Math.asin(sinOfAngle_A) * (180/Math.PI)
//     let angle_A = base_angle_A * (Math.PI/180)
//     let side_C_length = triangleA_sides.side_C / 2
//     let side_A_length = side_C_length * (Math.sin(angle_A))
//     let side_B_length = side_C_length * (Math.cos(angle_A))
//     let coord_A = findLineMidpoint(p1x, p1y, p2x, p2y)
//     let coord_C = ''
//     let coord_B = ''

//     if (p1x == p2x && p1y == p2y) {
//         // console.log('No Line')
//         coord_C = [coord_A[0], coord_A[1]]
//         coord_B = [coord_C[0], coord_C[1]]
//     } else if (p1x > p2x && p1y == p2y) {
//         // console.log('Y++ Horizontal')
//         coord_C = [(coord_A[0]), coord_A[1]]
//         coord_B = [coord_C[0], (coord_C[1] + side_B_length)] // DIFFERENT ( + / -)
//     } else if (p1x == p2x && p1y > p2y) {
//         // console.log('X++ Vertical')
//         coord_C = [(coord_A[0] + side_A_length), coord_A[1]] // DIFFERENT ( + / - )
//         coord_B = [coord_C[0], (coord_C[1])]
//     } else if (p1x < p2x && p1y == p2y) {
//         // console.log('Y-- Horizontal')
//         coord_C = [(coord_A[0]), coord_A[1]]
//         coord_B = [coord_C[0], (coord_C[1] - side_B_length)] // DIFFERENT ( - / + )
//     } else if (p1x == p2x && p1y < p2y) {
//         // console.log('X-- Vertical')
//         coord_C = [(coord_A[0] - side_A_length), coord_A[1]] // DIFFERENT ( - / + )
//         coord_B = [coord_C[0], (coord_C[1])]



//     } else if (p1x > curvePointLineX && curvePointLineY > p2y) {
//         // console.log('1')
//         coord_C = ((p1y < p2y) ? [(coord_A[0] + side_A_length), coord_A[1]] : [(coord_A[0] - side_A_length), coord_A[1]]);
//         coord_B = [coord_C[0], (coord_C[1] + side_B_length)]
//     } else if (p1x < curvePointLineX && curvePointLineY < p2y) {
//         // console.log('2')
//         coord_C = ((p1y < p2y) ? [(coord_A[0] + side_A_length), coord_A[1]] : [(coord_A[0] - side_A_length), coord_A[1]]);
//         coord_B = [coord_C[0], (coord_C[1] - side_B_length)]
//     } else if (p1x > curvePointLineX && curvePointLineY < p2y) {
//         // console.log('3')
//         coord_C = [(coord_A[0] - side_A_length), coord_A[1]]
//         coord_B = ((p1x < p2x) ? [coord_C[0], (coord_C[1] + side_B_length)] : [coord_C[0], (coord_C[1] - side_B_length)])
//     } else if (p1x < curvePointLineX && curvePointLineY > p2y) {
//         // console.log('4')
//         coord_C = [(coord_A[0] + side_A_length), coord_A[1]]
//         coord_B = ((p1x < p2x) ? [coord_C[0], (coord_C[1] + side_B_length)] : [coord_C[0], (coord_C[1] - side_B_length)]);
//     }

//     let solveTriangleData = {
//         coords: {
//             coord_A: coord_A,
//             coord_B: coord_B,
//             coord_C: coord_C,
//         },
//     }
//     return solveTriangleData
// }

// function solvTriangleEAST(triangleA_sides, p1x, p1y, p2x, p2y, curvePointLineX, curvePointLineY, cpX, cpY) {
//     let sinOfAngle_A = triangleA_sides.side_A / triangleA_sides.side_C
//     let base_angle_A = Math.asin(sinOfAngle_A) * (180/Math.PI)
//     let angle_A = base_angle_A * (Math.PI/180)
//     let side_C_length = triangleA_sides.side_C / 2
//     let side_A_length = side_C_length * (Math.sin(angle_A))
//     let side_B_length = side_C_length * (Math.cos(angle_A))
//     let coord_A = findLineMidpoint(p1x, p1y, p2x, p2y)
//     let coord_C = ''
//     let coord_B = ''

//     if (p1x == p2x && p1y == p2y) {
//         // console.log('No Line')
//         coord_C = [coord_A[0], coord_A[1]]
//         coord_B = [coord_C[0], coord_C[1]]
//     } else if (p1x > p2x && p1y == p2y) {
//         // console.log('Y++ Horizontal')
//         coord_C = [(coord_A[0]), coord_A[1]]
//         coord_B = [coord_C[0], (coord_C[1] - side_B_length)] // DIFFERENT ( - / + )
//     } else if (p1x == p2x && p1y > p2y) {
//         // console.log('X++ Vertical')
//         coord_C = [(coord_A[0] - side_A_length), coord_A[1]] // DIFFERENT ( - / + )
//         coord_B = [coord_C[0], (coord_C[1])]
//     } else if (p1x < p2x && p1y == p2y) {
//         // console.log('Y-- Horizontal')
//         coord_C = [(coord_A[0]), coord_A[1]]
//         coord_B = [coord_C[0], (coord_C[1] + side_B_length)] // DIFFERENT ( + / - )
//     } else if (p1x == p2x && p1y < p2y) {
//         // console.log('X-- Vertical')
//         coord_C = [(coord_A[0] + side_A_length), coord_A[1]] // DIFFERENT ( + / - )
//         coord_B = [coord_C[0], (coord_C[1])]

//     } else if (p2x > curvePointLineX && curvePointLineY > p1y) {
//         // console.log('1')
//         coord_C = ((p2y < p1y) ? [(coord_A[0] + side_A_length), coord_A[1]] : [(coord_A[0] - side_A_length), coord_A[1]]);
//         coord_B = [coord_C[0], (coord_C[1] + side_B_length)]
//     } else if (p2x < curvePointLineX && curvePointLineY < p1y) {
//         // console.log('2')
//         coord_C = ((p2y < p1y) ? [(coord_A[0] + side_A_length), coord_A[1]] : [(coord_A[0] - side_A_length), coord_A[1]]);
//         coord_B = [coord_C[0], (coord_C[1] - side_B_length)]
//     } else if (p2x > curvePointLineX && curvePointLineY < p1y) {
//         // console.log('3')
//         coord_C = [(coord_A[0] - side_A_length), coord_A[1]]
//         coord_B = ((p2x < p1x) ? [coord_C[0], (coord_C[1] + side_B_length)] : [coord_C[0], (coord_C[1] - side_B_length)]);
//     } else if (p2x < curvePointLineX && curvePointLineY > p1y) {
//         // console.log('4')
//         coord_C = [(coord_A[0] + side_A_length), coord_A[1]]
//         coord_B = ((p2x < p1x) ? [coord_C[0], (coord_C[1] + side_B_length)] : [coord_C[0], (coord_C[1] - side_B_length)]);
//     }

//     let solveTriangleData = {
//         coords: {
//             coord_A: coord_A,
//             coord_B: coord_B,
//             coord_C: coord_C,
//         },
//     }
//     return solveTriangleData
// }














    // Wasnt working, but after looking at it, it looks like it is the same exact format as 'describeArc()'
    // let path = d3.select(self.pathElement[0][0]);
    // path.attr({
    //     d:"M " + self.lineData[0].x + " " + self.lineData[0].x + 
    //     " A " + circRadius + " " + circRadius+ " " + 
    //     0 + " " + 0 + " " + 0 + " " + 
    //     self.curvePointData[0].x + " " + self.curvePointData[0].y});


    // function solvTriangleEAST(triangleA_sides, x1, y1, x2, y2, curvePointLineX) {
    //     let sinOfAngle_A = triangleA_sides.side_A / triangleA_sides.side_C
    //     let base_angle_A = Math.asin(sinOfAngle_A) * (180/Math.PI)
    //     let angle_A = base_angle_A * (Math.PI/180)
    //     let side_C_length = triangleA_sides.side_C / 2
    //     let side_A_length = side_C_length * (Math.sin(angle_A))
    //     let side_B_length = side_C_length * (Math.cos(angle_A))
    //     let coord_A = findLineMidpoint(x1, y1, x2, y2)
    //     let coord_C = ''
    //     let coord_B = ''

    //     if (x1 == x2 && y1 == y2) {
    //         // console.log('No Line')
    //         coord_C = [coord_A[0], coord_A[1]]
    //         coord_B = [coord_C[0], coord_C[1]]
    //     } else if (x1 > x2 && y1 == y2) {
    //         // console.log('Y++ Horizontal')
    //         coord_C = [(coord_A[0]), coord_A[1]]
    //         coord_B = [coord_C[0], (coord_C[1] - side_B_length)]
    //     } else if (x1 == x2 && y1 > y2) {
    //         // console.log('X++ Vertical')
    //         coord_C = [(coord_A[0] + side_A_length), coord_A[1]]
    //         coord_B = [coord_C[0], (coord_C[1])]
    //     } else if (x1 < x2 && y1 == y2) {
    //         // console.log('Y-- Horizontal')
    //         coord_C = [(coord_A[0]), coord_A[1]]
    //         coord_B = [coord_C[0], (coord_C[1] + side_B_length)]
    //     } else if (x1 == x2 && y1 < y2) {
    //         // console.log('X-- Vertical')
    //         coord_C = [(coord_A[0] - side_A_length), coord_A[1]]
    //         coord_B = [coord_C[0], (coord_C[1])]

    //     } else if(x1 > x2 && y1 > y2) {
    //         // console.log('1')
    //         coord_C = [(coord_A[0] + side_A_length), coord_A[1]]
    //         coord_B = [coord_C[0], (coord_C[1] - side_B_length)]
    //     } else if (x1 < x2 && y1 < y2) {
    //         // console.log('2')
    //         coord_C = [(coord_A[0] - side_A_length), coord_A[1]]
    //         coord_B = [coord_C[0], (coord_C[1] + side_B_length)]
    //     } else if (x1 > x2 && y1 < y2) {
    //         // console.log('3')
    //         coord_C = [(coord_A[0] + side_A_length), coord_A[1]]
    //         coord_B = [coord_C[0], (coord_C[1] + side_B_length)]
    //     } else if (x1 < x2 && y1 > y2) {
    //         // console.log('4')
    //         coord_C = [(coord_A[0] - side_A_length), coord_A[1]]
    //         coord_B = [coord_C[0], (coord_C[1] - side_B_length)]
    //     }

    //     let solveTriangleData = {
    //         coords: {
    //             coord_A: coord_A,
    //             coord_B: coord_B,
    //             coord_C: coord_C,
    //         },
    //     }
    //     return solveTriangleData
    // }