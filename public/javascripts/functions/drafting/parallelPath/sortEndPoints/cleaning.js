let prevEndPoint = allEndPoints[index - 1][1]
let thisEndPoint = allEndPoints[index][1]
let nextEndPoint = allEndPoints[index + 1][1]
// JOINERS
// PATH - ARC
if(thisEndPoint.arc.joiner === true && thisEndPoint.arc.joinerSide === "AAA") {}
else if(prevEndPoint.arc.joiner === true && prevEndPoint.arc.joinerSide === "AAA") {
    if(nextEndPoint.arc.exist === true){
    } else {
    }
}
// PATH - ARC

// ARC - ARC
else if(thisEndPoint.arc.joiner === true && thisEndPoint.arc.joinerSide === "CCC") {}
else if(prevEndPoint.arc.joiner === true && prevEndPoint.arc.joinerSide === "CCC") {}
// ARC - ARC

// ARC - PATH
else if(thisEndPoint.arc.joiner === true && thisEndPoint.arc.joinerSide === "BBB") {
}
else if(skipperCheckers.skipperChecker_Arc === true){}
// ARC - PATH
// JOINERS

// NO JOINER
else {
    if(parallelPathObject.parallelPathSegmentCounter_FIRST === 0) {
        if(index !== 0) {
            if(prevEndPoint.arc.exist === true){
            } else {
            }
        } else {}
        if(nextEndPoint.arc.exist === true) {
        } else {
        }
    }

    if(parallelPathObject.parallelPathSegmentCounter_FIRST === 1) {
        if(index !== allEndPoints.length - 1) {
            if(nextEndPoint.arc.exist === true){
                if(nextEndPoint.arc.joinerSide != "AAA" && nextEndPoint.arc.joinerSide != "BBB" && nextEndPoint.arc.joinerSide != "CCC") {
                    if (parallelPathObject.collectIndicesOfIntersections === true) {}
                }
            } else {
                if(referenceEndPointsBaseAndFillers[index + 2] === "filler"){}
                if(parallelPathObject.collectIndicesOfIntersections === true) {}
                if(nextEndPoint.arc.joiner) {}
            }
        } else {}
    }
}

// basic layout

// thisEndPoint is a AAA - joiner (P - A)
// prevEndPoint is a AAA - joiner (P - A)
    // nextEndPoint is arc
    // nextEndPoint is path

// thisEndPoint is a CCC - joiner (A - A)
// prevEndPoint is a CCC - joiner (A - A)

// thisEndPoint is a BBB - joiner (A - P)

// skipperChecker is true (does this mean thisEndPoint is a joiner? Can't because we take care of that from above.)

// first segment
    // if not first path
        // prevEndPoint is arc
        // prevEndPoint is path
    // else is first path

    // if nextEndPoint is arc
    // else nextEndPoint is path

// basic layout
















// HANDLE PATH TO ARC
if(targetEndPoints[index][1].arc.joiner === true && targetEndPoints[index][1].arc.joinerSide === "AAA") { // 1 + " - Joiner"
    parallelPathObject.pathToArcCounter += 1
    handlePathToArcIntersectionNoContact(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index)
    parallelPathObject.parallelPathSegmentCounter_FIRST = 0
}
else if(targetEndPoints[index - 1][1].arc.joiner === true && targetEndPoints[index - 1][1].arc.joinerSide === "AAA") { // 2 + " - Joiner"
    if(targetEndPoints[index + 1][1].arc.exist === true){ // orig (double_arc) shape"
        parallelPathObject.parallelPathSegmentCounter_FIRST = 0
    } else { // "new (single_arc) shape"
        function skipFillersAndSetParallelProjections() {}
        function handleIntersectionArcToPath() {}
    }
}
// HANDLE ARC TO ARC
else if(targetEndPoints[index][1].arc.joiner === true && targetEndPoints[index][1].arc.joinerSide === "CCC") { // 3 + " - Joiner"
    parallelPathObject.arcToArcCounter += 1
    handleArcToArcIntersectionNoContact(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index-1)
    parallelPathObject.parallelPathSegmentCounter_FIRST = 0
} 
else if(targetEndPoints[index - 1][1].arc.joiner === true && targetEndPoints[index - 1][1].arc.joinerSide === "CCC") { // 4 + " - Joiner
    parallelPathObject.parallelPathSegmentCounter_FIRST = 0
}
// HANDLE ARC TO PATH
else if(targetEndPoints[index][1].arc.joiner === true && targetEndPoints[index][1].arc.joinerSide === "BBB") { // 5 + " - Joiner // Set Path Point (Shape 2: Part 1)
    function skipFillersAndSetParallelProjections() {}
    function handleNOIntersection() {}
}
else if(skipperCheckers.skipperChecker_Arc === true){ // 6 + " - Skipper
    parallelPathObject.parallelPathSegmentCounter_FIRST = 0
}
// HANDLE OTHERS
else {
    parallelPathObject.parallelPathSegmentCounter_FIRST = parallelPathObject.parallelPathSegmentCounter_FIRST + 1
    // Applies to first Arc Half
    if(parallelPathObject.parallelPathSegmentCounter_FIRST === 0) {
        if(index !== 0) {
            if(targetEndPoints[index - 1][1].arc.exist === true){ // 3 // arc_arc: 1111
            } else { // 4 // run function: handlePathToArcIntersection() (Shape 1: Part 2)
                function handleIntersectionPathToArc() {}
            }
        } else { // 5
            function setPerpendicularPoints() {}
        }
        console.log(6)
        if(targetEndPoints[index + 1][1].arc.exist === true) { // orig (double_arc) shape
            function setThisPathDataAsPreviousPathData() {}
        } else { // new (single_arc) shape
            function skipFillersAndSetParallelProjections() {}
            function handleIntersectionArcToPath() {}
        }
    }
    // Applies to second Arc Half
    if(parallelPathObject.parallelPathSegmentCounter_FIRST === 1) { // 7
        function setPerpendicularPointsAndPrevious() {}
        if(index !== targetEndPoints.length - 1){
            if(targetEndPoints[index + 1][1].arc.exist === true) { // 8
                if(targetEndPoints[index + 1][1].arc.joinerSide != "AAA" && targetEndPoints[index + 1][1].arc.joinerSide != "BBB" && targetEndPoints[index + 1][1].arc.joinerSide != "CCC") { // arc_arc: 22222
                    function handleIntersectionArcToArc() {}
                }
            } else { // 9 // Set Path Point (Shape 2: Part 1)
                function skipFillersAndSetParallelProjections() {}
                function handleIntersectionArcToPath() {}
            }
        // Last point of Shape
        } else { // 10
            function setPerpendicularPoints() {}
        }
        parallelPathObject.parallelPathSegmentCounter_FIRST = -1    // Reset parallelPathObject.parallelPathSegmentCounter_FIRST
    }
}



// console.log(5)
// function setPerpendicularPoints() {}
// let thisPathData = refEndPointsBase[index]
// let nextPathData = refEndPointsBase[index + 1]
// let thisParallelPathData = targetEndPoints[index][0]
// let parallelAnchorPoints = findPointAlongSlopeAtDistance([thisPathData.coords.x, thisPathData.coords.y], [nextPathData.arc.center.x, nextPathData.arc.center.y], handleArcsObject.baseArcToCursorDist)
// thisParallelPathData.coords.x = parallelAnchorPoints[0]
// thisParallelPathData.coords.y = parallelAnchorPoints[1]

// console.log(7)
// function setPerpendicularPointsAndPrevious() {}
// let thisPathData = refEndPointsBase[index]
// let nextPathData = refEndPointsBase[index + 1]
// let thisParallelPathData = targetEndPoints[index][0]
// let parallelAnchorPoints = findPointAlongSlopeAtDistance([thisPathData.coords.x, thisPathData.coords.y], [nextPathData.arc.center.x, nextPathData.arc.center.y], handleArcsObject.baseArcToCursorDist)
// thisParallelPathData.coords.x = parallelAnchorPoints[0]
// thisParallelPathData.coords.y = parallelAnchorPoints[1]

// let prevParallelPathData = targetEndPoints[index - 1][1]
// prevParallelPathData.coords.x = parallelAnchorPoints[0]
// prevParallelPathData.coords.y = parallelAnchorPoints[1]

// console.log(10)
// function setPerpendicularPoints() {}
// let thisPathData = refEndPointsBase[index + 1]
// let nextPathData = refEndPointsBase[index + 1]
// let thisParallelPathData = targetEndPoints[index][1]
// let parallelAnchorPoints = findPointAlongSlopeAtDistance([thisPathData.coords.x, thisPathData.coords.y], [nextPathData.arc.center.x, nextPathData.arc.center.y], handleArcsObject.baseArcToCursorDist)
// thisParallelPathData.coords.x = parallelAnchorPoints[0]
// thisParallelPathData.coords.y = parallelAnchorPoints[1]







// function skipFillersAndSetParallelProjections() {}
// let fillerAdder = 0
// let nextFillerAdder = 0

// if(refEndPointsBase[index + 2] === "filler") {
//     fillerAdder = fillerAdder + 0
//     nextFillerAdder = nextFillerAdder + 1
// }

// let thisPathDataOutside = refEndPointsBase[index + 1 + fillerAdder]
// let nextPathDataOutside = refEndPointsBase[index + 2 + nextFillerAdder]

// let parallelProjections = calcParallelProjections(thisPathDataOutside.coords, nextPathDataOutside.coords, parallelPathObject.parallelDistance)

// targetEndPoints[index + 1][0].coords.x = parallelProjections.thisPointX
// targetEndPoints[index + 1][0].coords.y = parallelProjections.thisPointY
// targetEndPoints[index + 1][1].coords.x = parallelProjections.nextPointX
// targetEndPoints[index + 1][1].coords.y = parallelProjections.nextPointY

// console.log("run function: handleArcToPathIntersection() (Shape 2: Part 2)")

// parallelPathObject.arcToPathCounter += 1



// function handleIntersectionArcToPath() {}
// if (parallelPathObject.collectIndicesOfIntersections === true) {
//     parallelPathObject.arcToPathIndexArray.push(index + 1)
// }
// handleArcToPathIntersection(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parallelPathObject.arcToPathIndexArray, parallelPathObject.arcToPathCounter)

// if (targetEndPoints[index + 1][1].arc.joiner) {
//     parallelPathObject.arcToPathCounter -= 1
// }







// function skipFillersAndSetParallelProjections() {}
// let fillerAdder = 0
// let nextFillerAdder = 0

// if(refEndPointsBase[index + 2] === "filler") {
//     fillerAdder = fillerAdder + 0
//     nextFillerAdder = nextFillerAdder + 1
// }

// let thisPathDataOutside = refEndPointsBase[index + 0 + fillerAdder]
// let nextPathDataOutside = refEndPointsBase[index + 2 + nextFillerAdder]

// let parallelProjections = calcParallelProjections(thisPathDataOutside.coords, nextPathDataOutside.coords, parallelPathObject.parallelDistance)

// targetEndPoints[index + 1][0].coords.x = parallelProjections.thisPointX
// targetEndPoints[index + 1][0].coords.y = parallelProjections.thisPointY
// targetEndPoints[index + 1][1].coords.x = parallelProjections.nextPointX
// targetEndPoints[index + 1][1].coords.y = parallelProjections.nextPointY

// console.log("run function: handleArcToPathIntersection() (Shape 2: Part 2)")

// parallelPathObject.arcToPathCounter += 1




// function handleNOIntersection() {}
// handleArcToPathIntersectionNoContact(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index-1)

// parallelPathObject.parallelPathSegmentCounter_SECOND = 1








// function skipFillersAndSetParallelProjections() {}
// let fillerAdder = 0
// let nextFillerAdder = 0

// if(refEndPointsBase[index + 2] === "filler") {
//     fillerAdder = fillerAdder + 0
//     nextFillerAdder = nextFillerAdder + 1
// }

// let thisPathDataOutside = refEndPointsBase[index + 1 + fillerAdder]
// let nextPathDataOutside = refEndPointsBase[index + 2 + nextFillerAdder]

// let parallelProjections = calcParallelProjections(thisPathDataOutside.coords, nextPathDataOutside.coords, parallelPathObject.parallelDistance)

// targetEndPoints[index + 1][0].coords.x = parallelProjections.thisPointX
// targetEndPoints[index + 1][0].coords.y = parallelProjections.thisPointY
// targetEndPoints[index + 1][1].coords.x = parallelProjections.nextPointX
// targetEndPoints[index + 1][1].coords.y = parallelProjections.nextPointY

// console.log("run function: handleArcToPathIntersection() (Shape 2: Part 2)")

// parallelPathObject.arcToPathCounter += 1



// function handleIntersectionArcToPath() {}
// if (parallelPathObject.collectIndicesOfIntersections === true) {
//     parallelPathObject.arcToPathIndexArray.push(index + 1)
// }

// handleArcToPathIntersection(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parallelPathObject.arcToPathIndexArray, parallelPathObject.arcToPathCounter)

// if (targetEndPoints[index + 1][1].arc.joiner) {
//     parallelPathObject.arcToPathCounter -= 1
// }









// function skipFillersAndSetParallelProjections() {}
// let fillerAdder = 0
// let nextFillerAdder = 0

// if(refEndPointsBase[index + 2] === "filler") {
//     fillerAdder = fillerAdder + 0
//     nextFillerAdder = nextFillerAdder + 1
// }

// let thisPathDataOutside = refEndPointsBase[index + 1 + fillerAdder]
// let nextPathDataOutside = refEndPointsBase[index + 2 + nextFillerAdder]

// let parallelProjections = calcParallelProjections(thisPathDataOutside.coords, nextPathDataOutside.coords, parallelPathObject.parallelDistance)

// targetEndPoints[index + 1][0].coords.x = parallelProjections.thisPointX
// targetEndPoints[index + 1][0].coords.y = parallelProjections.thisPointY
// targetEndPoints[index + 1][1].coords.x = parallelProjections.nextPointX
// targetEndPoints[index + 1][1].coords.y = parallelProjections.nextPointY

// console.log("run function: handleArcToPathIntersection() (Shape 2: Part 2)")

// parallelPathObject.arcToPathCounter += 1



// function handleIntersectionArcToPath() {}
// if (parallelPathObject.collectIndicesOfIntersections === true) {
//     parallelPathObject.arcToPathIndexArray.push(index + 1)
// }

// handleArcToPathIntersection(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parallelPathObject.arcToPathIndexArray, parallelPathObject.arcToPathCounter)

// if (targetEndPoints[index + 1][1].arc.joiner) {
//     parallelPathObject.arcToPathCounter -= 1
// }



// function handleIntersectionPathToArc() {}
// parallelPathObject.pathToArcCounter += 1
// if (parallelPathObject.collectIndicesOfIntersections === true) {
//     parallelPathObject.pathToArchIndexArray.push(index)
// }
// handlePathToArcIntersection(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parallelPathObject.pathToArchIndexArray, parallelPathObject.pathToArcCounter)


// function handleIntersectionArcToArc() {}
// parallelPathObject.arcToArcCounter += 1
// if (parallelPathObject.collectIndicesOfIntersections === true) {
//     parallelPathObject.arcToArcIndexArray.push(index + 1)
// }
// handleArcToArcIntersection(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parallelPathObject.arcToArcIndexArray, parallelPathObject.arcToArcCounter)





// function setThisPathDataAsPreviousPathData() {}
// let prevParallelPathData = targetEndPoints[index - 1][1]
// let thisParallelPathData = targetEndPoints[index][1]
// if(thisParallelPathData.arc.joiner) {
//     thisParallelPathData.coords.x = prevParallelPathData.coords.x
//     thisParallelPathData.coords.y = prevParallelPathData.coords.y
// }