function doLinesIntersect(line1Start, line1End, line2Start, line2End) {
    // Calculate the slopes of the two lines
    const slope1 = (line1End.y - line1Start.y) / (line1End.x - line1Start.x);
    const slope2 = (line2End.y - line2Start.y) / (line2End.x - line2Start.x);

    // Calculate the y-intercepts of the two lines
    const yIntercept1 = line1Start.y - slope1 * line1Start.x;
    const yIntercept2 = line2Start.y - slope2 * line2Start.x;

    // // Check if the lines are parallel (slopes are equal)
    // if (slope1 === slope2) {
    //     // If the lines are parallel, check if they are coincident (overlapping)
    //     if (yIntercept1 === yIntercept2) {
    //         return "Coincident"; // Lines overlap
    //     } else {
    //         return "Parallel"; // Lines are parallel but not coincident
    //     }
    // }

    // Calculate the x-coordinate of the intersection point
    const intersectionX = (yIntercept2 - yIntercept1) / (slope1 - slope2);

    // Check if the intersection point is within the line segments
    if (intersectionX >= Math.min(line1Start.x, line1End.x) && intersectionX <= Math.max(line1Start.x, line1End.x) && intersectionX >= Math.min(line2Start.x, line2End.x) && intersectionX <= Math.max(line2Start.x, line2End.x)) {
        // return [intersectionX, slope1 * intersectionX + yIntercept1];
        return {doesIntersect: true, coords: {x: intersectionX, y: slope1 * intersectionX + yIntercept1}}
    } else {
        return {doesIntersect: false}
    }
}

export {
    doLinesIntersect
}