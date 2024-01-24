import {getDistance} from '../../../math/mathFunctions.js'

function makeDeepCopy(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj; // If it's not an object, return as-is
    }

    if (Array.isArray(obj)) {
        // If it's an array, create a new array and recursively copy its elements
        const newArray = []
        for (let i = 0; i < obj.length; i++) {
            newArray[i] = makeDeepCopy(obj[i])
        }
        return newArray
    }

    // If it's an object, create a new object and recursively copy its properties
    const newObj = {}
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = makeDeepCopy(obj[key])
        }
    }
    return newObj
}

// Define a function to transform data from one array to a new one
function transformData(oldArrayWithOriginalData) {
    // Initialize a new array to store the transformed data
    let newArrayWithTransformedData
    // Map through the oldArrayWithOriginalData and transform each element
    newArrayWithTransformedData = oldArrayWithOriginalData.map(([point1, point2]) => (
        [
            // Create an object for the first and second points with x and y coordinates
            { x: point1.coords.x, y: point1.coords.y },
            { x: point2.coords.x, y: point2.coords.y }
        ]
    ))
    return newArrayWithTransformedData
}

function findPerpendicularFromPoint(curvePoint, firstPoint, secondPoint){
    let lineData0 = firstPoint
    let lineData1 = secondPoint
    let curvePoint0 = curvePoint

    let path1 = {pointA:{x:lineData0.coords.x, y:lineData0.coords.y},pointB:{x:lineData1.coords.x, y:lineData1.coords.y}}
    let path2 = {pointA:{x:0, y:0},pointB:{x:0, y:0}}
    path2.pointA.x = curvePoint0.coords.x
    path2.pointA.y = curvePoint0.coords.y

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

function directionOfARelatedToPathBetweenBandC(a, b, c, perpendicularPoint) {
    // TODO: change to swtitch statement.
    // FIXME: if point1 to parallel (horizontal) to point2, negative still does in positive direction
    // FIXME: if thats true then: if point1 to parallel (vertical) to point2, negative still does in positive direction (unchecked though)
    let thisDirection
    if(b[0] < c[0]) {
        if(perpendicularPoint[0] < a[0]) {
            thisDirection = 'positive'
        } else {
            thisDirection = 'negative'
        }
        if(b[1] > c[1]) {
            if(perpendicularPoint[0] > a[0]) {
                thisDirection = 'positive'
            } else {
                thisDirection = 'negative'
            }
        }
    } else {
        if(perpendicularPoint[0] < a[0]) {
            thisDirection = 'positive'
        } else {
            thisDirection = 'negative'
        }
        if(b[1] > c[1]) {
            if(perpendicularPoint[0] > a[0]) {
                thisDirection = 'positive'
            } else {
                thisDirection = 'negative'
            }
        }
    }
    return thisDirection
}

function findParallelDistance(thisOriginalFigurePathDataFromGlobal, thisSecondaryPathIndex, event) {
    let parallelDistance
    // Retrieve the array from the global variable
    let thisSelectedOriginalFigurePathData = thisOriginalFigurePathDataFromGlobal[thisSecondaryPathIndex];
    let nextSelectedOriginalFigurePathData = thisOriginalFigurePathDataFromGlobal[thisSecondaryPathIndex + 1];
    // Get the mouse pointer coordinates relative to the current event
    let m1P = d3.pointer(event)

    if (nextSelectedOriginalFigurePathData.arc.exist) {
        // Calculate parallel distance from an arc
        parallelDistance = calculateParallelDistanceFromArc(nextSelectedOriginalFigurePathData, m1P);
        return parallelDistance
    } else if (!nextSelectedOriginalFigurePathData.arc.exist) {
        // Calculate parallel distance from a line segment
        parallelDistance = calculateParallelDistanceFromPath(thisSelectedOriginalFigurePathData, nextSelectedOriginalFigurePathData, m1P);
        return parallelDistance
    }

    // Function to calculate parallel distance from an arc
    function calculateParallelDistanceFromArc(nextSelectedPathData, m1P) {
        let arc = nextSelectedPathData.arc;
        if (arc.exist) {
            // Calculate the distance from the arc's center to the cursor point
            let arcToCenterDistance = getDistance(nextSelectedPathData.coords.x, nextSelectedPathData.coords.y, arc.center.x, arc.center.y);
            let cursorToCenterDistance = getDistance(arc.center.x, arc.center.y, m1P[0], m1P[1]);
            let direction = arc.sweepFlag;
            // Calculate parallel distance based on the direction of the arc
            let parallelDistance = arcToCenterDistance - cursorToCenterDistance;
            if (direction === 1) {
                parallelDistance *= -1;
            }
            return parallelDistance;
        }
        // Return null if no arc exists
        return null;
    }

    // Function to calculate parallel distance from a line segment
    function calculateParallelDistanceFromPath(thisPathData, nextPathData, m1P) {
        // Place the m1P variable into a form that fits the function
        let m1PInForm = {coords: {x: m1P[0], y: m1P[1]}}
        // Find the perpendicular point on the line from the cursor point
        let perpendicularPoint = findPerpendicularFromPoint(m1PInForm, thisPathData, nextPathData);
        // Determine the direction of the line segment
        let direction = directionOfARelatedToPathBetweenBandC(m1P, [thisPathData.coords.x, thisPathData.coords.y], [nextPathData.coords.x, nextPathData.coords.y], perpendicularPoint);
        // Calculate parallel distance
        let parallelDistance = getDistance(perpendicularPoint[0], perpendicularPoint[1], m1P[0], m1P[1]);
        if (direction === 'negative') {
            parallelDistance *= -1;
        }
        return parallelDistance;
    }
}



function findIntersectingPointSIMPLER(x1, y1, x2, y2, x3, y3, x4, y4) {
    var ua, ub, denom = (y4 - y3)*(x2 - x1) - (x4 - x3)*(y2 - y1)
    // if (denom == 0) {
    //     return null
    // }


    ua = ((x4 - x3)*(y1 - y3) - (y4 - y3)*(x1 - x3))/denom
    ub = ((x2 - x1)*(y1 - y3) - (y2 - y1)*(x1 - x3))/denom


    let result = {
        x: x1 + ua * (x2 - x1),
        y: y1 + ua * (y2 - y1),
    }
    return result
}

findPathDataIntersectingPoint([refEndPointsPerp[index-1], false], [refEndPointsPerp[index], false])

function findPathDataIntersectingPoint(coord1, coord2) {
    const getCoords = (coords, addCoords, isX) => addCoords ? isX ? coords.coords.x : coords.coords.y : isX ? coords.x : coords.y


    let path1Coord1_X = getCoords(coord1[0][0], coord1[1], true)
    let path1Coord1_Y = getCoords(coord1[0][0], coord1[1], false)
    let path1Coord2_X = getCoords(coord1[0][1], coord1[1], true)
    let path1Coord2_Y = getCoords(coord1[0][1], coord1[1], false)

    let path2Coord1_X = getCoords(coord2[0][0], coord2[1], true)
    let path2Coord1_Y = getCoords(coord2[0][0], coord2[1], false)
    let path2Coord2_X = getCoords(coord2[0][1], coord2[1], true)
    let path2Coord2_Y = getCoords(coord2[0][1], coord2[1], false)


    // let path1Coord1_X = coord1[0].x
    // let path1Coord1_Y = coord1[0].y
    // let path1Coord2_X = coord1[1].x
    // let path1Coord2_Y = coord1[1].y

    // let path2Coord1_X = coord2[0].x
    // let path2Coord1_Y = coord2[0].y
    // let path2Coord2_X = coord2[1].x
    // let path2Coord2_Y = coord2[1].y




    var ua, ub, denom = (path2Coord2_Y - path2Coord1_Y)*(path1Coord2_X - path1Coord1_X) - (path2Coord2_X - path2Coord1_X)*(path1Coord2_Y - path1Coord1_Y)
    // if (denom == 0) {
    //     return null
    // }

    ua = ((path2Coord2_X - path2Coord1_X)*(path1Coord1_Y - path2Coord1_Y) - (path2Coord2_Y - path2Coord1_Y)*(path1Coord1_X - path2Coord1_X))/denom
    ub = ((path1Coord2_X - path1Coord1_X)*(path1Coord1_Y - path2Coord1_Y) - (path1Coord2_Y - path1Coord1_Y)*(path1Coord1_X - path2Coord1_X))/denom

    let result = {
        x: path1Coord1_X + ua * (path1Coord2_X - path1Coord1_X),
        y: path1Coord1_Y + ua * (path1Coord2_Y - path1Coord1_Y),
    }
    return result
}


function getPathToArcIntersections(linePt1, linePt2, circ, originalPathData) {
    let lineStart = {x: linePt1.coords.x, y: linePt1.coords.y}
    let lineEnd = {x: linePt2.coords.x, y: linePt2.coords.y}
    let circleCenter = {x: circ.arc.center.x, y: circ.arc.center.y}
    let circleRadius = circ.arc.radius
    let originalPathDataCoords = originalPathData.coords

    // Calculate the direction vector of the line
    const dx = lineEnd.x - lineStart.x;
    const dy = lineEnd.y - lineStart.y;

    // Calculate coefficients for the quadratic equation
    const A = dx * dx + dy * dy;
    const B = 2 * (dx * (lineStart.x - circleCenter.x) + dy * (lineStart.y - circleCenter.y));
    const C = (lineStart.x - circleCenter.x) * (lineStart.x - circleCenter.x) + (lineStart.y - circleCenter.y) * (lineStart.y - circleCenter.y) - circleRadius * circleRadius;

    // Calculate the discriminant of the quadratic equation
    const discriminant = B * B - 4 * A * C;



    // Check if the line intersects the circle
    if (discriminant < 0) {
        // Line is tangent to the circle
        const t = -B / (2 * A);
        const intersectionX = lineStart.x + t * dx;
        const intersectionY = lineStart.y + t * dy;
        return [{ x: intersectionX, y: intersectionY, doesIntersect: false }];

    } else if (discriminant === 0) {
        // Line is tangent to the circle
        const t = -B / (2 * A);
        const intersectionX = lineStart.x + t * dx;
        const intersectionY = lineStart.y + t * dy;
        return [{ x: intersectionX, y: intersectionY, doesIntersect: true }];
    } else {
        // Line intersects the circle at two points
        const t1 = (-B + Math.sqrt(discriminant)) / (2 * A);
        const t2 = (-B - Math.sqrt(discriminant)) / (2 * A);
        const intersection1X = lineStart.x + t1 * dx;
        const intersection1Y = lineStart.y + t1 * dy;
        const intersection2X = lineStart.x + t2 * dx;
        const intersection2Y = lineStart.y + t2 * dy;

        // old
        // return [
        //     { x: intersection1X, y: intersection1Y, doesIntersect: true },
        //     { x: intersection2X, y: intersection2Y, doesIntersect: true }
        // ]

        // new
        // Determine the distance of each intersection point to OPD
        let length0 = getDistance(originalPathDataCoords.x, originalPathDataCoords.y, intersection1X, intersection1Y)
        let length1 = getDistance(originalPathDataCoords.x, originalPathDataCoords.y, intersection2X, intersection2Y)

        // Choose the closest int point to OPD
        if(length0 < length1) {
            return [
                { x: intersection1X, y: intersection1Y, doesIntersect: true },
                { x: intersection2X, y: intersection2Y, doesIntersect: true }
            ]
        } else {
            return [
                { x: intersection2X, y: intersection2Y, doesIntersect: true },
                { x: intersection1X, y: intersection1Y, doesIntersect: true }
            ]
        }
    }
}

function findPointAlongSlopeAtDistance(startingPoint, endPoint, distanceAwayArcArc1){
    let newPoint = [0,0]
    let startPtX = startingPoint[0]
    let startPtY = startingPoint[1]
    let endPtX = endPoint[0]
    let endPtY = endPoint[1]
    let totalDistance = getDistance(startPtX,startPtY,endPtX,endPtY)
    let distanceRatioUsingArc1DistanceFromCenter = distanceAwayArcArc1 / totalDistance

    newPoint[0] = (((1 - distanceRatioUsingArc1DistanceFromCenter) * startPtX) + (distanceRatioUsingArc1DistanceFromCenter * endPtX))
    newPoint[1] = (((1 - distanceRatioUsingArc1DistanceFromCenter) * startPtY) + (distanceRatioUsingArc1DistanceFromCenter * endPtY))
    
    return newPoint
}

function getArcToArcIntersections(firstParallelPathData, secondParallelPathData, originalPathData) {
    let x1 = firstParallelPathData.arc.center.x
    let y1 = firstParallelPathData.arc.center.y
    let r1 = firstParallelPathData.arc.radius
    let x2 = secondParallelPathData.arc.center.x
    let y2 = secondParallelPathData.arc.center.y
    let r2 = secondParallelPathData.arc.radius
    let opd = originalPathData.coords
    
    // Calculate the distance between the centers of the circles
    const dx = x2 - x1
    const dy = y2 - y1
    const distance = Math.sqrt(dx * dx + dy * dy)

    // Circles are identical; return one of the two circles
    // Maybe need? (not finished need to return correct data)
    // if (distance === 0 && r1 === r2) {
    //     // return [center1]
    // }

    // Determine which intersection point is closest to Xys
    let intersectionClosestToXys

    // Check for no intersection, one circle contained within the other, or identical circles
    if (distance < Math.abs(r1 - r2)) {
        // Circles don't intersect; return the closest points on each circle
        let closestPointToOtherCircleX1
        let closestPointToOtherCircleY1
        let closestPointToOtherCircleX2
        let closestPointToOtherCircleY2

        let closestPointToOtherCircleX1_AAA = x1 + (dx * r1) / (distance * -1)
        let closestPointToOtherCircleY1_AAA = y1 + (dy * r1) / (distance * -1)

        let closestPointToOtherCircleX2_AAA = x2 - (dx * r2) / distance
        let closestPointToOtherCircleY2_AAA = y2 - (dy * r2) / distance

        let closestPointToOtherCircleX1_BBB = x1 + (dx * r1) / distance
        let closestPointToOtherCircleY1_BBB = y1 + (dy * r1) / distance

        let closestPointToOtherCircleX2_BBB = x2 - (dx * r2) / (distance * -1)
        let closestPointToOtherCircleY2_BBB = y2 - (dy * r2) / (distance * -1)

        let distance1 = getDistance(closestPointToOtherCircleX1_AAA, closestPointToOtherCircleY1_AAA, closestPointToOtherCircleX2_AAA, closestPointToOtherCircleY2_AAA)
        let distance2 = getDistance(closestPointToOtherCircleX1_BBB, closestPointToOtherCircleY1_BBB, closestPointToOtherCircleX2_BBB, closestPointToOtherCircleY2_BBB)

        if (distance1 < distance2) {
            closestPointToOtherCircleX1 = closestPointToOtherCircleX1_AAA
            closestPointToOtherCircleY1 = closestPointToOtherCircleY1_AAA
            closestPointToOtherCircleX2 = closestPointToOtherCircleX2_AAA
            closestPointToOtherCircleY2 = closestPointToOtherCircleY2_AAA
        } else {
            closestPointToOtherCircleX1 = closestPointToOtherCircleX1_BBB
            closestPointToOtherCircleY1 = closestPointToOtherCircleY1_BBB
            closestPointToOtherCircleX2 = closestPointToOtherCircleX2_BBB
            closestPointToOtherCircleY2 = closestPointToOtherCircleY2_BBB
        }

        intersectionClosestToXys = [
            { x: closestPointToOtherCircleX1, y: closestPointToOtherCircleY1, doesIntersect: false },
            { x: closestPointToOtherCircleX2, y: closestPointToOtherCircleY2, doesIntersect: false }
        ]
        return intersectionClosestToXys
    }

    // Check for no intersection, one circle contained within the other, or identical circles
    // if (distance > r1 + r2 || distance < Math.abs(r1 - r2)) {
    if (distance > r1 + r2) {
        // Circles don't intersect; return the closest points on each circle
        let closestPointToOtherCircleX1 = x1 + (dx * r1) / distance
        let closestPointToOtherCircleY1 = y1 + (dy * r1) / distance
        let closestPointToOtherCircleX2 = x2 - (dx * r2) / distance
        let closestPointToOtherCircleY2 = y2 - (dy * r2) / distance

        intersectionClosestToXys = [
            // getting visual errors when shape has curves going in same direction
            { x: closestPointToOtherCircleX1, y: closestPointToOtherCircleY1, doesIntersect: false },
            { x: closestPointToOtherCircleX2, y: closestPointToOtherCircleY2, doesIntersect: false }
        ]
        return intersectionClosestToXys
    }

    // Calculate the intersection points
    const angle = Math.atan2(dy, dx);
    const intersectionAngle = Math.acos((r1 * r1 + distance * distance - r2 * r2) / (2 * r1 * distance))
    const intersectionX1 = x1 + r1 * Math.cos(angle - intersectionAngle)
    const intersectionY1 = y1 + r1 * Math.sin(angle - intersectionAngle)
    const intersectionX2 = x1 + r1 * Math.cos(angle + intersectionAngle)
    const intersectionY2 = y1 + r1 * Math.sin(angle + intersectionAngle)

    // Determine the distance of each intersection point to Xys
    let distance1 = getDistance(opd.x, opd.y, intersectionX1, intersectionY1)
    let distance2 = getDistance(opd.x, opd.y, intersectionX2, intersectionY2)

    if(!isNaN(intersectionX1)) {    // ***This doesn't work whent circles overlap***
        if(distance1 < distance2) {
            intersectionClosestToXys = [
                { x: intersectionX1, y: intersectionY1, doesIntersect: true },
                { x: intersectionX2, y: intersectionY2, doesIntersect: true },
            ]
        } else if(distance2 < distance1) {
            intersectionClosestToXys = [
                { x: intersectionX2, y: intersectionY2, doesIntersect: true },
                { x: intersectionX1, y: intersectionY1, doesIntersect: true }
            ]
        }
    } else {
        intersectionClosestToXys = NaN
    }
    return intersectionClosestToXys
}

export{
    makeDeepCopy,
    transformData,
    findParallelDistance,
    findIntersectingPointSIMPLER,
    getPathToArcIntersections,
    findPointAlongSlopeAtDistance,
    getArcToArcIntersections,
}