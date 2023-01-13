//     Add a new path segment and end point element to existing path element at coordinate the path element is clicked.
// METHOD:
//     √ Create a second layer of invisible path elements on top of the main path element.
//     √ The second layer will be a group of single path elements, each corrosponding to the path segments of the main path element.
//     √ Each main path element's segment coordnite and each invisible path element's coordinates will be placed in their own array.
//     √ When the main path element is clicked the second layer will actually recieve the click event and return the coordinates of the single path element that was clicked and the mouse coordinates.
//     √ The coordinates of the single path element will be used to search the array of single path element's coordinates and return the index of the coordinates found in the array.
//     √ The index returned can be used to determine the index of the main path segments that corrosponds to the single path element.
//     √ That segment from the main path can be split into two more segments at the corrosponding point clicked by adding a new segment coordinate at the correct index of the original path node array.
//     √ A corrosponding end point can be added at the correct coordinate and its data can be added to the correct index of the end point array.
//     √ Then the second path layer can be updated using the new main path segment data.
//     √ Fix path counting issues

// ADDITIONAL OBJECTIVES:
// Find Center:
//     Add an algorithm to find the point of the CENTER of the path closest to where the path was clicked IF the path is wider than 1px.
//     This way if a point is added to a straight path, but the path is wider than 1px and the path was clicked outside of its center, the new path segment will be added to its center so the new path will stay straight.
// METHOD:
//     TBD.

// Curve Points:
//      Destinguish between regular points and curve points
// METHOD
//      TBD.


const width = '100%'
const height = '600px'

let svg = d3.select('body').append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('fill', 'red')

d3.select("body").insert("div")
    .append("button")
    .text("Draw Path")
    .on("click", drawPath)

d3.select("body").insert("div")
    .append("button")
    .text("Add Curve Point")
    .on("click", addCurvePoint)

let groupCounter = -1

let pathDatas = []
let mainPaths = []
let secondaryPathGroups = []
let endPointsGroups = []
let pressAddCurveButton = false

function addCurvePoint() {
    pressAddCurveButton = true
}
function drawPath(){
    pressAddCurveButton = false
    let self = this, m1, isDown = false, thisCount
    let secondaryPathCount = 0

    svg.on('click', mouseDown)
    svg.on('dblclick', mouseUp)

    function mouseDown(event) {
        m1 = d3.pointer(event)
        if (isDown === false) {
            groupCounter = groupCounter + 1
            thisCount = groupCounter
            let thisPathCount = 0

            self.group = svg.append('g').attr('class', 'figureGroup')
            self.mainPathGroup = self.group.append('g').attr('class', 'mainPathGroup')
            self.secondaryPathGroup = self.group.append('g').attr('class', 'secondaryPathGroup')
            self.endPointGroup = self.group.append('g').attr('class', 'endPointGroup')

            // MAIN PATH
            pathDatas.push([
                {coords: {x: m1[0], y: m1[1]}, arc: {exist: false}},
                {coords: {x: m1[0], y: m1[1]}, arc: {exist: false}},
            ])
            mainPaths.push(self.mainPathGroup.append('path').attr('class', 'path').call(d3.drag().on("drag", function(event) {dragPath(event, mainPaths[thisCount], secondaryPathGroups[thisCount], endPointsGroups[thisCount], pathDatas[thisCount])})).on("click", function() {mainPathClick(this, event)}))
            // MAIN PATH

            // SECONDARY PATH
            let secondaryPathGroup = []
            secondaryPathGroup.push(self.secondaryPathGroup.append('path').attr('class', 'path').on("click", function(event) {secondaryPathClick(this, event, thisCount, thisPathCount)}))
            secondaryPathGroups.push(secondaryPathGroup)
            // SECONDARY PATH

            // DYNAMIC END POINTS
            let endPoints = []
            for (let i = 0; i < pathDatas[thisCount].length; i++) {
                let newPoint = (self.endPointGroup.append('circle').attr('class', 'endPoint'))
                endPoints.push(newPoint)
            }
            endPointsGroups.push(endPoints)
            // DYNAMIC END POINTS

            isDown = true
            updateSVG(mainPaths[thisCount], secondaryPathGroups[thisCount], endPointsGroups[thisCount], pathDatas[thisCount])
            svg.on("mousemove", mousemove)
        } else {
            secondaryPathCount = secondaryPathCount + 1
            let thisPathCount = secondaryPathCount
            pathDatas[thisCount].push({coords: {x: m1[0], y: m1[1]}, arc: {exist: false}})
            endPointsGroups[thisCount].push((self.endPointGroup.append('circle').attr('class', 'endPoint')))
            secondaryPathGroups[thisCount].push(self.secondaryPathGroup.append('path').attr('class', 'path').on("click", function(event) {secondaryPathClick(this, event, thisCount, thisPathCount)}))
            updateSVG(mainPaths[thisCount], secondaryPathGroups[thisCount], endPointsGroups[thisCount], pathDatas[thisCount])
            svg.on("mousemove", mousemove)
            // console.log(secondaryPathCount)
        }
    }

    function mousemove(event) {
        m2 = d3.pointer(event)
        if(isDown === true) {
            pathDatas[thisCount].at(-1).coords.x = m2[0]
            pathDatas[thisCount].at(-1).coords.y = m2[1]
            updateSVG(mainPaths[thisCount], secondaryPathGroups[thisCount], endPointsGroups[thisCount], pathDatas[thisCount])
        }
    }

    function mouseUp() {
        svg.on("click", null)
        svg.on("dblclick", null)
        svg.on("mousemove", null)
        secondaryPathCount = secondaryPathCount - 1
        for (let i = 0; i < 2; i++) {
            pathDatas[thisCount].pop()
            endPointsGroups[thisCount].at(-1).remove()
            endPointsGroups[thisCount].pop()
            secondaryPathGroups[thisCount].at(-1).remove()
            secondaryPathGroups[thisCount].pop()
        }
        updateSVG(mainPaths[thisCount], secondaryPathGroups[thisCount], endPointsGroups[thisCount], pathDatas[thisCount])
        
        for (let i = 0; i < endPointsGroups[thisCount].length; i++) {
            let currentEndPoint = endPointsGroups[thisCount][i]
            currentEndPoint.call(d3.drag().on("drag", function(event) {dragEndPoint(event, i, mainPaths[thisCount], secondaryPathGroups[thisCount], endPointsGroups[thisCount], pathDatas[thisCount])}))
        }
    }

    function secondaryPathClick(this1, event, thisCount, pathCount){
        m1 = d3.pointer(event)
        if (pressAddCurveButton === false) {
            // console.log(m1[0], m1[1])
            endPointsGroups[thisCount].push((self.endPointGroup.append('circle').attr('class', 'endPoint')))
            secondaryPathGroups[thisCount].push(self.secondaryPathGroup.append('path').attr('class', 'path'))
    
            let newPathCounter = -1
            for (let i = 0; i < secondaryPathGroups[thisCount].length; i++) {
                newPathCounter = newPathCounter + 1
                let thisPathCount = newPathCounter
                secondaryPathGroups[thisCount][i].on("click", function(event) {secondaryPathClick(this, event, thisCount, thisPathCount)})
            }
    
            let index = pathCount + 1
            let data = {coords: {x: m1[0], y: m1[1]}, arc: {exist: false}}
            pathDatas[thisCount].splice(index, 0, data);

            for (let i = 0; i < endPointsGroups[thisCount].length; i++) {
                let currentEndPoint = endPointsGroups[thisCount][i]
                currentEndPoint.call(d3.drag().on("drag", function(event) {dragEndPoint(event, i, mainPaths[thisCount], secondaryPathGroups[thisCount], endPointsGroups[thisCount], pathDatas[thisCount])}))
            }

            updateSVG(mainPaths[thisCount], secondaryPathGroups[thisCount], endPointsGroups[thisCount], pathDatas[thisCount])
        } else if (pressAddCurveButton === true) {
            console.log('path Arc exist = true')
            pressAddCurveButton = false
        }
    }
}

function mainPathClick(this1, event, pathCount){
    console.log('Main Path Click')
}

function describeNEWComplexPath(endPointsArrayPass, pathDataPass) {
    let M = ['M', pathDataPass[0].coords.x, pathDataPass[0].coords.y].join(' ')
    let arcsAndLines = []

    for (let i = 1; i < pathDataPass.length; i++) {
        if (pathDataPass[i].arc.exist == true) {



            let curvePoint
            if(pathDataPass[i - 1].arc.exist == false && pathDataPass[i + 1].arc.exist == true) {
                // First Path of curve
                curvePoint = endPointsArrayPass[i + 1]
                // let curvePointAnchor = findPerpendicularFromPoint(self.lineData, self.curvePointData[0])
                // let rightTriangleDataA = findRightTriangle(self.lineData[0], self.curvePointData[0])
                // let solveTriangleDataA = solvTriangleALL(rightTriangleDataA.sides, self.lineData[0].x, self.lineData[0].y, self.lineData[1].x, self.lineData[1].y, self.curvePointData[0].x, self.curvePointData[0].y, curvePointAnchor[0], curvePointAnchor[1])
                // let intersectingPointA = findIntersectingPoint(self.curvePointData[0].x, self.curvePointData[0].y, curvePointAnchor[0], curvePointAnchor[1], solveTriangleDataA.coords.coord_A[0], solveTriangleDataA.coords.coord_A[1], solveTriangleDataA.coords.coord_B[0], solveTriangleDataA.coords.coord_B[1])
                // let circRadiusA = getDistance(self.curvePointData[0].x, self.curvePointData[0].y, intersectingPointA.x, intersectingPointA.y)

                // if(inRange(self.curvePointData[0].x, (curvePointAnchor[0] - 0.5), (curvePointAnchor[0]) + 0.5) === true && inRange(self.curvePointData[0].y, (curvePointAnchor[1] - 0.5), (curvePointAnchor[1]) + 0.5)) {
                //     console.log('str')
                //     path.attr('d', describeStraightPath(self.lineData[0].x, self.lineData[0].y, self.curvePointData[0].x, self.curvePointData[0].y))
                //     path2.attr('d', describeStraightPath(self.curvePointData[0].x, self.curvePointData[0].y, self.lineData[1].x, self.lineData[1].y))
                //     path.style('stroke', 'red')
                //     path2.style('stroke', 'blue')
                // } else {
                //     console.log('arc')
                //     path.attr('d', describeArcPath(circRadiusA, self.curvePointData[0].x, self.curvePointData[0].y, self.lineData[0].x, self.lineData[0].y, solveTriangleDataA.arcFlag, solveTriangleDataA.sweepFlagWest))
                //     path2.attr('d', describeArcPath(circRadiusB, self.lineData[1].x, self.lineData[1].y, self.curvePointData[0].x, self.curvePointData[0].y, solveTriangleDataB.arcFlag, solveTriangleDataB.sweepFlagEast))
                // }

            } else if (pathDataPass[i - 1].arc.exist == true && pathDataPass[i + 1].arc.exist == false) {
                // Second Path of curve
                curvePoint = endPointsArrayPass[i]
                // let curvePointAnchor = findPerpendicularFromPoint(self.lineData, self.curvePointData[0])
                // let rightTriangleDataA = findRightTriangle(self.lineData[0], self.curvePointData[0])
                // let solveTriangleDataA = solvTriangleALL(rightTriangleDataA.sides, self.lineData[0].x, self.lineData[0].y, self.lineData[1].x, self.lineData[1].y, self.curvePointData[0].x, self.curvePointData[0].y, curvePointAnchor[0], curvePointAnchor[1])
                // let intersectingPointA = findIntersectingPoint(self.curvePointData[0].x, self.curvePointData[0].y, curvePointAnchor[0], curvePointAnchor[1], solveTriangleDataA.coords.coord_A[0], solveTriangleDataA.coords.coord_A[1], solveTriangleDataA.coords.coord_B[0], solveTriangleDataA.coords.coord_B[1])
                // let circRadiusA = getDistance(self.curvePointData[0].x, self.curvePointData[0].y, intersectingPointA.x, intersectingPointA.y)

                // if(inRange(self.curvePointData[0].x, (curvePointAnchor[0] - 0.5), (curvePointAnchor[0]) + 0.5) === true && inRange(self.curvePointData[0].y, (curvePointAnchor[1] - 0.5), (curvePointAnchor[1]) + 0.5)) {
                //     console.log('str')
                //     path.attr('d', describeStraightPath(self.lineData[0].x, self.lineData[0].y, self.curvePointData[0].x, self.curvePointData[0].y))
                //     path2.attr('d', describeStraightPath(self.curvePointData[0].x, self.curvePointData[0].y, self.lineData[1].x, self.lineData[1].y))
                //     path.style('stroke', 'red')
                //     path2.style('stroke', 'blue')
                // } else {
                //     console.log('arc')
                //     path.attr('d', describeArcPath(circRadiusA, self.curvePointData[0].x, self.curvePointData[0].y, self.lineData[0].x, self.lineData[0].y, solveTriangleDataA.arcFlag, solveTriangleDataA.sweepFlagWest))
                //     path2.attr('d', describeArcPath(circRadiusB, self.lineData[1].x, self.lineData[1].y, self.curvePointData[0].x, self.curvePointData[0].y, solveTriangleDataB.arcFlag, solveTriangleDataB.sweepFlagEast))
                // }
            }




            arcsAndLines.push(['A', pathDataPass[i].arc.radius, pathDataPass[i].arc.radius, pathDataPass[i].arc.rotation, pathDataPass[i].arc.arcFlag, pathDataPass[i].arc.sweepFlag, pathDataPass[i].coords.x, pathDataPass[i].coords.y].join(' '))
        } if (pathDataPass[i].arc.exist == false){
            arcsAndLines.push(['L', pathDataPass[i].coords.x, pathDataPass[i].coords.y].join(' '))
        }
      }


    let d = [
        M, 
        arcsAndLines.join(' ')
    ].join(' ')
    return d
}

function describeComplexPath(pathDataPass) {
        let M = ['M', pathDataPass[0].coords.x, pathDataPass[0].coords.y].join(' ')
        let arcsAndLines = []
        for (let i = 1; i < pathDataPass.length; i++) {
            if (pathDataPass[i].arc.exist == true) {
                arcsAndLines.push(['A', pathDataPass[i].arc.radius, pathDataPass[i].arc.radius, pathDataPass[i].arc.rotation, pathDataPass[i].arc.arcFlag, pathDataPass[i].arc.sweepFlag, pathDataPass[i].coords.x, pathDataPass[i].coords.y].join(' '))
            } if (pathDataPass[i].arc.exist == false){
                arcsAndLines.push(['L', pathDataPass[i].coords.x, pathDataPass[i].coords.y].join(' '))
            }
          }
        let d = [
            M, 
            arcsAndLines.join(' ')
        ].join(' ')
        return d
    }

// PATH
function dragPath(event, mainPathsArray, secondaryPathsArray, endPointsArray, pathData) {
    for (let i = 0; i < pathData.length; i++) {
        pathData[i].coords.x += event.dx,
        pathData[i].coords.y += event.dy
    }
    d3.select(mainPathsArray._groups[0][0])
        .attr({d: describeComplexPath(pathData)})
    updateSVG(mainPathsArray, secondaryPathsArray, endPointsArray, pathData)
}
// PATH

// DYNAMIC END POINTS
function dragEndPoint(event, selector, mainPathsArray, secondaryPathsArray, endPointsArray, pathData) {
    d3.select(endPointsArray[selector]._groups[0][0])
        .attr('cx', pathData[selector].coords.x += event.dx )
        .attr('cy', pathData[selector].coords.y += event.dy )   
    updateSVG(mainPathsArray, secondaryPathsArray, endPointsArray, pathData)
}
// DYNAMIC END POINTS

function updateSVG(mainPathsArray, secondaryPathsArray, endPointsArray, pathData) {
    // PATH
    let path = d3.select(mainPathsArray._groups[0][0])
        path.attr('d', describeComplexPath(pathData))
        // path.attr('d', describeNEWComplexPath(endPointsArray, pathData))
        path.style('fill', 'none')
        path.style('stroke', 'grey')
        path.style('stroke-width', 21)
    // PATH

    // SECONDARY PATH
    for (let i = 0; i < secondaryPathsArray.length; i++) {
        let secondaryPath = d3.select(secondaryPathsArray[i]._groups[0][0])
            secondaryPath.attr('d', describeComplexPath([pathData[i], pathData[i + 1]]))
            secondaryPath.style('fill', 'none')
            secondaryPath.style('stroke', 'red')
            secondaryPath.style('stroke-width', 9)
    }
    // SECONDARY PATH

    // DYNAMIC END POINTS
    for (let i = 0; i < endPointsArray.length; i++) {
        let endPoint = d3.select(endPointsArray[i]._groups[0][0])
        endPoint.attr('r', 10)
            .attr('cx', pathData[i].coords.x)
            .attr('cy', pathData[i].coords.y)
        if(i % 2 == 0) {
            endPoint.attr('fill', 'red')
        } else {
            endPoint.attr('fill', 'blue')
        }
    }
    // DYNAMIC END POINTS
}












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