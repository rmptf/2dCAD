import {getDistance, findArcLength} from '../math/mathFunctions.js'

function measurePathFunction(event, originalFigure_counter_groupCount_GLOBAL, isDown2, self, pathCount, figureCount) {
    let numberOfSegments = a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[figureCount].length - 1
    let arrayOfLengths = []
    // loop through total number of originalFigure_data_pathDatas_array_GLOBAL - 1
    for (let i = 0; i < numberOfSegments; i++) {
        let point1 = a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[figureCount][i]
        let point2 = a_canvas_globalVars.originalFigure_data_pathDatas_array_GLOBAL[figureCount][i + 1]
        // check points, starting with second point, if it is an path or an arc
        if (point2.arc.exist === false) {
            // if its a path, find distance between two points, add length to array
            let segmentLength = getDistance(point1.coords.x, point1.coords.y, point2.coords.x, point2.coords.y)
            arrayOfLengths.push(segmentLength)
            console.log('Path: ' + segmentLength)
        } else {
            // if its an arc, find length of arc, add length to array
            let segmentLength = findArcLength(point2.arc.radius, point2.arc.startAngle, point2.arc.arcFlag)
            arrayOfLengths.push(segmentLength)
            console.log('Arc: ' + segmentLength)
        }
    }
    // add sum of numbers in array - arrayOfLengths
    let totalLength = arrayOfLengths.reduce((partialSum, a) => partialSum + a, 0)
    console.log(totalLength + 'px', (Math.round(((totalLength/96) + Number.EPSILON) * 100) / 100) + '"')
}

export {
    measurePathFunction
}