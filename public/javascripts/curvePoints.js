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
    let self = this, line, lineData = [], curvePointData = [{x:100,y:100}],  m1, m2, isDown = false, isDrag = false;

    svg.on('mousedown', function() {
        m1 = d3.mouse(this);
        if (!isDown && !isDrag) {
            // LINE
            self.lineData = [ { x: m1[0], y: m1[1] }, { x: m1[0], y: m1[1] } ];
            self.lineElement = svg.append('line').attr('class', 'line').call(dragL);
            // LINE

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
            self.curvePointData = [{ x: m1[0], y: m1[1] }];
            self.pointElementCP = svg.append('circle').attr('class', 'pointC').call(dragC3);
            // CURVE POINT

            // INTERSECTING POINT
            self.pointElementIP = svg.append('circle').attr('class', 'pointC').call(dragC1);
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
        let perpPoints = findPerpendicularFromPoint(self.curvePointData[0].x, self.curvePointData[0].y, self.lineData[0].x, self.lineData[0].y, self.lineData[1].x, self.lineData[1].y)

        let rightTriangleData = findRightTriangle(self.lineData[0].x, self.lineData[0].y, self.curvePointData[0].x,self.curvePointData[0].y)
        // let rightTriangleCoords = rightTriangleData.coords
        let solveTriangleData = solvTriangleWEST(rightTriangleData.sides, self.lineData[0].x, self.lineData[0].y, self.curvePointData[0].x,self.curvePointData[0].y, perpPoints[0], perpPoints[1], self.curvePointData[0].x, self.curvePointData[0].y)
        let solvTriangleCoords = solveTriangleData.coords

        let rightTriangleData2 = findRightTriangle(self.curvePointData[0].x, self.curvePointData[0].y, self.lineData[1].x,self.lineData[1].y)
        // let rightTriangleCoords2 = rightTriangleData2.coords
        let solveTriangleData2 = solvTriangleEAST(rightTriangleData2.sides, self.curvePointData[0].x, self.curvePointData[0].y, self.lineData[1].x,self.lineData[1].y, perpPoints[0], perpPoints[1], self.curvePointData[0].x, self.curvePointData[0].y)
        let solvTriangleCoords2 = solveTriangleData2.coords

        let intersectingTriangle = findIntersectingTriangle(self.curvePointData[0].x, self.curvePointData[0]. y,perpPoints[0], perpPoints[1], solvTriangleCoords.coord_A[0], solvTriangleCoords.coord_A[1], solvTriangleCoords.coord_B[0], solvTriangleCoords.coord_B[1])

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

        // CURVE POINT LEG
        let lineCPLA = d3.select(self.lineElementCPLA[0][0]);
        lineCPLA.attr({
            x1:self.lineData[0].x,
            y1:self.lineData[0].y,
            x2:self.curvePointData[0].x,
            y2:self.curvePointData[0].y,
        });
        lineCPLA.style('stroke', 'grey')
        lineCPLA.style('stroke-width', 2.5)
        
        let lineCPLB = d3.select(self.lineElementCPLB[0][0]);
        lineCPLB.attr({
            x1:self.curvePointData[0].x,
            y1:self.curvePointData[0].y,
            x2:self.lineData[1].x,
            y2:self.lineData[1].y,
        });
        lineCPLB.style('stroke', 'grey')
        lineCPLB.style('stroke-width', 2.5)
        // CURVE POINT LEG

        // CP PERPENDICULAR LINE
        let lineCPPL = d3.select(self.lineElementCPPL[0][0]);
        lineCPPL.attr({
            x1:self.curvePointData[0].x,
            y1:self.curvePointData[0].y,
            x2:perpPoints[0],
            y2:perpPoints[1],
        });
        lineCPPL.style('stroke', 'grey')
        lineCPPL.style('stroke-width', 2.5)
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
        let pointIP = d3.select(self.pointElementIP[0][0]);
        pointIP.attr('r', 5)
                .attr('cx', intersectingTriangle[0])
                .attr('cy', intersectingTriangle[1])
                .attr('fill', 'red');
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

    function findRightTriangle(x1, y1, x2, y2) {
        let rightTriangleData = {
            coords: {
                coord_A:[x1, y1],
                coord_B:[x2, y2],
                coord_C:[x2, y1],
            },
            sides: {
                side_A: getDistance(x2, y2, x2, y1),
                side_B: getDistance(x2, y1, x1, y1),
                side_C: getDistance(x2, y2, x1, y1)
            },
        }
        return rightTriangleData
    }

    function solvTriangleWEST(triangleA_sides, x1, y1, x2, y2, perpPointsX, perpPointsY, cpX, cpY) {
        let sinOfAngle_A = triangleA_sides.side_A / triangleA_sides.side_C
        let base_angle_A = Math.asin(sinOfAngle_A) * (180/Math.PI)
        let angle_A = base_angle_A * (Math.PI/180)
        let side_C_length = triangleA_sides.side_C / 2
        let side_A_length = side_C_length * (Math.sin(angle_A))
        let side_B_length = side_C_length * (Math.cos(angle_A))
        let coord_A = findLineMidpoint(x1, y1, x2, y2)
        let coord_C = ''
        let coord_B = ''
        
        if (x1 == x2 && y1 == y2) {
            // console.log('No Line')
            coord_C = [coord_A[0], coord_A[1]]
            coord_B = [coord_C[0], coord_C[1]]
        } else if (x1 > x2 && y1 == y2) {
            // console.log('Y++ Horizontal')
            coord_C = [(coord_A[0]), coord_A[1]]
            coord_B = [coord_C[0], (coord_C[1] + side_B_length)]
        } else if (x1 == x2 && y1 > y2) {
            // console.log('X++ Vertical')
            coord_C = [(coord_A[0] + side_A_length), coord_A[1]]
            coord_B = [coord_C[0], (coord_C[1])]
        } else if (x1 < x2 && y1 == y2) {
            // console.log('Y-- Horizontal')
            coord_C = [(coord_A[0]), coord_A[1]]
            coord_B = [coord_C[0], (coord_C[1] - side_B_length)]
        } else if (x1 == x2 && y1 < y2) {
            // console.log('X-- Vertical')
            coord_C = [(coord_A[0] - side_A_length), coord_A[1]]
            coord_B = [coord_C[0], (coord_C[1])]

        // } else if(x1 > x2 && y1 > y2) {
        } else if (x1 > perpPointsX && perpPointsY > cpY) {
            // console.log('1')
            // coord_C = [(coord_A[0] - side_A_length), coord_A[1]]
            coord_C = ((y1 < cpY) ? [(coord_A[0] + side_A_length), coord_A[1]] : [(coord_A[0] - side_A_length), coord_A[1]]);
            coord_B = [coord_C[0], (coord_C[1] + side_B_length)]
            
        // } else if(x1 < x2 && y1 < y2) {
        } else if (x1 < perpPointsX && perpPointsY < cpY) {
            // console.log('2')
            // coord_C = [(coord_A[0] + side_A_length), coord_A[1]]
            coord_C = ((y1 < cpY) ? [(coord_A[0] + side_A_length), coord_A[1]] : [(coord_A[0] - side_A_length), coord_A[1]]);
            coord_B = [coord_C[0], (coord_C[1] - side_B_length)]
        // } else if (x1 > x2 && y1 < y2) {
        } else if (x1 > perpPointsX && perpPointsY < cpY) {
            // console.log('3')
            coord_C = [(coord_A[0] - side_A_length), coord_A[1]]
            // coord_B = [coord_C[0], (coord_C[1] - side_B_length)]
            coord_B = ((x1 < cpX) ? [coord_C[0], (coord_C[1] + side_B_length)] : [coord_C[0], (coord_C[1] - side_B_length)]);
        // } else if(x1 < x2 && y1 > y2) {
        } else if (x1 < perpPointsX && perpPointsY > cpY) {
            // console.log('4')
            coord_C = [(coord_A[0] + side_A_length), coord_A[1]]
            // coord_B = [coord_C[0], (coord_C[1] + side_B_length)]
            coord_B = ((x1 < cpX) ? [coord_C[0], (coord_C[1] + side_B_length)] : [coord_C[0], (coord_C[1] - side_B_length)]);
        }

        let solveTriangleData = {
            coords: {
                coord_A: coord_A,
                coord_B: coord_B,
                coord_C: coord_C,
            },
        }
        return solveTriangleData
    }

    function solvTriangleEAST(triangleA_sides, x1, y1, x2, y2, perpPointsX, perpPointsY, cpX, cpY) {
        let sinOfAngle_A = triangleA_sides.side_A / triangleA_sides.side_C
        let base_angle_A = Math.asin(sinOfAngle_A) * (180/Math.PI)
        let angle_A = base_angle_A * (Math.PI/180)
        let side_C_length = triangleA_sides.side_C / 2
        let side_A_length = side_C_length * (Math.sin(angle_A))
        let side_B_length = side_C_length * (Math.cos(angle_A))
        let coord_A = findLineMidpoint(x1, y1, x2, y2)
        let coord_C = ''
        let coord_B = ''
        
        if (x1 == x2 && y1 == y2) {
            console.log('No Line')
            // coord_C = [coord_A[0], coord_A[1]]
            // coord_B = [coord_C[0], coord_C[1]]
        } else if (x1 > x2 && y1 == y2) {
            console.log('Y++ Horizontal')
            coord_C = [(coord_A[0]), coord_A[1]]
            coord_B = [coord_C[0], (coord_C[1] - side_B_length)]
        } else if (x1 == x2 && y1 > y2) {
            console.log('X++ Vertical')
            coord_C = [(coord_A[0] - side_A_length), coord_A[1]]
            coord_B = [coord_C[0], (coord_C[1])]
        } else if (x1 < x2 && y1 == y2) {
            console.log('Y-- Horizontal')
            coord_C = [(coord_A[0]), coord_A[1]]
            coord_B = [coord_C[0], (coord_C[1] + side_B_length)]
        } else if (x1 == x2 && y1 < y2) {
            console.log('X-- Vertical')
            coord_C = [(coord_A[0] + side_A_length), coord_A[1]]
            coord_B = [coord_C[0], (coord_C[1])]

        // } else if(x1 > x2 && y1 > y2) {
        } else if (x2 > perpPointsX && perpPointsY > cpY) {
            // console.log('1')
            // coord_C = [(coord_A[0] - side_A_length), coord_A[1]]
            coord_C = ((y2 < cpY) ? [(coord_A[0] + side_A_length), coord_A[1]] : [(coord_A[0] - side_A_length), coord_A[1]]);
            coord_B = [coord_C[0], (coord_C[1] + side_B_length)]
            
        // } else if(x1 < x2 && y1 < y2) {
        } else if (x2 < perpPointsX && perpPointsY < cpY) {
            // console.log('2')
            // coord_C = [(coord_A[0] + side_A_length), coord_A[1]]
            coord_C = ((y2 < cpY) ? [(coord_A[0] + side_A_length), coord_A[1]] : [(coord_A[0] - side_A_length), coord_A[1]]);
            coord_B = [coord_C[0], (coord_C[1] - side_B_length)]
        // } else if (x1 > x2 && y1 < y2) {
        } else if (x2 > perpPointsX && perpPointsY < cpY) {
            // console.log('3')
            coord_C = [(coord_A[0] - side_A_length), coord_A[1]]
            // coord_B = [coord_C[0], (coord_C[1] - side_B_length)]
            coord_B = ((x2 < cpX) ? [coord_C[0], (coord_C[1] + side_B_length)] : [coord_C[0], (coord_C[1] - side_B_length)]);
        // } else if(x1 < x2 && y1 > y2) {
        } else if (x2 < perpPointsX && perpPointsY > cpY) {
            // console.log('4')
            coord_C = [(coord_A[0] + side_A_length), coord_A[1]]
            // coord_B = [coord_C[0], (coord_C[1] + side_B_length)]
            coord_B = ((x2 < cpX) ? [coord_C[0], (coord_C[1] + side_B_length)] : [coord_C[0], (coord_C[1] - side_B_length)]);
        }

        let solveTriangleData = {
            coords: {
                coord_A: coord_A,
                coord_B: coord_B,
                coord_C: coord_C,
            },
        }
        return solveTriangleData
    }

    function findPerpendicularFromPoint(x, y, x1, y1, x2, y2){
        let path1 = {pointA:{x:x1, y:y1},pointB:{x:x2, y:y2}}
        let path2 = {pointA:{x:0, y:0},pointB:{x:0, y:0}}
        path2.pointA.x = x
        path2.pointA.y = y

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

    // line intercept math by Paul Bourke http://paulbourke.net/geometry/pointlineplane/
    // Determine the intersection point of two line segments
    // Return FALSE if the lines don't intersect

    // x1y1x2y2 = cp - mp
    // x3y3x4y4 = westTriangle_A, westTriangle_B
    function findIntersectingTriangle(x1, y1, x2, y2, x3, y3, x4, y4) {

        // console.log(x1, y1, x2, y2, x3, y3, x4, y4)

        // Check if none of the lines are of length 0
        if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
            console.log(1111)
            return false
        }
    
        denominator = ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1))
    
        // Lines are parallel
        if (denominator === 0) {
            console.log(2222)
            return false
        }
    
        let ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator
        let ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator
    
        // is the intersection along the segments
        if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
            console.log(3333)
            return false
        }
    
        // Return a object with the x and y coordinates of the intersection
        let x = x1 + ua * (x2 - x1)
        let y = y1 + ua * (y2 - y1)
    
        console.log(x,y)
        return [x, y]
    }

}








    // function solvTriangleEAST(triangleA_sides, x1, y1, x2, y2, perpPointsX) {
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