// HANDLE PATH TO ARC
// thisEndPoint has Joiner & Joiner is AAA
// thisEndPoint is a noContactPathToArcEndPoint
if(targetEndPoints[index][1].arc.joiner === true && targetEndPoints[index][1].arc.joinerSide === "AAA") { // 1 + " - Joiner"
    parallelPathObject.pathToArcCounter += 1
    handlePathToArcIntersectionNoContact(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index)
    parallelPathObject.parallelPathSegmentCounter_FIRST = 0
}
// previousEndPoint has a Joiner & Joiner is AAA
// previousEndPoint is noContactArcToPathEndPoint
else if(targetEndPoints[index - 1][1].arc.joiner === true && targetEndPoints[index - 1][1].arc.joinerSide === "AAA") { // 2 + " - Joiner"
    // nextEndPoint is a noContactPathToArcEndPoint
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
    parallelPathObject.parallelPathSegmentCounter_SECOND = 1
}
else if(skipperCheckers.skipperChecker_Arc === true){ // 6 + " - Skipper // for adding and removing intersecting paths
    parallelPathObject.parallelPathSegmentCounter_FIRST = 0
}
// HANDLE OTHERS
else {
    parallelPathObject.parallelPathSegmentCounter_FIRST = parallelPathObject.parallelPathSegmentCounter_FIRST + 1
    if(parallelPathObject.parallelPathSegmentCounter_FIRST === 0) {
        if(index !== 0) {
            if(targetEndPoints[index - 1][1].arc.exist === true) {
                // 3
                // empty
            } else {
                // 4
                function handleIntersectionPathToArc() {}
            }
        } else {
            // 5
            function setPerpendicularPoints() {}
        }
        if(targetEndPoints[index + 1][1].arc.exist === true) {
            // 6_A
            function setThisPathDataAsPreviousPathData() {}
        } else {
            // 6_B
            function skipFillersAndSetParallelProjections() {}
            function handleIntersectionArcToPath() {}
        }
    }
    if(parallelPathObject.parallelPathSegmentCounter_FIRST === 1) {
        // 7
        function setPerpendicularPointsAndPrevious() {}
        if(index !== targetEndPoints.length - 1){
            if(targetEndPoints[index + 1][1].arc.exist === true) {
                if(targetEndPoints[index + 1][1].arc.joinerSide != "AAA" && targetEndPoints[index + 1][1].arc.joinerSide != "BBB" && targetEndPoints[index + 1][1].arc.joinerSide != "CCC") {
                    // 8
                    function handleIntersectionArcToArc() {}
                }
            } else {
                // 9
                function skipFillersAndSetParallelProjections() {}
                function handleIntersectionArcToPath() {}
            }
        } else {
            // 10
            function setPerpendicularPoints() {}
        }
        parallelPathObject.parallelPathSegmentCounter_FIRST = -1
    }
}





// if(targetEndPoints[index][1].arc.joiner === true && targetEndPoints[index][1].arc.joinerSide === "AAA") {
//     // 1       1
// }
// else if(targetEndPoints[index - 1][1].arc.joiner === true && targetEndPoints[index - 1][1].arc.joinerSide === "AAA") {
//     // 2       2
//     if(targetEndPoints[index + 1][1].arc.exist === true) {
//         // 2-1     3
//     } else {
//         // 2-2     4
//     }
// }
// else if(targetEndPoints[index][1].arc.joiner === true && targetEndPoints[index][1].arc.joinerSide === "CCC") {
//     // 3       5
// }
// else if(targetEndPoints[index - 1][1].arc.joiner === true && targetEndPoints[index - 1][1].arc.joinerSide === "CCC") {
//     // 4       6
// }
// else if(targetEndPoints[index][1].arc.joiner === true && targetEndPoints[index][1].arc.joinerSide === "BBB") {
//     // 5       7
// }
// else if(skipperCheckers.skipperChecker_Arc === true) {
//     // 6       8
// } else {
//     // 7       9
//     if(parallelPathObject.parallelPathSegmentCounter_FIRST === 0) {
//         // 7-1     10
//         if(index !== 0) {
//             // 7-1-1       11
//             if(targetEndPoints[index - 1][1].arc.exist === true) {
//                 // 7-1-1-1     12
//             } else {
//                 // 7-1-1-2     13
//             }
//         } else {
//             // 7-1-2       14
//         }
//         if(targetEndPoints[index + 1][1].arc.exist === true) {
//             // 7-1-3       15
//         } else {
//             // 7-1-4       16
//         }
//     }
//     if(parallelPathObject.parallelPathSegmentCounter_FIRST === 1) {
//         // 7-2     17
//         if(index !== targetEndPoints.length - 1) {
//             // 7-2-1       18
//             if(targetEndPoints[index + 1][1].arc.exist === true) {
//                 // 7-2-1-1     19
//                 if(targetEndPoints[index + 1][1].arc.joinerSide != "AAA" && targetEndPoints[index + 1][1].arc.joinerSide != "BBB" && targetEndPoints[index + 1][1].arc.joinerSide != "CCC") {}
//                     // 7-2-1-1-1       20
//             } else {
//                 // 7-2-1-1-2       21
//             }
//         } else {
//             // 7-2-2       22
//         }
//         // 7-2-3       23
//     }
// }






if(targetEndPoints[index][1].arc.joiner === true && targetEndPoints[index][1].arc.joinerSide === "AAA") {
    // 1_Joiner
}
else if(targetEndPoints[index - 1][1].arc.joiner === true && targetEndPoints[index - 1][1].arc.joinerSide === "AAA") {
    if(targetEndPoints[index + 1][1].arc.exist === true) {
        // 2_A_Joiner
    } else {
        // 2_B_Joiner
        skipFillersAndSetParallelProjections(1)
        handleIntersectionArcToPath()
    }
}
else if(targetEndPoints[index][1].arc.joiner === true && targetEndPoints[index][1].arc.joinerSide === "CCC") {
    // 3_Joiner
}
else if(targetEndPoints[index - 1][1].arc.joiner === true && targetEndPoints[index - 1][1].arc.joinerSide === "CCC") {
    // 4_Joiner
}
else if(targetEndPoints[index][1].arc.joiner === true && targetEndPoints[index][1].arc.joinerSide === "BBB") {
    // 5_Joiner
    skipFillersAndSetParallelProjections(0)
    handleNOIntersection()
}
else if(skipperCheckers.skipperChecker_Arc === true) {
    // 6_Joiner
} else {
    if(parallelPathObject.parallelPathSegmentCounter_FIRST === 0) {
        if(index !== 0) {
            if(targetEndPoints[index - 1][1].arc.exist === true) {
                // 3
                // empty
            } else {
                // 4
                handleArcIntersection(parallelPathObject.pathToArchIndexArray, parallelPathObject.pathToArcCounter, "p2a")
            }
        } else {
            // 5
            setPerpendicularPoints(index, index + 1, index[0], false)
        }
        if(targetEndPoints[index + 1][1].arc.exist === true) {
            // 6_A
            setThisPathDataAsPreviousPathData()
        } else {
            // 6_B
            skipFillersAndSetParallelProjections(1)
            handleIntersectionArcToPath()
        }
    }

    if(parallelPathObject.parallelPathSegmentCounter_FIRST === 1) {
        // 7
        setPerpendicularPoints(index, index + 1, index[0], true)
        if(index !== targetEndPoints.length - 1) {
            if(targetEndPoints[index + 1][1].arc.exist === true) {
                if(targetEndPoints[index + 1][1].arc.joinerSide != "AAA" && targetEndPoints[index + 1][1].arc.joinerSide != "BBB" && targetEndPoints[index + 1][1].arc.joinerSide != "CCC") {}
                // 8
                handleArcIntersection(parallelPathObject.arcToArcIndexArray, parallelPathObject.arcToArcCounter, "a2a")
            } else {
                // 9
                skipFillersAndSetParallelProjections(1)
                handleIntersectionArcToPath()
            }
        } else {
            // 10
            setPerpendicularPoints(index + 1, index + 1, index[1], false)
        }
        // 11
        parallelPathObject.parallelPathSegmentCounter_FIRST = -1
    }
}










const isJoiner = (newIndex) => targetEndPoints[newIndex][1].arc.joiner === true
const joinerType = (newIndex, code) => targetEndPoints[newIndex][1].arc.joiner === true && targetEndPoints[newIndex][1].arc.joinerSide === code
const arcExist = (newIndex) => targetEndPoints[newIndex][1].arc.exist === true
const lastPosition = (newIndex) => newIndex === targetEndPoints.length - 1
const includes = (list, newIndex) => list.includes(targetEndPoints[newIndex][1].arc.joinerSide)
const segmentCounter = parallelPathObject.parallelPathSegmentCounter_FIRST

switch(true) {
    case isJoiner(index):
    case isJoiner(index - 1):
        handleJoinersCase()
        break
    default:
        handleDefaultCase()
}

function handleDefaultCase() {
    switch(true) {
        case segmentCounter === 0:
            handleFirstShape()
            break
        default:
            handleSecondShape()
    }
}

// Add 6 somewhere in here?
function handleFirstShape() {
    switch(true) {
        case index !== 0 && arcExist(index - 1):
            // 3
        case (index === 0 || !arcExist(index - 1)): // check this
            // 4
        case arcExist(index + 1):
            // 5
            break
    }
}

// 11 goes here somewhere
function handleSecondShape() {
    switch(true) {
        // 7
        case !lastPosition(index) && arcExist(index + 1) && !includes(["AAA", "BBB", "CCC"], index + 1):
            // 8
        case !lastPosition(index) && !arcExist(index + 1):
            // 9
        case lastPosition(index):
            // 10
            break
    }
}

function handleJoinersCase() {
    switch(true) {
        case joinerType(index, "AAA"):
            // 1_Joiner
            break
        case joinerType(index - 1, "AAA"):
            if(targetEndPoints[index + 1][1].arc.exist) {
                // 2_A_Joiner
            } else {
                // 2_B_Joiner
            }
            break
        case joinerType(index, "CCC"):
            // 3_Joiner
            break
        case joinerType(index - 1, "CCC"):
            // 4_Joiner
            break
        case joinerType(index - 1, "BBB"):
            // 5_Joiner
            break
        case skipperCheckers.skipperChecker_Arc:
            // 6_Joiner
            break
    }
}






// console.log(5)
// setPerpendicularPoints(index, index + 1, index[0], false)
// console.log(7)
// setPerpendicularPoints(index, index + 1, index[0], true)
// console.log(10)
// setPerpendicularPoints(index + 1, index + 1, index[1], false)
function setPerpendicularPoints(thisIndex, nextIndex, target, setPrevious) {
    let thisPathData = refEndPointsBase[thisIndex]
    let nextPathData = refEndPointsBase[nextIndex]
    let thisParallelPathData = targetEndPoints[target]
    let parallelAnchorPoints = findPointAlongSlopeAtDistance([thisPathData.coords.x, thisPathData.coords.y], [nextPathData.arc.center.x, nextPathData.arc.center.y], handleArcsObject.baseArcToCursorDist)
    thisParallelPathData.coords.x = parallelAnchorPoints[0]
    thisParallelPathData.coords.y = parallelAnchorPoints[1]

    if (setPrevious) {
        let prevParallelPathData = targetEndPoints[index - 1][1]
        prevParallelPathData.coords.x = parallelAnchorPoints[0]
        prevParallelPathData.coords.y = parallelAnchorPoints[1]
    }
}

// // 2_B_Joiner
// skipFillersAndSetParallelProjections(1)
// // 5_Joiner
// skipFillersAndSetParallelProjections(0)
// // 6_B
// skipFillersAndSetParallelProjections(1)
// // 9
// skipFillersAndSetParallelProjections(1)
function skipFillersAndSetParallelProjections(offset) {
    let fillerAdder = 0
    let nextFillerAdder = 0

    if (refEndPointsBase[index + 2] === "filler") {
        fillerAdder = fillerAdder + 0
        nextFillerAdder = nextFillerAdder + 1
    }

    let thisPathDataOutside = refEndPointsBase[index + offset + fillerAdder]
    let nextPathDataOutside = refEndPointsBase[index + 2 + nextFillerAdder]

    let parallelProjections = calcParallelProjections(thisPathDataOutside.coords, nextPathDataOutside.coords, parallelPathObject.parallelDistance)

    targetEndPoints[index + 1][0].coords.x = parallelProjections.thisPointX
    targetEndPoints[index + 1][0].coords.y = parallelProjections.thisPointY
    targetEndPoints[index + 1][1].coords.x = parallelProjections.nextPointX
    targetEndPoints[index + 1][1].coords.y = parallelProjections.nextPointY

    console.log("run function: handleArcToPathIntersection() (Shape 2: Part 2)")

    parallelPathObject.arcToPathCounter += 1
}

// // 2_B_Joiner
// handleIntersectionArcToPath()
// // 5_Joiner
// handleNOIntersection()
// // 6_B
// handleIntersectionArcToPath()
// // 9
// handleIntersectionArcToPath()
function handleIntersectionArcToPath() {
    if (parallelPathObject.collectIndicesOfIntersections === true) {
        parallelPathObject.arcToPathIndexArray.push(index + 1)
    }
    handleArcToPathIntersection(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parallelPathObject.arcToPathIndexArray, parallelPathObject.arcToPathCounter)

    if (targetEndPoints[index + 1][1].arc.joiner) {
        parallelPathObject.arcToPathCounter -= 1
    }
}

function handleNOIntersection() {
    handleArcToPathIntersectionNoContact(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index-1)
}

// // 4
// handleArcIntersection(parallelPathObject.pathToArchIndexArray, parallelPathObject.pathToArcCounter, "p2a")
// // 8
// handleArcIntersection(parallelPathObject.arcToArcIndexArray, parallelPathObject.arcToArcCounter, "a2a")
function handleArcIntersection(arcIndexArray, arcShapeCounter, arcShape) {
    arcShapeCounter += 1

    if (parallelPathObject.collectIndicesOfIntersections === true) {
        arcIndexArray.push(index);
    }

    switch (arcShape) {
        case "p2a":
            handlePathToArcIntersection(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, arcIndexArray, arcShapeCounter);
            break
        case "a2a":
            handleArcToArcIntersection(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, arcIndexArray, arcShapeCounter);
            break
        default:
            console.log("no shape")
            break
    }
}

// 6_A
// setThisPathDataAsPreviousPathData()
function setThisPathDataAsPreviousPathData() {
    let prevParallelPathData = targetEndPoints[index - 1][1]
    let thisParallelPathData = targetEndPoints[index][1]
    if(thisParallelPathData.arc.joiner) {
        thisParallelPathData.coords.x = prevParallelPathData.coords.x
        thisParallelPathData.coords.y = prevParallelPathData.coords.y
    }
}