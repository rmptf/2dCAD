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
    parallelPathObject.pathToArcCounter += 1
    handlePathToArcIntersectionNoContact(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index)
    parallelPathObject.parallelPathSegmentCounter_FIRST = 0
}
else if(targetEndPoints[index - 1][1].arc.joiner === true && targetEndPoints[index - 1][1].arc.joinerSide === "AAA") {
    if(targetEndPoints[index + 1][1].arc.exist === true) {
        // 2_A_Joiner
        parallelPathObject.parallelPathSegmentCounter_FIRST = 0
    } else {
        // 2_B_Joiner
        skipFillersAndSetParallelProjections(1)
        handleIntersectionArcToPath()
    }
}
else if(targetEndPoints[index][1].arc.joiner === true && targetEndPoints[index][1].arc.joinerSide === "CCC") {
    // 3_Joiner
    parallelPathObject.arcToArcCounter += 1
    handleArcToArcIntersectionNoContact(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index-1)
    parallelPathObject.parallelPathSegmentCounter_FIRST = 0
}
else if(targetEndPoints[index - 1][1].arc.joiner === true && targetEndPoints[index - 1][1].arc.joinerSide === "CCC") {
    // 4_Joiner
    parallelPathObject.parallelPathSegmentCounter_FIRST = 0
}
else if(targetEndPoints[index][1].arc.joiner === true && targetEndPoints[index][1].arc.joinerSide === "BBB") {
    // 5_Joiner
    skipFillersAndSetParallelProjections(0)
    handleNOIntersection()
    parallelPathObject.parallelPathSegmentCounter_SECOND = 1
}
else if(skipperCheckers.skipperChecker_Arc === true) {
    // 6_Joiner
    parallelPathObject.parallelPathSegmentCounter_FIRST = 0
} else {
    // 2
    parallelPathObject.parallelPathSegmentCounter_FIRST = parallelPathObject.parallelPathSegmentCounter_FIRST + 1
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
                if(targetEndPoints[index + 1][1].arc.joinerSide != "AAA" && targetEndPoints[index + 1][1].arc.joinerSide != "BBB" && targetEndPoints[index + 1][1].arc.joinerSide != "CCC") {
                    // 8
                    handleArcIntersection(parallelPathObject.arcToArcIndexArray, parallelPathObject.arcToArcCounter, "a2a")
                }
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