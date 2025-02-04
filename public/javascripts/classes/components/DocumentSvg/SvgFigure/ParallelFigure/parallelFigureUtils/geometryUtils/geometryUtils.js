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
    const perpLineStart = [(px - perpDx), (py - perpDy)]
    const perpLineFinish = [(px + perpDx), (py + perpDy)]

    return [perpLineStart, perpLineFinish]
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
        // console.log("NO_CROSSED_AXIS")
        return true
    } else if (crossProduct < 0) {
        checkForFigureAndRunAFunction(1, 4)
        // console.log("CROSSED_AXIS")
        return false
    } else {
        // return "ON_AXIS"
    }
}




export {
    translateLinePreservingDirection,
    translatePerpendicularLinePreservingDirection,
    pointCrossedAxis
}