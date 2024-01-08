import {handleArcToArcIntersection, handlePathToArcIntersection, handleArcToPathIntersection} from './sortEndPoints_functions/intersections_contact.js'
import {handlePathToArcIntersectionNoContact, handleArcToPathIntersectionNoContact, handleArcToArcIntersectionNoContact} from './sortEndPoints_functions/intersections_noContact.js'
import {findIntersectingPointSIMPLER, findPointAlongSlopeAtDistance} from '../drawParallelPath_functions/parallelPathFunctions.js'
import {getDistance} from '../../../math/mathFunctions.js'

// FIXME:
// path to arc wasnt working correct after the first path switched up code there but untested 
// second path to arcs dont work unless there is more than one path before the arc (not true) (seems to work fine)

function sortEndpoints(
    targetEndPointsParallelFull,
    referenceEndPointsParallelPerpendicular,
    referenceEndPointsBaseAndFillers,
    documentFigureCount,
    self,
    index,
    parallelPathObject,
    skipperCheckers
) {
    if (targetEndPointsParallelFull[index][1].arc.exist === true) {
        sort_endPoint_withArc(
            targetEndPointsParallelFull,
            referenceEndPointsParallelPerpendicular,
            referenceEndPointsBaseAndFillers,
            documentFigureCount,
            self,
            index,
            parallelPathObject,
            skipperCheckers
        )
    } else {
        sort_endPoint_noArc(
            targetEndPointsParallelFull,
            referenceEndPointsParallelPerpendicular,
            referenceEndPointsBaseAndFillers,
            self,
            index,
            parallelPathObject
        )
    }
}


















































function sort_endPoint_withArc(
    targetEndPointsParallelFull,
    referenceEndPointsParallelPerpendicular,
    referenceEndPointsBaseAndFillers,
    documentFigureCount,
    self,
    index,
    parallelPathObject,
    skipperCheckers
) {
    let thisPathSegmentArcToCursorDistance
    let lastLASTPathDataOrFillerLocal = referenceEndPointsBaseAndFillers[index - 2]
    let lastPathDataOrFillerLocal = referenceEndPointsBaseAndFillers[index - 1]
    let thisPathDataOrFillerLocal = referenceEndPointsBaseAndFillers[index]
    let nextPathDataOrFillerLocal = referenceEndPointsBaseAndFillers[index + 1]
    let prevOriginalParallelPathDataGlobal = targetEndPointsParallelFull[index - 1][1]
    let thisOriginalParallelPathDataGlobal = targetEndPointsParallelFull[index][1]
    let nextOriginalParallelPathDataGlobal = targetEndPointsParallelFull[index + 1][1]

    if(thisPathDataOrFillerLocal !== "filler") {
        if(nextPathDataOrFillerLocal !== "filler"){
            thisPathSegmentArcToCursorDistance = (nextPathDataOrFillerLocal.arc.sweepFlag === 0) ? parallelPathObject.parallelDistance : parallelPathObject.parallelDistance * -1
            let nextPathSegmentArcToCenterTotalDistance = getDistance(nextPathDataOrFillerLocal.coords.x, nextPathDataOrFillerLocal.coords.y, nextPathDataOrFillerLocal.arc.center.x, nextPathDataOrFillerLocal.arc.center.y)
            let nextPathSegmentArcToCenterMinusPointerToArcFromArc1 = nextPathSegmentArcToCenterTotalDistance - thisPathSegmentArcToCursorDistance
            thisOriginalParallelPathDataGlobal.arc.radius = nextPathSegmentArcToCenterMinusPointerToArcFromArc1
        }
    }
    if(thisPathDataOrFillerLocal === "filler" && lastPathDataOrFillerLocal.arc.exist === true && lastLASTPathDataOrFillerLocal.arc.exist === true) {
        if(nextPathDataOrFillerLocal !== "filler"){
            thisPathSegmentArcToCursorDistance = (nextPathDataOrFillerLocal.arc.sweepFlag === 0) ? parallelPathObject.parallelDistance : parallelPathObject.parallelDistance * -1
            let nextPathSegmentArcToCenterTotalDistance = getDistance(nextPathDataOrFillerLocal.coords.x, nextPathDataOrFillerLocal.coords.y, nextPathDataOrFillerLocal.arc.center.x, nextPathDataOrFillerLocal.arc.center.y)
            let nextPathSegmentArcToCenterMinusPointerToArcFromArc1 = nextPathSegmentArcToCenterTotalDistance - thisPathSegmentArcToCursorDistance
            thisOriginalParallelPathDataGlobal.arc.radius = nextPathSegmentArcToCenterMinusPointerToArcFromArc1
        }
    }


    // HANDLE PATH TO ARC
    if(targetEndPointsParallelFull[index][1].arc.joiner === true && targetEndPointsParallelFull[index][1].arc.joinerSide === "AAA") {
            console.log(1 + " - Joiner")

            parallelPathObject.pathToArcCounter += 1
            handlePathToArcIntersectionNoContact(targetEndPointsParallelFull, referenceEndPointsParallelPerpendicular, referenceEndPointsBaseAndFillers, documentFigureCount, self, index)

            parallelPathObject.parallelPathSegmentCounter_FIRST = 0
        } 
    else if(targetEndPointsParallelFull[index - 1][1].arc.joiner === true && targetEndPointsParallelFull[index - 1][1].arc.joinerSide === "AAA") {
        console.log(2 + " - Joiner")

        if(targetEndPointsParallelFull[index + 1][1].arc.exist === true){
            console.log("orig (double_arc) shape")
            parallelPathObject.parallelPathSegmentCounter_FIRST = 0
        } else {
            console.log("new (single_arc) shape")
            // console.log(index)

            let fillerAdder = 0
            let nextFillerAdder = 0

            // CHECK
            if(referenceEndPointsBaseAndFillers[index + 2] === "filler"){
                fillerAdder = fillerAdder + 0
                nextFillerAdder = nextFillerAdder + 1
            }

            let thisPathDataOutside = referenceEndPointsBaseAndFillers[index + 1 + fillerAdder]
            let nextPathDataOutside = referenceEndPointsBaseAndFillers[index + 2 + nextFillerAdder]
            
            // updateSVG_highlight_1_point_01([thisPathDataOutside.coords.x, thisPathDataOutside.coords.y])
            // updateSVG_highlight_1_point_02([nextPathDataOutside.coords.x, nextPathDataOutside.coords.y])

            let this_parallel_perp_AnchorPointX = thisPathDataOutside.coords.x - (parallelPathObject.parallelDistance * Math.sin(Math.atan2(thisPathDataOutside.coords.y - nextPathDataOutside.coords.y, thisPathDataOutside.coords.x - nextPathDataOutside.coords.x)))
            let this_parallel_perp_AnchorPointY = thisPathDataOutside.coords.y + (parallelPathObject.parallelDistance * Math.cos(Math.atan2(thisPathDataOutside.coords.y - nextPathDataOutside.coords.y, thisPathDataOutside.coords.x - nextPathDataOutside.coords.x)))
            let next_parallel_perp_AnchorPointX = nextPathDataOutside.coords.x - (parallelPathObject.parallelDistance * Math.sin(Math.atan2(thisPathDataOutside.coords.y - nextPathDataOutside.coords.y, thisPathDataOutside.coords.x - nextPathDataOutside.coords.x)))
            let next_parallel_perp_AnchorPointY = nextPathDataOutside.coords.y + (parallelPathObject.parallelDistance * Math.cos(Math.atan2(thisPathDataOutside.coords.y - nextPathDataOutside.coords.y, thisPathDataOutside.coords.x - nextPathDataOutside.coords.x)))
            targetEndPointsParallelFull[index + 1][0].coords.x = this_parallel_perp_AnchorPointX
            targetEndPointsParallelFull[index + 1][0].coords.y = this_parallel_perp_AnchorPointY
            targetEndPointsParallelFull[index + 1][1].coords.x = next_parallel_perp_AnchorPointX
            targetEndPointsParallelFull[index + 1][1].coords.y = next_parallel_perp_AnchorPointY

            console.log("run function: handleArcToPathIntersection() (Shape 2: Part 2)")

            // CHECK
            // NEW_ArcIntersectPICKER
            parallelPathObject.arcToPathCounter += 1
            if (parallelPathObject.collectIndicesOfIntersections === true) {
                parallelPathObject.arcToPathIndexArray.push(index + 1)
            }
            handleArcToPathIntersection(targetEndPointsParallelFull, referenceEndPointsParallelPerpendicular, referenceEndPointsBaseAndFillers, documentFigureCount, self, index, parallelPathObject.arcToPathIndexArray, parallelPathObject.arcToPathCounter)
            // CHECK
            if (targetEndPointsParallelFull[index + 1][1].arc.joiner) {
                parallelPathObject.arcToPathCounter -= 1
            }
        }


    }
    // HANDLE PATH TO ARC

    // HANDLE ARC TO ARC
    else if(targetEndPointsParallelFull[index][1].arc.joiner === true && targetEndPointsParallelFull[index][1].arc.joinerSide === "CCC") {
        // if(targetEndPointsParallelFull[index][1].arc.joiner === true) {
        console.log(3 + " - Joiner")

        // NEW_ArcIntersectPICKER
        parallelPathObject.arcToArcCounter += 1

        handleArcToArcIntersectionNoContact(targetEndPointsParallelFull, referenceEndPointsParallelPerpendicular, referenceEndPointsBaseAndFillers, documentFigureCount, self, index-1)

        parallelPathObject.parallelPathSegmentCounter_FIRST = 0
    } 
    else if(targetEndPointsParallelFull[index - 1][1].arc.joiner === true && targetEndPointsParallelFull[index - 1][1].arc.joinerSide === "CCC") {
    // } else if(targetEndPointsParallelFull[index - 1][1].arc.joiner === true) {
        console.log(4 + " - Joiner")
        parallelPathObject.parallelPathSegmentCounter_FIRST = 0
    }
    // HANDLE ARC TO ARC
    
    // HANDLE ARC TO PATH
    else if(targetEndPointsParallelFull[index][1].arc.joiner === true && targetEndPointsParallelFull[index][1].arc.joinerSide === "BBB") {
        console.log(5 + " - Joiner")
        console.log("Set Path Point (Shape 2: Part 1)")
        let fillerAdder = 0
        let nextFillerAdder = 0

        if(referenceEndPointsBaseAndFillers[index + 2] === "filler"){
            fillerAdder = fillerAdder + 0
            nextFillerAdder = nextFillerAdder + 1
        }

        let thisPathDataOutside = referenceEndPointsBaseAndFillers[index + 0 + fillerAdder]
        let nextPathDataOutside = referenceEndPointsBaseAndFillers[index + 2 + nextFillerAdder]
        let this_parallel_perp_AnchorPointX = thisPathDataOutside.coords.x - (parallelPathObject.parallelDistance * Math.sin(Math.atan2(thisPathDataOutside.coords.y - nextPathDataOutside.coords.y, thisPathDataOutside.coords.x - nextPathDataOutside.coords.x)))
        let this_parallel_perp_AnchorPointY = thisPathDataOutside.coords.y + (parallelPathObject.parallelDistance * Math.cos(Math.atan2(thisPathDataOutside.coords.y - nextPathDataOutside.coords.y, thisPathDataOutside.coords.x - nextPathDataOutside.coords.x)))
        let next_parallel_perp_AnchorPointX = nextPathDataOutside.coords.x - (parallelPathObject.parallelDistance * Math.sin(Math.atan2(thisPathDataOutside.coords.y - nextPathDataOutside.coords.y, thisPathDataOutside.coords.x - nextPathDataOutside.coords.x)))
        let next_parallel_perp_AnchorPointY = nextPathDataOutside.coords.y + (parallelPathObject.parallelDistance * Math.cos(Math.atan2(thisPathDataOutside.coords.y - nextPathDataOutside.coords.y, thisPathDataOutside.coords.x - nextPathDataOutside.coords.x)))
        targetEndPointsParallelFull[index + 1][0].coords.x = this_parallel_perp_AnchorPointX
        targetEndPointsParallelFull[index + 1][0].coords.y = this_parallel_perp_AnchorPointY
        targetEndPointsParallelFull[index + 1][1].coords.x = next_parallel_perp_AnchorPointX
        targetEndPointsParallelFull[index + 1][1].coords.y = next_parallel_perp_AnchorPointY

        // NEW_ArcIntersectPICKER
        parallelPathObject.arcToPathCounter += 1

        console.log("run function: handleArcToPathIntersection() (Shape 2: Part 2)")
        handleArcToPathIntersectionNoContact(targetEndPointsParallelFull, referenceEndPointsParallelPerpendicular, referenceEndPointsBaseAndFillers, documentFigureCount, self, index-1)

        parallelPathObject.parallelPathSegmentCounter_SECOND = 1
    }
    else if(skipperCheckers.skipperChecker_Arc === true){
        console.log(6 + " - Skipper")
        console.log("skipped")
        parallelPathObject.parallelPathSegmentCounter_FIRST = 0
    }
    // HANDLE ARC TO PATH
    
    else {
        parallelPathObject.parallelPathSegmentCounter_FIRST = parallelPathObject.parallelPathSegmentCounter_FIRST + 1
        // Applies to first Arc Half
        if(parallelPathObject.parallelPathSegmentCounter_FIRST === 0) {
            // Check if this is not the first point of Entire Shape
            if(index !== 0){
                // If not first point of entire shape, check if the previous point is an arc
                if(targetEndPointsParallelFull[index - 1][1].arc.exist === true){
                    console.log(3)
                    console.log('arc_arc: 1111')
                    // handleArcToArcIntersection(index)
                // If not first point of entire shape, check if the previous point is a path
                } else {
                    console.log(4)
                    console.log("run function: handlePathToArcIntersection() (Shape 1: Part 2)")
                    
                    // NEW_ArcIntersectPICKER
                    parallelPathObject.pathToArcCounter += 1
                    if (parallelPathObject.collectIndicesOfIntersections === true) {
                        parallelPathObject.pathToArchIndexArray.push(index)
                    }
                    handlePathToArcIntersection(targetEndPointsParallelFull, referenceEndPointsParallelPerpendicular, referenceEndPointsBaseAndFillers, documentFigureCount, self, index, parallelPathObject.pathToArchIndexArray, parallelPathObject.pathToArcCounter)
                    // old
                    // handlePathToArcIntersection(index)

                }
            // Check if this is the first point of entire shape
            } else {
                console.log(5)
                let thisPathData = referenceEndPointsBaseAndFillers[index]
                let nextPathData = referenceEndPointsBaseAndFillers[index + 1]
                let thisParallelPathData = targetEndPointsParallelFull[index][0]
                let parallelAnchorPoints = findPointAlongSlopeAtDistance([thisPathData.coords.x, thisPathData.coords.y], [nextPathData.arc.center.x, nextPathData.arc.center.y], thisPathSegmentArcToCursorDistance)
                thisParallelPathData.coords.x = parallelAnchorPoints[0]
                thisParallelPathData.coords.y = parallelAnchorPoints[1]
            }
            console.log(6)
            if(targetEndPointsParallelFull[index + 1][1].arc.exist === true) {
                console.log("orig (double_arc) shape")
                let prevParallelPathData = targetEndPointsParallelFull[index - 1][1]
                let thisParallelPathData = targetEndPointsParallelFull[index][1]
                if(thisParallelPathData.arc.joiner) {
                    thisParallelPathData.coords.x = prevParallelPathData.coords.x
                    thisParallelPathData.coords.y = prevParallelPathData.coords.y
                }
            } else {
                console.log("new (single_arc) shape")
                console.log(index)

                let fillerAdder = 0
                let nextFillerAdder = 0

                // CHECK
                if(referenceEndPointsBaseAndFillers[index + 2] === "filler") {
                    fillerAdder = fillerAdder + 0
                    nextFillerAdder = nextFillerAdder + 1
                }

                let thisPathDataOutside = referenceEndPointsBaseAndFillers[index + 1 + fillerAdder]
                let nextPathDataOutside = referenceEndPointsBaseAndFillers[index + 2 + nextFillerAdder]
                
                // updateSVG_highlight_1_point_01([thisPathDataOutside.coords.x, thisPathDataOutside.coords.y])
                // updateSVG_highlight_1_point_02([nextPathDataOutside.coords.x, nextPathDataOutside.coords.y])

                let this_parallel_perp_AnchorPointX = thisPathDataOutside.coords.x - (parallelPathObject.parallelDistance * Math.sin(Math.atan2(thisPathDataOutside.coords.y - nextPathDataOutside.coords.y, thisPathDataOutside.coords.x - nextPathDataOutside.coords.x)))
                let this_parallel_perp_AnchorPointY = thisPathDataOutside.coords.y + (parallelPathObject.parallelDistance * Math.cos(Math.atan2(thisPathDataOutside.coords.y - nextPathDataOutside.coords.y, thisPathDataOutside.coords.x - nextPathDataOutside.coords.x)))
                let next_parallel_perp_AnchorPointX = nextPathDataOutside.coords.x - (parallelPathObject.parallelDistance * Math.sin(Math.atan2(thisPathDataOutside.coords.y - nextPathDataOutside.coords.y, thisPathDataOutside.coords.x - nextPathDataOutside.coords.x)))
                let next_parallel_perp_AnchorPointY = nextPathDataOutside.coords.y + (parallelPathObject.parallelDistance * Math.cos(Math.atan2(thisPathDataOutside.coords.y - nextPathDataOutside.coords.y, thisPathDataOutside.coords.x - nextPathDataOutside.coords.x)))
                targetEndPointsParallelFull[index + 1][0].coords.x = this_parallel_perp_AnchorPointX
                targetEndPointsParallelFull[index + 1][0].coords.y = this_parallel_perp_AnchorPointY
                targetEndPointsParallelFull[index + 1][1].coords.x = next_parallel_perp_AnchorPointX
                targetEndPointsParallelFull[index + 1][1].coords.y = next_parallel_perp_AnchorPointY

                console.log("run function: handleArcToPathIntersection() (Shape 2: Part 2)")

                // CHECK
                // NEW_ArcIntersectPICKER
                parallelPathObject.arcToPathCounter += 1
                if (parallelPathObject.collectIndicesOfIntersections === true) {
                    parallelPathObject.arcToPathIndexArray.push(index + 1)
                }
                handleArcToPathIntersection(targetEndPointsParallelFull, referenceEndPointsParallelPerpendicular, referenceEndPointsBaseAndFillers, documentFigureCount, self, index, parallelPathObject.arcToPathIndexArray, parallelPathObject.arcToPathCounter)
                // CHECK
                if (targetEndPointsParallelFull[index + 1][1].arc.joiner) {
                    parallelPathObject.arcToPathCounter -= 1
                }
            }
        }

        // Applies to second Arc Half
        if(parallelPathObject.parallelPathSegmentCounter_FIRST === 1) {
            console.log(7)
            let thisPathData = referenceEndPointsBaseAndFillers[index]
            let nextPathData = referenceEndPointsBaseAndFillers[index + 1]
            let thisParallelPathData = targetEndPointsParallelFull[index][0]
            let parallelAnchorPoints = findPointAlongSlopeAtDistance([thisPathData.coords.x, thisPathData.coords.y], [nextPathData.arc.center.x, nextPathData.arc.center.y], thisPathSegmentArcToCursorDistance)
            thisParallelPathData.coords.x = parallelAnchorPoints[0]
            thisParallelPathData.coords.y = parallelAnchorPoints[1]
            // new
            let prevParallelPathData = targetEndPointsParallelFull[index - 1][1]
            prevParallelPathData.coords.x = parallelAnchorPoints[0]
            prevParallelPathData.coords.y = parallelAnchorPoints[1]

            // Check if this is not the last point of Entire Shape
            if(index !== targetEndPointsParallelFull.length - 1){
                // If not the last point, check if the following point is an arc
                // if(targetEndPointsParallelFull[index + 1][1].arc.exist === true && targetEndPointsParallelFull[index + 1][1].arc.joinerSide != "AAA" && targetEndPointsParallelFull[index + 1][1].arc.joinerSide != "BBB"){
                if(targetEndPointsParallelFull[index + 1][1].arc.exist === true){
                    console.log(8)
                    // if(targetEndPointsParallelFull[index + 1][1].arc.joinerSide != "AAA" && targetEndPointsParallelFull[index + 1][1].arc.joinerSide != "BBB") {
                    if(targetEndPointsParallelFull[index + 1][1].arc.joinerSide != "AAA" && targetEndPointsParallelFull[index + 1][1].arc.joinerSide != "BBB" && targetEndPointsParallelFull[index + 1][1].arc.joinerSide != "CCC") {
                        console.log('arc_arc: 22222')
                        // NEW_ArcIntersectPICKER
                        parallelPathObject.arcToArcCounter += 1
                        if (parallelPathObject.collectIndicesOfIntersections === true) {
                            parallelPathObject.arcToArcIndexArray.push(index + 1)
                        }
                        // this does get called when it should (no arc - arc) sometimes:
                        // but only when the par line gets to far and the curves loop onto themselves
                        handleArcToArcIntersection(targetEndPointsParallelFull, referenceEndPointsParallelPerpendicular, referenceEndPointsBaseAndFillers, documentFigureCount, self, index, parallelPathObject.arcToArcIndexArray, parallelPathObject.arcToArcCounter)
                    }


                // If not the last point, check if the following point is a path
                } else {
                    console.log(9)
                    console.log("Set Path Point (Shape 2: Part 1)")

                    // THIS PROBLEM IS HAPPENING HERE
                    // HAVING PROBLEM WITH FIRST SHAPE, THE NEXT FOLLOWING STRAIGHT LINE IS LINING UP WRONG AFTER THE JOINER IS ADDED
                    // SEEMS TO BE THE SAME PROBLEM WE FIXED WITH SECOND SHAPE, WHICH WE FIXED IN C+
                    // BUT COULD BE A DIFFERENT PROBLEM (IT IS A DIFFERENT PROBLEM)

                    let fillerAdder = 0
                    let nextFillerAdder = 0

                    // if(referenceEndPointsBaseAndFillers[index - 2] === "filler"){
                    //     fillerAdder = fillerAdder - 1
                    //     nextFillerAdder = nextFillerAdder - 1
                    // }
                    // if(referenceEndPointsBaseAndFillers[index - 2] === "filler"){
                    //     nextFillerAdder = nextFillerAdder - 1
                    // }

                    // if(referenceEndPointsBaseAndFillers[index] === "filler"){
                    //     fillerAdder = fillerAdder + 1
                    // }
                    // if(referenceEndPointsBaseAndFillers[index + 1] === "filler"){
                    //     nextFillerAdder = nextFillerAdder + 1
                    // }

                    if(referenceEndPointsBaseAndFillers[index + 2] === "filler"){
                        fillerAdder = fillerAdder + 0
                        nextFillerAdder = nextFillerAdder + 1
                    }
                    // if(referenceEndPointsBaseAndFillers[index + 2] === "filler"){
                    //     nextFillerAdder = nextFillerAdder - 1
                    // }

                    // // THIS IS THE PROBLEM: (WORKS FOR FIRST SHAPE)
                    // let thisPathDataOutside = referenceEndPointsBaseAndFillers[index + 0 + fillerAdder]
                    // let nextPathDataOutside = referenceEndPointsBaseAndFillers[index + 1 + nextFillerAdder]
                    // THIS IS THE PROBLEM: (WORKS FOR SECOND SHAPE)
                    let thisPathDataOutside = referenceEndPointsBaseAndFillers[index + 1 + fillerAdder]
                    let nextPathDataOutside = referenceEndPointsBaseAndFillers[index + 2 + nextFillerAdder]

                    // updateSVG_highlight_1_point_01([thisPathDataOutside.coords.x, thisPathDataOutside.coords.y])
                    // updateSVG_highlight_1_point_02([nextPathDataOutside.coords.x, nextPathDataOutside.coords.y])
                    
                    let this_parallel_perp_AnchorPointX = thisPathDataOutside.coords.x - (parallelPathObject.parallelDistance * Math.sin(Math.atan2(thisPathDataOutside.coords.y - nextPathDataOutside.coords.y, thisPathDataOutside.coords.x - nextPathDataOutside.coords.x)))
                    let this_parallel_perp_AnchorPointY = thisPathDataOutside.coords.y + (parallelPathObject.parallelDistance * Math.cos(Math.atan2(thisPathDataOutside.coords.y - nextPathDataOutside.coords.y, thisPathDataOutside.coords.x - nextPathDataOutside.coords.x)))
                    let next_parallel_perp_AnchorPointX = nextPathDataOutside.coords.x - (parallelPathObject.parallelDistance * Math.sin(Math.atan2(thisPathDataOutside.coords.y - nextPathDataOutside.coords.y, thisPathDataOutside.coords.x - nextPathDataOutside.coords.x)))
                    let next_parallel_perp_AnchorPointY = nextPathDataOutside.coords.y + (parallelPathObject.parallelDistance * Math.cos(Math.atan2(thisPathDataOutside.coords.y - nextPathDataOutside.coords.y, thisPathDataOutside.coords.x - nextPathDataOutside.coords.x)))
                    targetEndPointsParallelFull[index + 1][0].coords.x = this_parallel_perp_AnchorPointX
                    targetEndPointsParallelFull[index + 1][0].coords.y = this_parallel_perp_AnchorPointY
                    targetEndPointsParallelFull[index + 1][1].coords.x = next_parallel_perp_AnchorPointX
                    targetEndPointsParallelFull[index + 1][1].coords.y = next_parallel_perp_AnchorPointY


                    console.log("run function: handleArcToPathIntersection() (Shape 2: Part 2)")

                    // NEW_ArcIntersectPICKER
                    parallelPathObject.arcToPathCounter += 1
                    if (parallelPathObject.collectIndicesOfIntersections === true) {
                        parallelPathObject.arcToPathIndexArray.push(index + 1)
                    }
                    handleArcToPathIntersection(targetEndPointsParallelFull, referenceEndPointsParallelPerpendicular, referenceEndPointsBaseAndFillers, documentFigureCount, self, index, parallelPathObject.arcToPathIndexArray, parallelPathObject.arcToPathCounter)
                    if (targetEndPointsParallelFull[index + 1][1].arc.joiner) {
                        parallelPathObject.arcToPathCounter -= 1
                    }
                    // old
                    // handleArcToPathIntersection(index)

                }
            // Check if this is the last point of entire shape
            } else {
                console.log(10)
                let thisPathData = referenceEndPointsBaseAndFillers[index + 1]
                let nextPathData = referenceEndPointsBaseAndFillers[index + 1]
                let thisParallelPathData = targetEndPointsParallelFull[index][1]
                let parallelAnchorPoints = findPointAlongSlopeAtDistance([thisPathData.coords.x, thisPathData.coords.y], [nextPathData.arc.center.x, nextPathData.arc.center.y], thisPathSegmentArcToCursorDistance)
                thisParallelPathData.coords.x = parallelAnchorPoints[0]
                thisParallelPathData.coords.y = parallelAnchorPoints[1]
            }
            // Reset parallelPathObject.parallelPathSegmentCounter_FIRST after both arc halfs have been handled.
            parallelPathObject.parallelPathSegmentCounter_FIRST = -1
        }
    }
}






















































function sort_endPoint_noArc(
    targetEndPointsParallelFull,
    referenceEndPointsParallelPerpendicular,
    referenceEndPointsBaseAndFillers,
    self,
    index,
    parallelPathObject
) {
    // HANDLE OTHER WAY
    // (NOT DYNAMIC)
    let shitter = true
    if(index > 1) {
        if(targetEndPointsParallelFull[index - 1][1].arc.joiner === true && targetEndPointsParallelFull[index][1].arc.joinerSide === "BBB"){
            console.log("Dont_run_check_straight_path")
            shitter = false
        } else {
            shitter = true
        }
    } if(shitter === true) {
    // HANDLE OTHER WAY

        let fillerAdder = 0
        let nextFillerAdder = 0

        // // old
        // if(referenceEndPointsBaseAndFillers[index] === "filler"){
        //     fillerAdder = fillerAdder + 1
        // }
        // if(referenceEndPointsBaseAndFillers[index + 1] === "filler"){
        //     nextFillerAdder = nextFillerAdder + 1
        // }

        // new
        if(referenceEndPointsBaseAndFillers[index] === "filler" && referenceEndPointsBaseAndFillers[index + 1] != "filler"){
            console.log("1111111")
            fillerAdder = 1
        }
        if(referenceEndPointsBaseAndFillers[index] === "filler" && referenceEndPointsBaseAndFillers[index + 1] === "filler"){
            console.log("222222")
            fillerAdder = -1
        }
        if(referenceEndPointsBaseAndFillers[index + 1] === "filler"){
            console.log("333333")
            nextFillerAdder = 1
        }

        // // old
        // let thisPathDataOutside = referenceEndPointsBaseAndFillers[index + fillerAdder]
        // let nextPathDataOutside = referenceEndPointsBaseAndFillers[index + 1 + nextFillerAdder]

        // new
        let thisPathDataOutside
        let nextPathDataOutside
        if (parallelPathObject.removeornot_allParData === true) {
            console.log("removeornot_allParData: Hasn't run.")
            thisPathDataOutside = referenceEndPointsBaseAndFillers[index + fillerAdder]
            nextPathDataOutside = referenceEndPointsBaseAndFillers[index + 1 + nextFillerAdder]
        } else {
            console.log("removeornot_allParData: Has run.")
            let thisRemoveIndex = parallelPathObject.removeStartIndex
            let nextRemoveIndex = thisRemoveIndex + 1

            if(index <= thisRemoveIndex) {
                console.log("LessThan_or_EqualTo_thisRemoveIndex")
                thisPathDataOutside = referenceEndPointsBaseAndFillers[index + fillerAdder]
                nextPathDataOutside = referenceEndPointsBaseAndFillers[index + 1 + nextFillerAdder]
            }
            else if(index >= nextRemoveIndex) {
                console.log("GreaterThan_or_EqualTo_nextRemoveIndex")
                thisPathDataOutside = referenceEndPointsBaseAndFillers[index + 1 + fillerAdder]
                nextPathDataOutside = referenceEndPointsBaseAndFillers[index + 2 + nextFillerAdder]
            }
            else {
                console.log("Not_Handled_RemoveIndex")
                // thisPathDataOutside = referenceEndPointsBaseAndFillers[index + fillerAdder]
                // nextPathDataOutside = referenceEndPointsBaseAndFillers[index + nextFillerAdder]

                // thisPathDataOutside = referenceEndPointsBaseAndFillers[index + 1 + fillerAdder]
                // nextPathDataOutside = referenceEndPointsBaseAndFillers[index + 2 + nextFillerAdder]
            }
        }

        let this_parallel_perp_AnchorPointX = thisPathDataOutside.coords.x - (parallelPathObject.parallelDistance * Math.sin(Math.atan2(thisPathDataOutside.coords.y - nextPathDataOutside.coords.y, thisPathDataOutside.coords.x - nextPathDataOutside.coords.x)))
        let this_parallel_perp_AnchorPointY = thisPathDataOutside.coords.y + (parallelPathObject.parallelDistance * Math.cos(Math.atan2(thisPathDataOutside.coords.y - nextPathDataOutside.coords.y, thisPathDataOutside.coords.x - nextPathDataOutside.coords.x)))
        let next_parallel_perp_AnchorPointX = nextPathDataOutside.coords.x - (parallelPathObject.parallelDistance * Math.sin(Math.atan2(thisPathDataOutside.coords.y - nextPathDataOutside.coords.y, thisPathDataOutside.coords.x - nextPathDataOutside.coords.x)))
        let next_parallel_perp_AnchorPointY = nextPathDataOutside.coords.y + (parallelPathObject.parallelDistance * Math.cos(Math.atan2(thisPathDataOutside.coords.y - nextPathDataOutside.coords.y, thisPathDataOutside.coords.x - nextPathDataOutside.coords.x)))
        referenceEndPointsParallelPerpendicular[index][0].x = this_parallel_perp_AnchorPointX
        referenceEndPointsParallelPerpendicular[index][0].y = this_parallel_perp_AnchorPointY
        referenceEndPointsParallelPerpendicular[index][1].x = next_parallel_perp_AnchorPointX
        referenceEndPointsParallelPerpendicular[index][1].y = next_parallel_perp_AnchorPointY
        findParallelPathIntersectingPoint_fixedvisualbug_arcsbroke()

        function findParallelPathIntersectingPoint_fixedvisualbug_arcsbroke(){
            if (index === 0) {
                console.log("A")
                // set first point
                targetEndPointsParallelFull[index][0].coords.x = this_parallel_perp_AnchorPointX
                targetEndPointsParallelFull[index][0].coords.y = this_parallel_perp_AnchorPointY

                if(targetEndPointsParallelFull[index + 1][1].arc.exist === true){
                    console.log("B")
                    // set next point
                    targetEndPointsParallelFull[index][1].coords.x = next_parallel_perp_AnchorPointX
                    targetEndPointsParallelFull[index][1].coords.y = next_parallel_perp_AnchorPointY
                }
            }
            if (index != 0 && index !== targetEndPointsParallelFull.length - 1) {
                if(targetEndPointsParallelFull[index - 1][1].arc.exist === false){
                    // if(skipperCheckers.skipperChecker_Path === false) {
                        // // HANDLE FIRST WAY
                        // console.log("D")
                        // // set prev point
                        // let previous_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(referenceEndPointsParallelPerpendicular[index-1][0].x, referenceEndPointsParallelPerpendicular[index-1][0].y, referenceEndPointsParallelPerpendicular[index-1][1].x, referenceEndPointsParallelPerpendicular[index-1][1].y, referenceEndPointsParallelPerpendicular[index][0].x, referenceEndPointsParallelPerpendicular[index][0].y, referenceEndPointsParallelPerpendicular[index][1].x, referenceEndPointsParallelPerpendicular[index][1].y)
                        // targetEndPointsParallelFull[index-1][1].coords.x = previous_parallelPathDatasIntersectingPoint.x
                        // targetEndPointsParallelFull[index-1][1].coords.y = previous_parallelPathDatasIntersectingPoint.y

                        // console.log("C")
                        // // set this point
                        // let this_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(referenceEndPointsParallelPerpendicular[index-1][0].x, referenceEndPointsParallelPerpendicular[index-1][0].y, referenceEndPointsParallelPerpendicular[index-1][1].x, referenceEndPointsParallelPerpendicular[index-1][1].y, referenceEndPointsParallelPerpendicular[index][0].x, referenceEndPointsParallelPerpendicular[index][0].y, referenceEndPointsParallelPerpendicular[index][1].x, referenceEndPointsParallelPerpendicular[index][1].y)
                        // targetEndPointsParallelFull[index][0].coords.x = this_parallelPathDatasIntersectingPoint.x
                        // targetEndPointsParallelFull[index][0].coords.y = this_parallelPathDatasIntersectingPoint.y
                        // // HANDLE FIRST WAY

                        // HANDLE OTHER WAY
                        if( parallelPathObject.parallelPathSegmentCounter_SECOND === 0) {
                            console.log("D&C_running")
                            // console.log(index)
                            console.log("D")
                            // set prev point
                            let previous_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(referenceEndPointsParallelPerpendicular[index-1][0].x, referenceEndPointsParallelPerpendicular[index-1][0].y, referenceEndPointsParallelPerpendicular[index-1][1].x, referenceEndPointsParallelPerpendicular[index-1][1].y, referenceEndPointsParallelPerpendicular[index][0].x, referenceEndPointsParallelPerpendicular[index][0].y, referenceEndPointsParallelPerpendicular[index][1].x, referenceEndPointsParallelPerpendicular[index][1].y)
                            targetEndPointsParallelFull[index-1][1].coords.x = previous_parallelPathDatasIntersectingPoint.x
                            targetEndPointsParallelFull[index-1][1].coords.y = previous_parallelPathDatasIntersectingPoint.y
                            console.log("C")
                            // set this point
                            let this_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(referenceEndPointsParallelPerpendicular[index-1][0].x, referenceEndPointsParallelPerpendicular[index-1][0].y, referenceEndPointsParallelPerpendicular[index-1][1].x, referenceEndPointsParallelPerpendicular[index-1][1].y, referenceEndPointsParallelPerpendicular[index][0].x, referenceEndPointsParallelPerpendicular[index][0].y, referenceEndPointsParallelPerpendicular[index][1].x, referenceEndPointsParallelPerpendicular[index][1].y)
                            targetEndPointsParallelFull[index][0].coords.x = this_parallelPathDatasIntersectingPoint.x
                            targetEndPointsParallelFull[index][0].coords.y = this_parallelPathDatasIntersectingPoint.y
                        } else {
                            console.log("D&C_not_running")
                            console.log("C+_running")
                            // console.log(index)
                            // console.log("C+")
                            // ORIGINALLY USED referenceEndPointsParallelPerpendicular BUT CAUSING ERRORS
                            // let this_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(referenceEndPointsParallelPerpendicular[index-1][0].x, referenceEndPointsParallelPerpendicular[index-1][0].y, referenceEndPointsParallelPerpendicular[index-1][1].x, referenceEndPointsParallelPerpendicular[index-1][1].y, referenceEndPointsParallelPerpendicular[index][0].x, referenceEndPointsParallelPerpendicular[index][0].y, referenceEndPointsParallelPerpendicular[index][1].x, referenceEndPointsParallelPerpendicular[index][1].y)
                            // NEW WAY USING targetEndPointsParallelFull AND WORKS BUT NOT SURE EXACTLY WHY AND MAKES THINGS CONFUSING
                            let this_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(targetEndPointsParallelFull[index-1][0].coords.x, targetEndPointsParallelFull[index-1][0].coords.y, targetEndPointsParallelFull[index-1][1].coords.x, targetEndPointsParallelFull[index-1][1].coords.y, referenceEndPointsParallelPerpendicular[index][0].x, referenceEndPointsParallelPerpendicular[index][0].y, referenceEndPointsParallelPerpendicular[index][1].x, referenceEndPointsParallelPerpendicular[index][1].y)
                            // set prev point
                            targetEndPointsParallelFull[index-1][1].coords.x = this_parallelPathDatasIntersectingPoint.x
                            targetEndPointsParallelFull[index-1][1].coords.y = this_parallelPathDatasIntersectingPoint.y
                            // set this point
                            targetEndPointsParallelFull[index][0].coords.x = this_parallelPathDatasIntersectingPoint.x
                            targetEndPointsParallelFull[index][0].coords.y = this_parallelPathDatasIntersectingPoint.y
                        }
                        parallelPathObject.parallelPathSegmentCounter_SECOND = 0
                        // HANDLE OTHER WAY
                    // } else {
                    //     console.log("SKIP_D_C")
                    // }
                } else {
                    // set prev point
                    console.log("E")
                }
                // old
                // if(targetEndPointsParallelFull[index + 1][1].arc.exist === true){
                // ew
                if(targetEndPointsParallelFull[index + 1][1].arc.exist === true && targetEndPointsParallelFull[index - 1][1].arc.exist === false){
                    console.log("F")
                    console.log("Set Path Point (Shape 1: Part 1)")

                    // FIXME:

                    // old
                    // this causes problems for arc - path - arc (first shape filler)
                    // set next point
                    // let next_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(referenceEndPointsParallelPerpendicular[index][0].x, referenceEndPointsParallelPerpendicular[index][0].y, referenceEndPointsParallelPerpendicular[index][1].x, referenceEndPointsParallelPerpendicular[index][1].y, referenceEndPointsParallelPerpendicular[index+1][0].x, referenceEndPointsParallelPerpendicular[index+1][0].y, referenceEndPointsParallelPerpendicular[index+1][1].x, referenceEndPointsParallelPerpendicular[index+1][1].y)
                    // targetEndPointsParallelFull[index][1].coords.x = next_parallelPathDatasIntersectingPoint.x
                    // targetEndPointsParallelFull[index][1].coords.y = next_parallelPathDatasIntersectingPoint.y
                    
                    // new
                    targetEndPointsParallelFull[index][1].coords.x = next_parallel_perp_AnchorPointX
                    targetEndPointsParallelFull[index][1].coords.y = next_parallel_perp_AnchorPointY
                }
            }
            if (index != 0 && index === targetEndPointsParallelFull.length - 1) {
                if(targetEndPointsParallelFull[index - 1][1].arc.exist === false) {
                    console.log("G")
                    console.log("findme_G")

                    // // HANDLE FIRST WAY
                    // let previous_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(referenceEndPointsParallelPerpendicular[index-1][0].x, referenceEndPointsParallelPerpendicular[index-1][0].y, referenceEndPointsParallelPerpendicular[index-1][1].x, referenceEndPointsParallelPerpendicular[index-1][1].y, referenceEndPointsParallelPerpendicular[index][0].x, referenceEndPointsParallelPerpendicular[index][0].y, referenceEndPointsParallelPerpendicular[index][1].x, referenceEndPointsParallelPerpendicular[index][1].y)
                    // targetEndPointsParallelFull[index-1][1].coords.x = previous_parallelPathDatasIntersectingPoint.x
                    // targetEndPointsParallelFull[index-1][1].coords.y = previous_parallelPathDatasIntersectingPoint.y
                    // let this_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(referenceEndPointsParallelPerpendicular[index-1][0].x, referenceEndPointsParallelPerpendicular[index-1][0].y, referenceEndPointsParallelPerpendicular[index-1][1].x, referenceEndPointsParallelPerpendicular[index-1][1].y, referenceEndPointsParallelPerpendicular[index][0].x, referenceEndPointsParallelPerpendicular[index][0].y, referenceEndPointsParallelPerpendicular[index][1].x, referenceEndPointsParallelPerpendicular[index][1].y)
                    // targetEndPointsParallelFull[index][0].coords.x = this_parallelPathDatasIntersectingPoint.x
                    // targetEndPointsParallelFull[index][0].coords.y = this_parallelPathDatasIntersectingPoint.y
                    // // HANDLE FIRST WAY

                    // HANDLE OTHER WAY
                    // (NOT DYNAMIC)
                    if( parallelPathObject.parallelPathSegmentCounter_SECOND === 0) {
                        console.log("G_running")
                        console.log(index)
                        if(parallelPathObject.removeornot_allParData === true){
                            let previous_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(referenceEndPointsParallelPerpendicular[index-1][0].x, referenceEndPointsParallelPerpendicular[index-1][0].y, referenceEndPointsParallelPerpendicular[index-1][1].x, referenceEndPointsParallelPerpendicular[index-1][1].y, referenceEndPointsParallelPerpendicular[index][0].x, referenceEndPointsParallelPerpendicular[index][0].y, referenceEndPointsParallelPerpendicular[index][1].x, referenceEndPointsParallelPerpendicular[index][1].y)
                            targetEndPointsParallelFull[index-1][1].coords.x = previous_parallelPathDatasIntersectingPoint.x
                            targetEndPointsParallelFull[index-1][1].coords.y = previous_parallelPathDatasIntersectingPoint.y
                            let this_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(referenceEndPointsParallelPerpendicular[index-1][0].x, referenceEndPointsParallelPerpendicular[index-1][0].y, referenceEndPointsParallelPerpendicular[index-1][1].x, referenceEndPointsParallelPerpendicular[index-1][1].y, referenceEndPointsParallelPerpendicular[index][0].x, referenceEndPointsParallelPerpendicular[index][0].y, referenceEndPointsParallelPerpendicular[index][1].x, referenceEndPointsParallelPerpendicular[index][1].y)
                            targetEndPointsParallelFull[index][0].coords.x = this_parallelPathDatasIntersectingPoint.x
                            targetEndPointsParallelFull[index][0].coords.y = this_parallelPathDatasIntersectingPoint.y
                        } else {
                            let previous_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(referenceEndPointsParallelPerpendicular[index-1][0].x, referenceEndPointsParallelPerpendicular[index-1][0].y, referenceEndPointsParallelPerpendicular[index-1][1].x, referenceEndPointsParallelPerpendicular[index-1][1].y, referenceEndPointsParallelPerpendicular[index][0].x, referenceEndPointsParallelPerpendicular[index][0].y, referenceEndPointsParallelPerpendicular[index][1].x, referenceEndPointsParallelPerpendicular[index][1].y)
                            targetEndPointsParallelFull[index-1][1].coords.x = previous_parallelPathDatasIntersectingPoint.x
                            targetEndPointsParallelFull[index-1][1].coords.y = previous_parallelPathDatasIntersectingPoint.y
                            let this_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(referenceEndPointsParallelPerpendicular[index-1][0].x, referenceEndPointsParallelPerpendicular[index-1][0].y, referenceEndPointsParallelPerpendicular[index-1][1].x, referenceEndPointsParallelPerpendicular[index-1][1].y, referenceEndPointsParallelPerpendicular[index][0].x, referenceEndPointsParallelPerpendicular[index][0].y, referenceEndPointsParallelPerpendicular[index][1].x, referenceEndPointsParallelPerpendicular[index][1].y)
                            targetEndPointsParallelFull[index][0].coords.x = this_parallelPathDatasIntersectingPoint.x
                            targetEndPointsParallelFull[index][0].coords.y = this_parallelPathDatasIntersectingPoint.y
                        }



                    } else {
                        console.log("G_not_running")
                        console.log("G+_running")
                        console.log(index)
                        console.log("G+")
                        // ORIGINALLY USED referenceEndPointsParallelPerpendicular BUT CAUSING ERRORS
                        // let this_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(referenceEndPointsParallelPerpendicular[index-1][0].x, referenceEndPointsParallelPerpendicular[index-1][0].y, referenceEndPointsParallelPerpendicular[index-1][1].x, referenceEndPointsParallelPerpendicular[index-1][1].y, referenceEndPointsParallelPerpendicular[index][0].x, referenceEndPointsParallelPerpendicular[index][0].y, referenceEndPointsParallelPerpendicular[index][1].x, referenceEndPointsParallelPerpendicular[index][1].y)
                        // NEW WAY USING targetEndPointsParallelFull AND WORKS BUT NOT SURE EXACTLY WHY AND MAKES THINGS CONFUSING
                        let this_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(targetEndPointsParallelFull[index-1][0].coords.x, targetEndPointsParallelFull[index-1][0].coords.y, targetEndPointsParallelFull[index-1][1].coords.x, targetEndPointsParallelFull[index-1][1].coords.y, referenceEndPointsParallelPerpendicular[index][0].x, referenceEndPointsParallelPerpendicular[index][0].y, referenceEndPointsParallelPerpendicular[index][1].x, referenceEndPointsParallelPerpendicular[index][1].y)
                        // set prev point
                        targetEndPointsParallelFull[index-1][1].coords.x = this_parallelPathDatasIntersectingPoint.x
                        targetEndPointsParallelFull[index-1][1].coords.y = this_parallelPathDatasIntersectingPoint.y
                        // set this point
                        targetEndPointsParallelFull[index][0].coords.x = this_parallelPathDatasIntersectingPoint.x
                        targetEndPointsParallelFull[index][0].coords.y = this_parallelPathDatasIntersectingPoint.y

                    }
                    parallelPathObject.parallelPathSegmentCounter_SECOND = 0
                    // HANDLE OTHER WAY
                }
                if(targetEndPointsParallelFull[index - 1][1].arc.exist === true){
                    console.log("H")
                }
                console.log("I")
                if(parallelPathObject.removeornot_allParData === true){
                    targetEndPointsParallelFull[index][1].coords.x = next_parallel_perp_AnchorPointX
                    targetEndPointsParallelFull[index][1].coords.y = next_parallel_perp_AnchorPointY
                } else {
                    targetEndPointsParallelFull[index][1].coords.x = next_parallel_perp_AnchorPointX
                    targetEndPointsParallelFull[index][1].coords.y = next_parallel_perp_AnchorPointY
                }
            }
        }
    // HANDLE OTHER WAY
    // (NOT DYNAMIC)
    }
    // HANDLE OTHER WAY
}

export {
    sortEndpoints
}