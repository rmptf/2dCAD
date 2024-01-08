let prevEndPoint = allEndPoints[index - 1][1]
let thisEndPoint = allEndPoints[index][1]
let nextEndPoint = allEndPoints[index + 1][1]


// JOINERS
// PATH - ARC
if(thisEndPoint.arc.joiner === true && thisEndPoint.arc.joinerSide === "AAA") {}
else if(prevEndPoint.arc.joiner === true && prevEndPoint.arc.joinerSide === "AAA") {
    if(nextEndPoint.arc.exist === true){
    } else {
        // if (parallelPathObject.collectIndicesOfIntersections === true) {}
        // if (nextEndPoint.arc.joiner) {}
    }
}
// PATH - ARC

// ARC - ARC
else if(thisEndPoint.arc.joiner === true && thisEndPoint.arc.joinerSide === "CCC") {}
else if(prevEndPoint.arc.joiner === true && prevEndPoint.arc.joinerSide === "CCC") {}
// ARC - ARC

// ARC - PATH
else if(thisEndPoint.arc.joiner === true && thisEndPoint.arc.joinerSide === "BBB") {
    // if(referenceEndPointsBaseAndFillers[index + 2] === "filler"){}
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
                // if (parallelPathObject.collectIndicesOfIntersections === true) {}
            }
        } else {}
        if(nextEndPoint.arc.exist === true) {
            // if(thisEndPoint.arc.joiner) {}
        } else {
            // if(referenceEndPointsBaseAndFillers[index + 2] === "filler") {}
            // if(parallelPathObject.collectIndicesOfIntersections === true) {}
            // if(nextEndPoint.arc.joiner) {}
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











// first path
// not first path

// prevEndPoint
// thisEndPoint
// nextEndPoint

// arc
// path