const translateLinePreservingDirection = (originLineStart, originLineFinish, newVectorCenter) => {
    // Existing line coordinates
    const x1 = originLineStart.coords.x
    const y1 = originLineStart.coords.y
    const x2 = originLineFinish.coords.x
    const y2 = originLineFinish.coords.y

    // New point the parallel line should pass through
    const px = newVectorCenter[0], py = newVectorCenter[1]

    // Calculate the shift vector
    const dx = x2 - x1 // Difference in x
    const dy = y2 - y1 // Difference in y

    // New line's points by translating the original points, Compute the new start and end points, keeping the line centered
    const arcCenterAxisStart = [(px - dx), (py - dy)]
    const arcCenterAxisFinish = [(px + dx), (py + dy)]

    return [arcCenterAxisStart, arcCenterAxisFinish]
}

const translatePerpendicularLinePreservingDirection = (originLineStart, originLineFinish, newVectorCenter) => {
    console.log("oksfoksdofks")
    // Existing line coordinates
    const x1 = originLineStart.coords.x
    const y1 = originLineStart.coords.y
    const x2 = originLineFinish.coords.x
    const y2 = originLineFinish.coords.y

    // New point the perpendicular line should pass through
    const px = newVectorCenter[0], py = newVectorCenter[1]

    // Calculate the shift vector
    const dx = x2 - x1 // Difference in x
    const dy = y2 - y1 // Difference in y

    // Rotate the shift vector 90 degrees counterclockwise (-dy, dx) or clockwise (dy, -dx)
    const perpDx = -dy // Counterclockwise rotation
    const perpDy = dx

    // Compute the new start and end points for the perpendicular line
    const perpLineStart_negativeSide = [(px - 0), (py - 0)]
    const perpLineFinish_negetiveSie = [(px + perpDx), (py + perpDy)]

    const perpLineStart_positiveSide = [(px - perpDx), (py - perpDy)]
    const perpLineFinish_positiveSide = [(px + 0), (py + 0)]

    return [[perpLineStart_negativeSide, perpLineFinish_negetiveSie], [perpLineStart_positiveSide, perpLineFinish_positiveSide]]
}

const pointCrossedAxis = (axisStartCoords, axisFinishCoords, pointCoords, referenceFigures) => {
    // Vector from start to end of the path
    const pathVectorX = axisFinishCoords[0] - axisStartCoords[0]
    const pathVectorY = axisFinishCoords[1] - axisStartCoords[1]
  
    // Vector from start of path to the point
    const pointVectorX = pointCoords[0] - axisStartCoords[0]
    const pointVectorY = pointCoords[1] - axisStartCoords[1]

    // Compute the cross product
    const crossProduct = pathVectorX * pointVectorY - pathVectorY * pointVectorX

    // Check if there is a referenceFigure and run it's function
    let checkForFigureAndRunAFunction = (pos1, pos2) => referenceFigures.length > 0 ? referenceFigures[0].changeCircleColor(pos1, pos2) : null

     // Return the side based on the cross product
    if (crossProduct > 0) {
        checkForFigureAndRunAFunction(4, 1)
        console.log("NO_CROSSED_AXIS")
        return true
    } else if (crossProduct < 0) {
        checkForFigureAndRunAFunction(1, 4)
        console.log("CROSSED_AXIS")
        return false
    } else {
        // return "ON_AXIS"
    }
}

const pointCrossedAxis_02 = (axisStartCoords, axisFinishCoords, pointCoords, referenceFigures) => {
    console.log("asfsdfdsfsd")
    // Vector from start to end of the path
    const pathVectorX = axisFinishCoords[0] - axisStartCoords[0]
    const pathVectorY = axisFinishCoords[1] - axisStartCoords[1]
  
    // Vector from start of path to the point
    const pointVectorX = pointCoords[0] - axisStartCoords[0]
    const pointVectorY = pointCoords[1] - axisStartCoords[1]

    // Compute the cross product
    const crossProduct = pathVectorX * pointVectorY - pathVectorY * pointVectorX


    console.log(pathVectorX)
    console.log(pointVectorY)
    console.log(pathVectorY)
    console.log(pointVectorX)
    console.log(crossProduct)

    // Check if there is a referenceFigure and run it's function
    let checkForFigureAndRunAFunction = (pos1, pos2) => referenceFigures.length > 0 ? referenceFigures[0].changeCircleColor(pos1, pos2) : null

     // Return the side based on the cross product
    if (crossProduct > 0) {
        checkForFigureAndRunAFunction(4, 1)
        console.log("NO_CROSSED_AXISASS")
        return true
    } else if (crossProduct < 0) {
        checkForFigureAndRunAFunction(1, 4)
        console.log("CROSSED_AXISASS")
        return false
    } else {
        // return "ON_AXIS"
    }
}


// FIXME: here
const translatePerpendicularLinePreservingDirection000 = (originLineStart, originLineFinish, newPoint, originLineStart_startPos, originLineEnd_startPos, figures) => {
    // Existing line coordinates
    const x1 = originLineStart.coords.x, y1 = originLineStart.coords.y;
    const x2 = originLineFinish.coords.x, y2 = originLineFinish.coords.y;

    // New point the perpendicular line should pass through
    const px = newPoint[0], py = newPoint[1];

    // Calculate the shift vector
    const dx = x2 - x1; 
    const dy = y2 - y1;

    // Rotate the shift vector 90 degrees counterclockwise (-dy, dx)
    const perpDx = -dy, perpDy = dx;

    // Compute the new start and end points for the perpendicular line
    const perpLineStart = [px - perpDx, py - perpDy];
    const perpLineFinish = [px + perpDx, py + perpDy];

    // Check if the second point crossed the first point
    const crossed = hasCrossedMovingLine(originLineStart_startPos, originLineEnd_startPos, [x1, y1], [x2, y2], originLineStart_startPos, newPoint, figures)

    console.log("POOPER")
    console.log(crossed)


    return {
        perpendicularLine: [perpLineStart, perpLineFinish],
        hasCrossed: crossed
    };
};

// FIXME: here
const hasCrossedMovingLine = (startingStart, startingEnd, currentStart, currentEnd, trackedPointStart, newPoint, figures) => {
    // Compute cross product at previous frame
    const cross1 = (startingEnd[0] - startingStart[0]) * (trackedPointStart[1] - startingStart[1]) - 
                   (startingEnd[1] - startingStart[1]) * (trackedPointStart[0] - startingStart[0]);

    // Compute cross product at current frame
    const cross2 = (currentEnd[0] - currentStart[0]) * (newPoint[1] - currentStart[1]) - 
                   (currentEnd[1] - currentStart[1]) * (newPoint[0] - currentStart[0]);

    figures[0].runFunctions([startingStart, currentStart, [startingStart, currentStart]])
    figures[1].runFunctions([startingEnd, currentEnd, [startingEnd, currentEnd]])

    // Detect crossing: If signs flipped, a crossing occurred
    return cross1 * cross2 < 0;
};





const areTwoLinesIntersecting = (line1Start, line1End, line2Start, line2End, figures) => {
    figures[0].runFunctions([line1Start])
    figures[1].runFunctions([line1End])
    figures[2].runFunctions([line1Start, line1End])

    figures[3].runFunctions([line2Start])
    figures[4].runFunctions([line2End])
    figures[5].runFunctions([line2Start, line2End])

    let checkForFigureAndRunAFunction = (pos1, pos2, figure) => figures.length > 0 ? figures[figure].changeCircleColor(pos1, pos2) : null
    
    function crossProduct(a, b) {
        return a[0] * b[1] - a[1] * b[0];
    }

    function subtractPoints(a, b) {
        return [a[0] - b[0], a[1] - b[1]];
    }

    function isPointOnSegment(p, a, b) {
        return Math.min(a[0], b[0]) <= p[0] && p[0] <= Math.max(a[0], b[0]) &&
               Math.min(a[1], b[1]) <= p[1] && p[1] <= Math.max(a[1], b[1]);
    }

    let d1 = crossProduct(subtractPoints(line2Start, line1Start), subtractPoints(line1End, line1Start));
    let d2 = crossProduct(subtractPoints(line2End, line1Start), subtractPoints(line1End, line1Start));
    let d3 = crossProduct(subtractPoints(line1Start, line2Start), subtractPoints(line2End, line2Start));
    let d4 = crossProduct(subtractPoints(line1End, line2Start), subtractPoints(line2End, line2Start));

    if ((d1 * d2 < 0) && (d3 * d4 < 0)) {
        checkForFigureAndRunAFunction(2, 1, 0)
        checkForFigureAndRunAFunction(2, 1, 1)
        checkForFigureAndRunAFunction(4, 3, 3)
        checkForFigureAndRunAFunction(4, 3, 4)
        return true;
    }

    // Check for collinear overlap (special case)
    if (d1 === 0 && isPointOnSegment(line2Start, line1Start, line1End)) {
        checkForFigureAndRunAFunction(2, 1, 0)
        checkForFigureAndRunAFunction(2, 1, 1)
        checkForFigureAndRunAFunction(4, 3, 3)
        checkForFigureAndRunAFunction(4, 3, 4)
        return true;
    }
    if (d2 === 0 && isPointOnSegment(line2End, line1Start, line1End)) {
        checkForFigureAndRunAFunction(2, 1, 0)
        checkForFigureAndRunAFunction(2, 1, 1)
        checkForFigureAndRunAFunction(4, 3, 3)
        checkForFigureAndRunAFunction(4, 3, 4)
        return true;
    }
    if (d3 === 0 && isPointOnSegment(line1Start, line2Start, line2End)) {
        checkForFigureAndRunAFunction(2, 1, 0)
        checkForFigureAndRunAFunction(2, 1, 1)
        checkForFigureAndRunAFunction(4, 3, 3)
        checkForFigureAndRunAFunction(4, 3, 4)
        return true;
    }
    if (d4 === 0 && isPointOnSegment(line1End, line2Start, line2End)) {
        checkForFigureAndRunAFunction(2, 1, 0)
        checkForFigureAndRunAFunction(2, 1, 1)
        checkForFigureAndRunAFunction(4, 3, 3)
        checkForFigureAndRunAFunction(4, 3, 4)
        return true;
    }

    checkForFigureAndRunAFunction(1, 2, 0)
    checkForFigureAndRunAFunction(1, 2, 1)
    checkForFigureAndRunAFunction(3, 4, 3)
    checkForFigureAndRunAFunction(3, 4, 4)
    return false;
}

const removePathAndPoints_TEST_WILLHANDLERDIFFERENTLY_LATER = (parallelFigure, thisIndexModded) => {
    let PARFIGURE = parallelFigure //FIXME: still used
    let originalFigurePathDatas = parallelFigure.originalFigurePathDatas
    let originalFigurePathDatas_plusFillers = parallelFigure.originalFigurePathDatas_plusFillers
    let parallelFigurePathDatas = parallelFigure.parallelFigurePathDatas
    let parallelPathDatas_perpendicular = parallelFigure.parallelFigurePathDatas_perpendicularProjections
    let parFigureObject = parallelFigure.parallelFigureObject

    //Remove 

    // //This is how corner elements are removed (could be useful to remove main path and points)
    // console.log("Remove_Points_and_Paths")
    // let parEndPointClassArray = PARFIGURE.svgEndPoints
    // let parPathClassArray = PARFIGURE.svgPaths.parallelPaths

    // //FIXME: change to remove parallelPathDats
    // let elements = originalFigurePathDatas[thisIndexModded].children.parallel_pathDatas.pathData_west.removeChildCornerElements()

    // // Find the classes that hold the Elements
    // const path_class_01 = parPathClassArray.find(obj => obj.svgElementObject._groups[0][0] === elements[0])
    // const endPoint_class_01 = parEndPointClassArray.find(obj => obj.svgElementObject._groups[0][0] === elements[1])

    // // Find the index of te class in its array
    // const indexOfEpInEpClassArray_01 = parEndPointClassArray.indexOf(endPoint_class_01)
    // const indexOfPathInPathClassArray_01 = parPathClassArray.indexOf(path_class_01)

    // // Update the OLD arrays for svg animation TODO: WILL REMOVE LATER
    // parallelFigurePathDatas.splice(indexOfPathInPathClassArray_01, 1)
    // originalFigurePathDatas_plusFillers.splice(indexOfPathInPathClassArray_01 + 1, 1)
    // parallelPathDatas_perpendicular.splice(indexOfPathInPathClassArray_01, 1)

    // // Remove the SVG Classes from thier arrays
    // parEndPointClassArray.splice(indexOfEpInEpClassArray_01, 2)
    // parPathClassArray.splice(indexOfPathInPathClassArray_01, 1)
}


export {
    translateLinePreservingDirection,
    translatePerpendicularLinePreservingDirection,
    translatePerpendicularLinePreservingDirection000,
    pointCrossedAxis,
    pointCrossedAxis_02,
    areTwoLinesIntersecting,
    removePathAndPoints_TEST_WILLHANDLERDIFFERENTLY_LATER
}