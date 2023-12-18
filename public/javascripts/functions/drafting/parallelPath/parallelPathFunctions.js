import {getDistance} from '../../math/mathFunctions.js'

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

// ChatGPT refactored above code. Dobule check if correct and to understand.
function directionOfARelatedToPathBetweenBandC(a, b, c, perpendicularPoint) {
    let thisDirection

    // Check the x-axis direction
    if (perpendicularPoint[0] < a[0]) {
        thisDirection = 'positive' // X-axis direction is positive
    } else {
        thisDirection = 'negative' // X-axis direction is negative
    }

    // Check the y-axis direction only if b[0] < c[0]
    if (b[0] < c[0]) {
        if (b[1] > c[1]) {
            // Override the direction if necessary based on y-axis
            if (perpendicularPoint[0] > a[0]) {
                thisDirection = 'positive' // Y-axis direction is positive
            } else {
                thisDirection = 'negative' // Y-axis direction is negative
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

export{
    makeDeepCopy,
    transformData,
    findParallelDistance
}