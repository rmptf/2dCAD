const width = '100%'
const height = "500"

let svg = d3.select('body').append('svg')
    .attr('width', width)
    .attr('height', height)

d3.select("body").insert("div")
    .append("button")
    .text("Draw Rect")
    .on("click", drawRectangle);

d3.select("body").insert("div")
    .append("button")
    .text("Draw Line")
    .on("click", drawLine);

function drawRectangle() {
    let self = this, rect, rectData = [], m1, m2, isDown = false, isDrag = false;

    svg.on('mousedown', function() {
        m1 = d3.mouse(this);
        if (!isDown && !isDrag) {
            self.rectData = [ { x: m1[0], y: m1[1] }, { x: m1[0], y: m1[1] } ];
            self.rectangleElement = svg.append('rect').attr('class', 'rectangle').call(dragR);
            updateRect();
            isDrag = false;
        } else {
            isDrag = true;
        }
        isDown = !isDown
    })
    
    .on('mousemove', function() {
        m2 = d3.mouse(this);
        if(isDown && !isDrag) { 
            self.rectData[1] = { x: m2[0], y: m2[1] };
            updateRect();
        } 
    })

    let dragR = d3.behavior.drag().on('drag', dragRect);
    function dragRect() {
        let e = d3.event;
        for(let i = 0; i < self.rectData.length; i++){
            d3.select(self.rectangleElement[0][0])
                .attr('x', self.rectData[i].x += e.dx )
                .attr('y', self.rectData[i].y += e.dy );
        }
        rect.style('cursor', 'move');
        updateRect();
    }

    function updateRect() {
        rect = d3.select(self.rectangleElement[0][0]);
        rect.attr({
            x: self.rectData[1].x - self.rectData[0].x > 0 ? self.rectData[0].x :  self.rectData[1].x,
            y: self.rectData[1].y - self.rectData[0].y > 0 ? self.rectData[0].y :  self.rectData[1].y,
            width: Math.abs(self.rectData[1].x - self.rectData[0].x),
            height: Math.abs(self.rectData[1].y - self.rectData[0].y)
        });
    }
}



















function drawLine() {
    let self = this, line, lineData = [], m1, m2, isDown = false, isDrag = false;

    svg.on('mousedown', function() {
        m1 = d3.mouse(this);
        if (!isDown && !isDrag) {
            // LINE
            self.lineData = [ { x: m1[0], y: m1[1] }, { x: m1[0], y: m1[1] } ];
            self.lineElement = svg.append('line').attr('class', 'line').call(dragL);
            // LINE

            // PERPENDICULAR LINE
            self.perpendicularLineElement = svg.append('line').attr('class', 'line');
            // PERPENDICULAR LINE

            // END POINTS
            self.pointElement1 = svg.append('circle').attr('class', 'pointC').call(dragC1);
            self.pointElement2 = svg.append('circle').attr('class', 'pointC').call(dragC2);
            // END POINTS

            // MID POINT
            self.pointElementMP = svg.append('circle').attr('class', 'pointC');
            // MID POINT

            // RIGHT TRIANGLE
                // RIGHT TRIANGLE Sides
                self.lineElement_triangle_sideA = svg.append('line').attr('class', 'line');
                self.lineElement_triangle_sideB = svg.append('line').attr('class', 'line');
                self.lineElement_triangle_sideC = svg.append('line').attr('class', 'line');
                // RIGHT TRIANGLE Sides

                // RIGHT TRIANGLE Points
                self.pointElement_triangle_pointA = svg.append('circle').attr('class', 'pointC');
                self.pointElement_triangle_pointB = svg.append('circle').attr('class', 'pointC');
                self.pointElement_triangle_pointC = svg.append('circle').attr('class', 'pointC');
                // RIGHT TRIANGLE Points
            // RIGHT TRIANGLE

            // SOLVE TRIANGLE
                // SOLVE TRIANGLE Sides
                self.lineElement_solveTriangle_sideA = svg.append('line').attr('class', 'line');
                self.lineElement_solveTriangle_sideB = svg.append('line').attr('class', 'line');
                self.lineElement_solveTriangle_sideC = svg.append('line').attr('class', 'line');
                // SOLVE TRIANGLE Sides

                // SOLVE TRIANGLE Points
                self.pointElement_solveTriangle_pointA = svg.append('circle').attr('class', 'pointC');
                self.pointElement_solveTriangle_pointB = svg.append('circle').attr('class', 'pointC');
                self.pointElement_solveTriangle_pointC = svg.append('circle').attr('class', 'pointC');
                // SOLVE TRIANGLE Points
            // SOLVE TRIANGLE
            
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

    // LINE
    function dragLine() {
        let e = d3.event
        d3.select(self.lineElement[0][0])
            .attr('x1', self.lineData[0].x += e.dx )
            .attr('y1', self.lineData[0].y += e.dy )
            .attr('x2', self.lineData[1].x += e.dx )
            .attr('y2', self.lineData[1].y += e.dy )
        line.style('cursor', 'move');
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


    function updateFigureA() {
        let rightTriangleData = findRightTriangle(self.lineData[0].x, self.lineData[0].y, self.lineData[1].x,self.lineData[1].y)
        let rightTriangleCoords = rightTriangleData.coords
        let solveTriangleData = solvTriangle(rightTriangleData.sides, self.lineData[0].x, self.lineData[0].y, self.lineData[1].x,self.lineData[1].y)
        let solvTriangleCoords = solveTriangleData.coords

        // LINE
        line = d3.select(self.lineElement[0][0]);
        line.attr({
            x1:self.lineData[0].x,
            y1:self.lineData[0].y,
            x2:self.lineData[1].x,
            y2:self.lineData[1].y,
        });
        line.style('stroke', 'grey')
        line.style('stroke-width', 3)
        // LINE

        // PERPENDICULAR LINE
        let perpendicularLine = d3.select(self.perpendicularLineElement[0][0]);
        perpendicularLine.attr({
            x1:solvTriangleCoords.coord_A[0],
            y1:solvTriangleCoords.coord_A[1],
            x2:solvTriangleCoords.coord_B[0],
            y2:solvTriangleCoords.coord_B[1],
        });
        perpendicularLine.style('stroke', 'grey')
        perpendicularLine.style('stroke-width', 3)
        // PERPENDICULAR LINE

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

        // MID POINT
        let pointMP = d3.select(self.pointElementMP[0][0]).data(self.lineData);
        let lineMidPointCoords = findLineMidpoint(self.lineData[0].x, self.lineData[0].y, self.lineData[1].x,self.lineData[1].y)
        pointMP.attr('r', 5)
                .attr('cx', lineMidPointCoords[0])
                .attr('cy', lineMidPointCoords[1])
                .attr('fill', 'pink');
        // MID POINT


        // TRIANGLES
            // RIGHT TRIANGLE
                // RIGHT TRIANGLE Sides
                let line_triangle_sideA = d3.select(self.lineElement_triangle_sideA[0][0]);
                line_triangle_sideA.attr({
                    x1:rightTriangleCoords.coord_B[0],
                    y1:rightTriangleCoords.coord_B[1],
                    x2:rightTriangleCoords.coord_C[0],
                    y2:rightTriangleCoords.coord_C[1],
                });
                line_triangle_sideA.style('stroke', 'red')
                line_triangle_sideA.style('stroke-width', 0.5)

                let line_triangle_sideB = d3.select(self.lineElement_triangle_sideB[0][0]);
                line_triangle_sideB.attr({
                    x1:rightTriangleCoords.coord_C[0],
                    y1:rightTriangleCoords.coord_C[1],
                    x2:rightTriangleCoords.coord_A[0],
                    y2:rightTriangleCoords.coord_A[1],
                });
                line_triangle_sideB.style('stroke', 'green')
                line_triangle_sideB.style('stroke-width', 0.5)

                let line_triangle_sideC = d3.select(self.lineElement_triangle_sideC[0][0]);
                line_triangle_sideC.attr({
                    x1:rightTriangleCoords.coord_A[0],
                    y1:rightTriangleCoords.coord_A[1],
                    x2:rightTriangleCoords.coord_B[0],
                    y2:rightTriangleCoords.coord_B[1],
                });
                line_triangle_sideC.style('stroke', 'blue')
                line_triangle_sideC.style('stroke-width', 0.5)
                // RIGHT TRIANGLE Sides

                // RIGHT TRIANGLE Points
                let point_triangle_pointA = d3.select(self.pointElement_triangle_pointA[0][0]).data(self.lineData);
                point_triangle_pointA.attr('r', 2.5)
                        .attr('cx', rightTriangleCoords.coord_A[0])
                        .attr('cy', rightTriangleCoords.coord_A[1])
                        .attr('fill', 'red');
                
                let point_triangle_pointB = d3.select(self.pointElement_triangle_pointB[0][0]).data(self.lineData);
                point_triangle_pointB.attr('r', 2.5)
                        .attr('cx', rightTriangleCoords.coord_B[0])
                        .attr('cy', rightTriangleCoords.coord_B[1])
                        .attr('fill', 'green');

                let point_triangle_pointC = d3.select(self.pointElement_triangle_pointC[0][0]).data(self.lineData);
                point_triangle_pointC.attr('r', 2.5)
                        .attr('cx', rightTriangleCoords.coord_C[0])
                        .attr('cy', rightTriangleCoords.coord_C[1])
                        .attr('fill', 'blue');
                // RIGHT TRIANGLE Points
            // RIGHT TRIANGLE

            // SOLVE TRIANGLE
                // SOLVE TRIANGLE Sides
                let line_solveTriangle_sideA = d3.select(self.lineElement_solveTriangle_sideA[0][0]);
                line_solveTriangle_sideA.attr({
                    x1:solvTriangleCoords.coord_B[0],
                    y1:solvTriangleCoords.coord_B[1],
                    x2:solvTriangleCoords.coord_C[0],
                    y2:solvTriangleCoords.coord_C[1],
                });
                line_solveTriangle_sideA.style('stroke', 'red')
                line_solveTriangle_sideA.style('stroke-width', 0.5)

                let line_solveTriangle_sideB = d3.select(self.lineElement_solveTriangle_sideB[0][0]);
                line_solveTriangle_sideB.attr({
                    x1:solvTriangleCoords.coord_C[0],
                    y1:solvTriangleCoords.coord_C[1],
                    x2:solvTriangleCoords.coord_A[0],
                    y2:solvTriangleCoords.coord_A[1],
                });
                line_solveTriangle_sideB.style('stroke', 'green')
                line_solveTriangle_sideB.style('stroke-width', 0.5)

                let line_solveTriangle_sideC = d3.select(self.lineElement_solveTriangle_sideC[0][0]);
                line_solveTriangle_sideC.attr({
                    x1:solvTriangleCoords.coord_A[0],
                    y1:solvTriangleCoords.coord_A[1],
                    x2:solvTriangleCoords.coord_B[0],
                    y2:solvTriangleCoords.coord_B[1],
                });
                line_solveTriangle_sideC.style('stroke', 'blue')
                line_solveTriangle_sideC.style('stroke-width', 0.5)
                // SOLVE TRIANGLE Sides

                // SOLVE TRIANGLE Points
                let point_solveTriangle_pointA = d3.select(self.pointElement_solveTriangle_pointA[0][0]).data(self.lineData);
                point_solveTriangle_pointA.attr('r', 2.5)
                        .attr('cx', solvTriangleCoords.coord_A[0])
                        .attr('cy', solvTriangleCoords.coord_A[1])
                        .attr('fill', 'red');
                
                let point_solveTriangle_pointB = d3.select(self.pointElement_solveTriangle_pointB[0][0]).data(self.lineData);
                point_solveTriangle_pointB.attr('r', 2.5)
                        .attr('cx', solvTriangleCoords.coord_B[0])
                        .attr('cy', solvTriangleCoords.coord_B[1])
                        .attr('fill', 'green');

                let point_solveTriangle_pointC = d3.select(self.pointElement_solveTriangle_pointC[0][0]).data(self.lineData);
                point_solveTriangle_pointC.attr('r', 2.5)
                        .attr('cx', solvTriangleCoords.coord_C[0])
                        .attr('cy', solvTriangleCoords.coord_C[1])
                        .attr('fill', 'blue');
                // SOLVE TRIANGLE Points
            // SOLVE TRIANGLE
        // TRIANGLES
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

    function solvTriangle(triangleA_sides, x1, y1, x2, y2) {
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
            coord_B = [coord_C[0], (coord_C[1] - side_B_length)]
        } else if (x1 == x2 && y1 > y2) {
            // console.log('X++ Vertical')
            coord_C = [(coord_A[0] + side_A_length), coord_A[1]]
            coord_B = [coord_C[0], (coord_C[1])]
        } else if (x1 < x2 && y1 == y2) {
            // console.log('Y-- Horizontal')
            coord_C = [(coord_A[0]), coord_A[1]]
            coord_B = [coord_C[0], (coord_C[1] + side_B_length)]
        } else if (x1 == x2 && y1 < y2) {
            // console.log('X-- Vertical')
            coord_C = [(coord_A[0] - side_A_length), coord_A[1]]
            coord_B = [coord_C[0], (coord_C[1])]
        } else if(x1 > x2 && y1 > y2) {
            // console.log('1')
            coord_C = [(coord_A[0] + side_A_length), coord_A[1]]
            coord_B = [coord_C[0], (coord_C[1] - side_B_length)]
        } else if (x1 < x2 && y1 < y2) {
            // console.log('2')
            coord_C = [(coord_A[0] - side_A_length), coord_A[1]]
            coord_B = [coord_C[0], (coord_C[1] + side_B_length)]
        } else if (x1 > x2 && y1 < y2) {
            // console.log('3')
            coord_C = [(coord_A[0] - side_A_length), coord_A[1]]
            coord_B = [coord_C[0], (coord_C[1] - side_B_length)]
        } else if (x1 < x2 && y1 > y2) {
            // console.log('4')
            coord_C = [(coord_A[0] + side_A_length), coord_A[1]]
            coord_B = [coord_C[0], (coord_C[1] + side_B_length)]
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
}




        // // line
        // l_x1, l_y1, l_x2, l_y2
        // start = coord_A = [x1, y1]
        // end = coord_B = [x2, y2]

        // // traingle point
        // tp_x1, tp_y1, tp_x2, tp_y2, tp_x3, tp_y3
        // A = coord_A = [tp_x1, tp_y1]
        // B = coord_B = [tp_x2, tp_y2]
        // C = coord_C = [tp_x3, tp_y3]

        // // triangle sides
        // tp_x1, tp_y1, tp_x2, tp_y2, tp_x3, tp_y3
        // legY = side_A = ([tp_x2, tp_y2],[tp_x3, tp_y3])
        // legX = side_B = ([tp_x3, tp_y3],[tp_x1, tp_y1])
        // hypotenuse = side_C = ([tp_x1, tp_y1],[tp_x2, tp_y2])


        // Right angle follows line direction
        // if(x1 > x2 && y1 > y2) {
        //     console.log("11111")
        //     coord_C = [(coord_A[0] + side_A_length), coord_A[1]]
        //     coord_B = [coord_C[0], (coord_C[1] - side_B_length)]
        // } else if (x1 < x2 && y1 < y2) {
        //     console.log("2222")
        //     coord_C = [(coord_A[0] - side_A_length), coord_A[1]]
        //     coord_B = [coord_C[0], (coord_C[1] + side_B_length)]
        // } else if (x1 > x2 && y1 < y2) {
        //     console.log("333")
        //     coord_C = [(coord_A[0] + side_A_length), coord_A[1]]
        //     coord_B = [coord_C[0], (coord_C[1] + side_B_length)]
        // } else if (x1 < x2 && y1 > y2) {
        //     console.log('44444')
        //     coord_C = [(coord_A[0] - side_A_length), coord_A[1]]
        //     coord_B = [coord_C[0], (coord_C[1] - side_B_length)]
        // }