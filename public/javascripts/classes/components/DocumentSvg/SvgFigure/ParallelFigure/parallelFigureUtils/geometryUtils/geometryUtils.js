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


// new chatgpt
// const translatePerpendicularLinePreservingDirection = (originLineStart, originLineFinish, prevPoint, newPoint) => {
//     // Existing line coordinates
//     const x1 = originLineStart.coords.x, y1 = originLineStart.coords.y;
//     const x2 = originLineFinish.coords.x, y2 = originLineFinish.coords.y;

//     // New point the perpendicular line should pass through
//     const px = newPoint[0], py = newPoint[1];

//     // Calculate the shift vector
//     const dx = x2 - x1; 
//     const dy = y2 - y1;

//     // Rotate the shift vector 90 degrees counterclockwise (-dy, dx)
//     const perpDx = -dy, perpDy = dx;

//     // Compute the new start and end points for the perpendicular line
//     const perpLineStart = [px - perpDx, py - perpDy];
//     const perpLineFinish = [px + perpDx, py + perpDy];

//     // Check if the second point crossed the first point
//     const crossed = hasCrossedLine(originLineStart, originLineFinish, prevPoint, newPoint);

//     return {
//         perpendicularLine: [perpLineStart, perpLineFinish],
//         hasCrossed: crossed
//     };
// };


// Function to check if the second point has crossed the first
const hasCrossedLine = (originLineStart, originLineFinish, prevPoint, newPoint) => {
    // Extract coordinates
    const x1 = originLineStart.coords.x, y1 = originLineStart.coords.y;
    const x2 = originLineFinish.coords.x, y2 = originLineFinish.coords.y;
    const xp1 = prevPoint[0], yp1 = prevPoint[1]; // Previous position
    const xp2 = newPoint[0], yp2 = newPoint[1]; // New position

    // Compute cross products
    const cross1 = (x2 - x1) * (yp1 - y1) - (y2 - y1) * (xp1 - x1);
    const cross2 = (x2 - x1) * (yp2 - y1) - (y2 - y1) * (xp2 - x1);

    console.log("Asdflsdjflksdjlfksjf")
    console.log(cross1 * cross2)
    if(cross1 * cross2 < 0) {
        console.log("NEGATIVE")
    } else {
        console.log("PSOTIVE")
    }

    // If sign changes, the point has crossed the line
    return cross1 * cross2 < 0;
};



export {
    translateLinePreservingDirection,
    translatePerpendicularLinePreservingDirection,
    pointCrossedAxis,
    pointCrossedAxis_02
}