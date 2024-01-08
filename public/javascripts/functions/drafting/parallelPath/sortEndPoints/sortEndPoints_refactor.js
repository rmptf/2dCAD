import {handleArcToArcIntersection, handlePathToArcIntersection, handleArcToPathIntersection} from './sortEndPoints_functions/intersections_contact.js'
import {handlePathToArcIntersectionNoContact, handleArcToPathIntersectionNoContact, handleArcToArcIntersectionNoContact} from './sortEndPoints_functions/intersections_noContact.js'
import {findIntersectingPointSIMPLER, findPointAlongSlopeAtDistance} from '../drawParallelPath_functions/parallelPathFunctions.js'
import {getDistance} from '../../../math/mathFunctions.js'

function sortEndpoints(
    targetEndPoints,
    refEndPointsPerp,
    refEndPointsBase,
    documentFigureCount,
    self,
    index,
    parallelPathObject,
    skipperCheckers
) {
    if (targetEndPoints[index][1].arc.exist === true) {
        sort_endPoint_withArc(
            targetEndPoints,
            refEndPointsPerp,
            refEndPointsBase,
            documentFigureCount,
            self,
            index,
            parallelPathObject,
            skipperCheckers
        )
    } else {
        sort_endPoint_noArc(
            targetEndPoints,
            refEndPointsPerp,
            refEndPointsBase,
            self,
            index,
            parallelPathObject
        )
    }
}































// FIXME:
// path to arc wasnt working correct after the first path switched up code there but untested
// FIXME:
// curve on first path doesnt work
// FIXME:
// curve on second to last point causes bug on las point when it has a joiner
// FIXME:
// parallel distance is oposite when going the otherway if there is a arc on the second path (but not third) (not if there is a second arc somewhere)

function sort_endPoint_withArc(
    targetEndPoints,
    refEndPointsPerp,
    refEndPointsBase,
    documentFigureCount,
    self,
    index,
    parallelPathObject,
    skipperCheckers
) {
    /*
    VAR RENAMiNG THIS WHOLE FILE

    targetEndPointsParallelFull                  changed to targetEndPoints
    referenceEndPointsParallelPerpendicular      changed to refEndPointsPerp
    referenceEndPointsBaseAndFillers             changed to refEndPointsBase


    let prevEndPointStart = targetEndPoints[index - 1][0]
    let thisEndPointStart = targetEndPoints[index][0]
    let nextEndPointStart = targetEndPoints[index + 1][0]
    let prevEndPointEnd = targetEndPoints[index - 1][1]
    let thisEndPointEnd = targetEndPoints[index][1]
    let nextEndPointEnd = targetEndPoints[index + 1][1]


    targetEndPoints[index][0]   /   15
    targetEndPoints[index + 1][0]   /   19
    targetEndPoints[index - 1][0]   /   5
    targetEndPoints[index][1]   /   20
    targetEndPoints[index + 1][1]   /   30
    targetEndPoints[index - 1][1]   /   27
    */


    // this sets the distance of parallelline when there is a curve. it works fine when the shape goes left to right but has issues when it goes right to left
    // this issue could come from somewhere else though
    // let baseArcToCursorDist
    let handleArcsObject = []
    handleArcsObject.baseArcToCursorDist

    // handle any path / arc interaction no filler
    if(refEndPointsBase[index] !== "filler") {
        if(refEndPointsBase[index + 1] !== "filler"){
            console.log("CHECKER_111")
            targetEndPoints[index][1].arc.radius = calcArcParDistance(handleArcsObject, refEndPointsBase[index + 1], parallelPathObject.parallelDistance)
        }
    }
    // handle arc / arc interaction with filler
    if(refEndPointsBase[index] === "filler" && refEndPointsBase[index - 1].arc.exist === true && refEndPointsBase[index - 2].arc.exist === true) {
        if(refEndPointsBase[index + 1] !== "filler"){
            console.log("CHECKER_222")
            targetEndPoints[index][1].arc.radius = calcArcParDistance(handleArcsObject, refEndPointsBase[index + 1], parallelPathObject.parallelDistance)
        }
    }






    // HANDLE PATH TO ARC
    if(targetEndPoints[index][1].arc.joiner === true && targetEndPoints[index][1].arc.joinerSide === "AAA") {
        console.log(1 + " - Joiner")

        parallelPathObject.pathToArcCounter += 1
        handlePathToArcIntersectionNoContact(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index)

        parallelPathObject.parallelPathSegmentCounter_FIRST = 0
    }
    else if(targetEndPoints[index - 1][1].arc.joiner === true && targetEndPoints[index - 1][1].arc.joinerSide === "AAA") {
        console.log(2 + " - Joiner")

        if(targetEndPoints[index + 1][1].arc.exist === true){
            console.log("orig (double_arc) shape")
            parallelPathObject.parallelPathSegmentCounter_FIRST = 0
        } else {
            console.log("new (single_arc) shape")

            let fillerAdder = 0
            let nextFillerAdder = 0

            if(refEndPointsBase[index + 2] === "filler"){
                fillerAdder = fillerAdder + 0
                nextFillerAdder = nextFillerAdder + 1
            }

            let thisPathDataOutside = refEndPointsBase[index + 1 + fillerAdder]
            let nextPathDataOutside = refEndPointsBase[index + 2 + nextFillerAdder]

            let parallelProjections = calcParallelProjections(thisPathDataOutside.coords, nextPathDataOutside.coords, parallelPathObject.parallelDistance)

            targetEndPoints[index + 1][0].coords.x = parallelProjections.thisPointX
            targetEndPoints[index + 1][0].coords.y = parallelProjections.thisPointY
            targetEndPoints[index + 1][1].coords.x = parallelProjections.nextPointX
            targetEndPoints[index + 1][1].coords.y = parallelProjections.nextPointY
            
            console.log("run function: handleArcToPathIntersection() (Shape 2: Part 2)")

            parallelPathObject.arcToPathCounter += 1
            if (parallelPathObject.collectIndicesOfIntersections === true) {
                parallelPathObject.arcToPathIndexArray.push(index + 1)
            }
            handleArcToPathIntersection(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parallelPathObject.arcToPathIndexArray, parallelPathObject.arcToPathCounter)

            if (targetEndPoints[index + 1][1].arc.joiner) {
                parallelPathObject.arcToPathCounter -= 1
            }
        }
    }
    // HANDLE PATH TO ARC

    // HANDLE ARC TO ARC
    else if(targetEndPoints[index][1].arc.joiner === true && targetEndPoints[index][1].arc.joinerSide === "CCC") {
        console.log(3 + " - Joiner")
        parallelPathObject.arcToArcCounter += 1
        handleArcToArcIntersectionNoContact(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index-1)
        parallelPathObject.parallelPathSegmentCounter_FIRST = 0
    } 
    else if(targetEndPoints[index - 1][1].arc.joiner === true && targetEndPoints[index - 1][1].arc.joinerSide === "CCC") {
        console.log(4 + " - Joiner")
        parallelPathObject.parallelPathSegmentCounter_FIRST = 0
    }
    // HANDLE ARC TO ARC
    
    // HANDLE ARC TO PATH
    else if(targetEndPoints[index][1].arc.joiner === true && targetEndPoints[index][1].arc.joinerSide === "BBB") {
        console.log(5 + " - Joiner")
        console.log("Set Path Point (Shape 2: Part 1)")
        let fillerAdder = 0
        let nextFillerAdder = 0

        if(refEndPointsBase[index + 2] === "filler"){
            fillerAdder = fillerAdder + 0
            nextFillerAdder = nextFillerAdder + 1
        }

        let thisPathDataOutside = refEndPointsBase[index + 0 + fillerAdder]
        let nextPathDataOutside = refEndPointsBase[index + 2 + nextFillerAdder]

        let parallelProjections = calcParallelProjections(thisPathDataOutside.coords, nextPathDataOutside.coords, parallelPathObject.parallelDistance)

        targetEndPoints[index + 1][0].coords.x = parallelProjections.thisPointX
        targetEndPoints[index + 1][0].coords.y = parallelProjections.thisPointY
        targetEndPoints[index + 1][1].coords.x = parallelProjections.nextPointX
        targetEndPoints[index + 1][1].coords.y = parallelProjections.nextPointY

        parallelPathObject.arcToPathCounter += 1

        console.log("run function: handleArcToPathIntersection() (Shape 2: Part 2)")
        handleArcToPathIntersectionNoContact(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index-1)

        parallelPathObject.parallelPathSegmentCounter_SECOND = 1
    }
    else if(skipperCheckers.skipperChecker_Arc === true){
        console.log(6 + " - Skipper")
        parallelPathObject.parallelPathSegmentCounter_FIRST = 0
    }
    // HANDLE ARC TO PATH

    else {
        parallelPathObject.parallelPathSegmentCounter_FIRST = parallelPathObject.parallelPathSegmentCounter_FIRST + 1
        // Applies to first Arc Half
        if(parallelPathObject.parallelPathSegmentCounter_FIRST === 0) {
            if(index !== 0) {
                if(targetEndPoints[index - 1][1].arc.exist === true){
                    console.log(3)
                    console.log('arc_arc: 1111')
                } else {
                    console.log(4)
                    console.log("run function: handlePathToArcIntersection() (Shape 1: Part 2)")
                    
                    parallelPathObject.pathToArcCounter += 1
                    if (parallelPathObject.collectIndicesOfIntersections === true) {
                        parallelPathObject.pathToArchIndexArray.push(index)
                    }
                    handlePathToArcIntersection(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parallelPathObject.pathToArchIndexArray, parallelPathObject.pathToArcCounter)
                }
            } else {
                console.log(5)
                let thisPathData = refEndPointsBase[index]
                let nextPathData = refEndPointsBase[index + 1]
                let thisParallelPathData = targetEndPoints[index][0]
                let parallelAnchorPoints = findPointAlongSlopeAtDistance([thisPathData.coords.x, thisPathData.coords.y], [nextPathData.arc.center.x, nextPathData.arc.center.y], handleArcsObject.baseArcToCursorDist)
                thisParallelPathData.coords.x = parallelAnchorPoints[0]
                thisParallelPathData.coords.y = parallelAnchorPoints[1]
            }
            console.log(6)
            if(targetEndPoints[index + 1][1].arc.exist === true) {
                console.log("orig (double_arc) shape")
                let prevParallelPathData = targetEndPoints[index - 1][1]
                let thisParallelPathData = targetEndPoints[index][1]
                if(thisParallelPathData.arc.joiner) {
                    thisParallelPathData.coords.x = prevParallelPathData.coords.x
                    thisParallelPathData.coords.y = prevParallelPathData.coords.y
                }
            } else {
                console.log("new (single_arc) shape")

                let fillerAdder = 0
                let nextFillerAdder = 0

                if(refEndPointsBase[index + 2] === "filler") {
                    fillerAdder = fillerAdder + 0
                    nextFillerAdder = nextFillerAdder + 1
                }

                let thisPathDataOutside = refEndPointsBase[index + 1 + fillerAdder]
                let nextPathDataOutside = refEndPointsBase[index + 2 + nextFillerAdder]

                let parallelProjections = calcParallelProjections(thisPathDataOutside.coords, nextPathDataOutside.coords, parallelPathObject.parallelDistance)

                targetEndPoints[index + 1][0].coords.x = parallelProjections.thisPointX
                targetEndPoints[index + 1][0].coords.y = parallelProjections.thisPointY
                targetEndPoints[index + 1][1].coords.x = parallelProjections.nextPointX
                targetEndPoints[index + 1][1].coords.y = parallelProjections.nextPointY

                console.log("run function: handleArcToPathIntersection() (Shape 2: Part 2)")

                parallelPathObject.arcToPathCounter += 1
                if (parallelPathObject.collectIndicesOfIntersections === true) {
                    parallelPathObject.arcToPathIndexArray.push(index + 1)
                }

                handleArcToPathIntersection(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parallelPathObject.arcToPathIndexArray, parallelPathObject.arcToPathCounter)

                if (targetEndPoints[index + 1][1].arc.joiner) {
                    parallelPathObject.arcToPathCounter -= 1
                }
            }
        }

        // Applies to second Arc Half
        if(parallelPathObject.parallelPathSegmentCounter_FIRST === 1) {
            console.log(7)

            let thisPathData = refEndPointsBase[index]
            let nextPathData = refEndPointsBase[index + 1]
            let thisParallelPathData = targetEndPoints[index][0]
            let parallelAnchorPoints = findPointAlongSlopeAtDistance([thisPathData.coords.x, thisPathData.coords.y], [nextPathData.arc.center.x, nextPathData.arc.center.y], handleArcsObject.baseArcToCursorDist)
            thisParallelPathData.coords.x = parallelAnchorPoints[0]
            thisParallelPathData.coords.y = parallelAnchorPoints[1]

            let prevParallelPathData = targetEndPoints[index - 1][1]
            prevParallelPathData.coords.x = parallelAnchorPoints[0]
            prevParallelPathData.coords.y = parallelAnchorPoints[1]

            if(index !== targetEndPoints.length - 1){
                if(targetEndPoints[index + 1][1].arc.exist === true){
                    console.log(8)
                    if(targetEndPoints[index + 1][1].arc.joinerSide != "AAA" && targetEndPoints[index + 1][1].arc.joinerSide != "BBB" && targetEndPoints[index + 1][1].arc.joinerSide != "CCC") {
                        console.log('arc_arc: 22222')

                        parallelPathObject.arcToArcCounter += 1
                        if (parallelPathObject.collectIndicesOfIntersections === true) {
                            parallelPathObject.arcToArcIndexArray.push(index + 1)
                        }
                        // this does get called when it should (no arc - arc) sometimes:
                        // but only when the par line gets to far and the curves loop onto themselves
                        handleArcToArcIntersection(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parallelPathObject.arcToArcIndexArray, parallelPathObject.arcToArcCounter)
                    }
                } else {
                    console.log(9)
                    console.log("Set Path Point (Shape 2: Part 1)")

                    let fillerAdder = 0
                    let nextFillerAdder = 0

                    if(refEndPointsBase[index + 2] === "filler"){
                        fillerAdder = fillerAdder + 0
                        nextFillerAdder = nextFillerAdder + 1
                    }

                    let thisPathDataOutside = refEndPointsBase[index + 1 + fillerAdder]
                    let nextPathDataOutside = refEndPointsBase[index + 2 + nextFillerAdder]

                    let parallelProjections = calcParallelProjections(thisPathDataOutside.coords, nextPathDataOutside.coords, parallelPathObject.parallelDistance)

                    targetEndPoints[index + 1][0].coords.x = parallelProjections.thisPointX
                    targetEndPoints[index + 1][0].coords.y = parallelProjections.thisPointY
                    targetEndPoints[index + 1][1].coords.x = parallelProjections.nextPointX
                    targetEndPoints[index + 1][1].coords.y = parallelProjections.nextPointY

                    console.log("run function: handleArcToPathIntersection() (Shape 2: Part 2)")

                    parallelPathObject.arcToPathCounter += 1
                    if (parallelPathObject.collectIndicesOfIntersections === true) {
                        parallelPathObject.arcToPathIndexArray.push(index + 1)
                    }

                    handleArcToPathIntersection(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parallelPathObject.arcToPathIndexArray, parallelPathObject.arcToPathCounter)

                    if (targetEndPoints[index + 1][1].arc.joiner) {
                        parallelPathObject.arcToPathCounter -= 1
                    }
                }
            // Check if this is the last point of entire shape
            } else {
                console.log(10)
                let thisPathData = refEndPointsBase[index + 1]
                let nextPathData = refEndPointsBase[index + 1]
                let thisParallelPathData = targetEndPoints[index][1]
                let parallelAnchorPoints = findPointAlongSlopeAtDistance([thisPathData.coords.x, thisPathData.coords.y], [nextPathData.arc.center.x, nextPathData.arc.center.y], handleArcsObject.baseArcToCursorDist)
                thisParallelPathData.coords.x = parallelAnchorPoints[0]
                thisParallelPathData.coords.y = parallelAnchorPoints[1]
            }
            // Reset parallelPathObject.parallelPathSegmentCounter_FIRST after both arc halfs have been handled.
            parallelPathObject.parallelPathSegmentCounter_FIRST = -1
        }
    }
}






















































function sort_endPoint_noArc(
    targetEndPoints,
    refEndPointsPerp,
    refEndPointsBase,
    self,
    index,
    parallelPathObject
) {
    let shitter = true
    if(index > 1) {
        if(targetEndPoints[index - 1][1].arc.joiner === true && targetEndPoints[index][1].arc.joinerSide === "BBB"){
            console.log("Dont_run_check_straight_path")
            shitter = false
        } else {
            shitter = true
        }
    } if(shitter === true) {
        let fillerAdder = 0
        let nextFillerAdder = 0

        if(refEndPointsBase[index] === "filler" && refEndPointsBase[index + 1] != "filler"){
            console.log("1111111")
            fillerAdder = 1
        }
        if(refEndPointsBase[index] === "filler" && refEndPointsBase[index + 1] === "filler"){
            console.log("222222")
            fillerAdder = -1
        }
        if(refEndPointsBase[index + 1] === "filler"){
            console.log("333333")
            nextFillerAdder = 1
        }

        let thisPathDataOutside
        let nextPathDataOutside
        if (parallelPathObject.removeornot_allParData === true) {
            console.log("removeornot_allParData: Hasn't run.")
            thisPathDataOutside = refEndPointsBase[index + fillerAdder]
            nextPathDataOutside = refEndPointsBase[index + 1 + nextFillerAdder]
        } else {
            console.log("removeornot_allParData: Has run.")
            let thisRemoveIndex = parallelPathObject.removeStartIndex
            let nextRemoveIndex = thisRemoveIndex + 1

            if(index <= thisRemoveIndex) {
                console.log("LessThan_or_EqualTo_thisRemoveIndex")
                thisPathDataOutside = refEndPointsBase[index + fillerAdder]
                nextPathDataOutside = refEndPointsBase[index + 1 + nextFillerAdder]
            }
            else if(index >= nextRemoveIndex) {
                console.log("GreaterThan_or_EqualTo_nextRemoveIndex")
                thisPathDataOutside = refEndPointsBase[index + 1 + fillerAdder]
                nextPathDataOutside = refEndPointsBase[index + 2 + nextFillerAdder]
            }
            else {
                console.log("Not_Handled_RemoveIndex")
            }
        }

        let parallelProjections = calcParallelProjections(thisPathDataOutside.coords, nextPathDataOutside.coords, parallelPathObject.parallelDistance)

        refEndPointsPerp[index][0].x = parallelProjections.thisPointX
        refEndPointsPerp[index][0].y = parallelProjections.thisPointY
        refEndPointsPerp[index][1].x = parallelProjections.nextPointX
        refEndPointsPerp[index][1].y = parallelProjections.nextPointY

        findParallelPathIntersectingPoint_fixedvisualbug_arcsbroke()

        function findParallelPathIntersectingPoint_fixedvisualbug_arcsbroke(){
            if (index === 0) {
                console.log("A")
                // set first point
                targetEndPoints[index][0].coords.x = parallelProjections.thisPointX
                targetEndPoints[index][0].coords.y = parallelProjections.thisPointY

                if(targetEndPoints[index + 1][1].arc.exist === true){
                    console.log("B")
                    // set next point
                    targetEndPoints[index][1].coords.x = parallelProjections.nextPointX
                    targetEndPoints[index][1].coords.y = parallelProjections.nextPointY
                }
            }
            if (index != 0 && index !== targetEndPoints.length - 1) {
                if(targetEndPoints[index - 1][1].arc.exist === false){
                        if( parallelPathObject.parallelPathSegmentCounter_SECOND === 0) {
                            console.log("D&C_running")
                            console.log("D")
                            // set prev point
                            let previous_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(refEndPointsPerp[index-1][0].x, refEndPointsPerp[index-1][0].y, refEndPointsPerp[index-1][1].x, refEndPointsPerp[index-1][1].y, refEndPointsPerp[index][0].x, refEndPointsPerp[index][0].y, refEndPointsPerp[index][1].x, refEndPointsPerp[index][1].y)
                            targetEndPoints[index - 1][1].coords.x = previous_parallelPathDatasIntersectingPoint.x
                            targetEndPoints[index - 1][1].coords.y = previous_parallelPathDatasIntersectingPoint.y
                            console.log("C")
                            // set this point
                            let this_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(refEndPointsPerp[index-1][0].x, refEndPointsPerp[index-1][0].y, refEndPointsPerp[index-1][1].x, refEndPointsPerp[index-1][1].y, refEndPointsPerp[index][0].x, refEndPointsPerp[index][0].y, refEndPointsPerp[index][1].x, refEndPointsPerp[index][1].y)
                            targetEndPoints[index][0].coords.x = this_parallelPathDatasIntersectingPoint.x
                            targetEndPoints[index][0].coords.y = this_parallelPathDatasIntersectingPoint.y
                        } else {
                            console.log("D&C_not_running")
                            console.log("C+")
                            let this_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(targetEndPoints[index - 1][0].coords.x, targetEndPoints[index - 1][0].coords.y, targetEndPoints[index - 1][1].coords.x, targetEndPoints[index - 1][1].coords.y, refEndPointsPerp[index][0].x, refEndPointsPerp[index][0].y, refEndPointsPerp[index][1].x, refEndPointsPerp[index][1].y)
                            // set prev point
                            targetEndPoints[index - 1][1].coords.x = this_parallelPathDatasIntersectingPoint.x
                            targetEndPoints[index - 1][1].coords.y = this_parallelPathDatasIntersectingPoint.y
                            // set this point
                            targetEndPoints[index][0].coords.x = this_parallelPathDatasIntersectingPoint.x
                            targetEndPoints[index][0].coords.y = this_parallelPathDatasIntersectingPoint.y
                        }
                        parallelPathObject.parallelPathSegmentCounter_SECOND = 0
                } else {
                    // set prev point
                    console.log("E")
                }
                if(targetEndPoints[index + 1][1].arc.exist === true && targetEndPoints[index - 1][1].arc.exist === false){
                    console.log("F")
                    console.log("Set Path Point (Shape 1: Part 1)")

                    targetEndPoints[index][1].coords.x = parallelProjections.nextPointX
                    targetEndPoints[index][1].coords.y = parallelProjections.nextPointY
                }
            }
            if (index != 0 && index === targetEndPoints.length - 1) {
                if(targetEndPoints[index - 1][1].arc.exist === false) {
                    console.log("G")
                    console.log("findme_G")

                    if( parallelPathObject.parallelPathSegmentCounter_SECOND === 0) {
                        console.log("G_running")
                        console.log(index)
                        if(parallelPathObject.removeornot_allParData === true){
                            let previous_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(refEndPointsPerp[index-1][0].x, refEndPointsPerp[index-1][0].y, refEndPointsPerp[index-1][1].x, refEndPointsPerp[index-1][1].y, refEndPointsPerp[index][0].x, refEndPointsPerp[index][0].y, refEndPointsPerp[index][1].x, refEndPointsPerp[index][1].y)
                            targetEndPoints[index - 1][1].coords.x = previous_parallelPathDatasIntersectingPoint.x
                            targetEndPoints[index - 1][1].coords.y = previous_parallelPathDatasIntersectingPoint.y
                            let this_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(refEndPointsPerp[index-1][0].x, refEndPointsPerp[index-1][0].y, refEndPointsPerp[index-1][1].x, refEndPointsPerp[index-1][1].y, refEndPointsPerp[index][0].x, refEndPointsPerp[index][0].y, refEndPointsPerp[index][1].x, refEndPointsPerp[index][1].y)
                            targetEndPoints[index][0].coords.x = this_parallelPathDatasIntersectingPoint.x
                            targetEndPoints[index][0].coords.y = this_parallelPathDatasIntersectingPoint.y
                        } else {
                            let previous_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(refEndPointsPerp[index-1][0].x, refEndPointsPerp[index-1][0].y, refEndPointsPerp[index-1][1].x, refEndPointsPerp[index-1][1].y, refEndPointsPerp[index][0].x, refEndPointsPerp[index][0].y, refEndPointsPerp[index][1].x, refEndPointsPerp[index][1].y)
                            targetEndPoints[index - 1][1].coords.x = previous_parallelPathDatasIntersectingPoint.x
                            targetEndPoints[index - 1][1].coords.y = previous_parallelPathDatasIntersectingPoint.y
                            let this_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(refEndPointsPerp[index-1][0].x, refEndPointsPerp[index-1][0].y, refEndPointsPerp[index-1][1].x, refEndPointsPerp[index-1][1].y, refEndPointsPerp[index][0].x, refEndPointsPerp[index][0].y, refEndPointsPerp[index][1].x, refEndPointsPerp[index][1].y)
                            targetEndPoints[index][0].coords.x = this_parallelPathDatasIntersectingPoint.x
                            targetEndPoints[index][0].coords.y = this_parallelPathDatasIntersectingPoint.y
                        }

                    } else {
                        console.log("G_not_running")
                        console.log("G+")

                        let this_parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(targetEndPoints[index - 1][0].coords.x, targetEndPoints[index - 1][0].coords.y, targetEndPoints[index - 1][1].coords.x, targetEndPoints[index - 1][1].coords.y, refEndPointsPerp[index][0].x, refEndPointsPerp[index][0].y, refEndPointsPerp[index][1].x, refEndPointsPerp[index][1].y)
                        // set prev point
                        targetEndPoints[index - 1][1].coords.x = this_parallelPathDatasIntersectingPoint.x
                        targetEndPoints[index - 1][1].coords.y = this_parallelPathDatasIntersectingPoint.y
                        // set this point
                        targetEndPoints[index][0].coords.x = this_parallelPathDatasIntersectingPoint.x
                        targetEndPoints[index][0].coords.y = this_parallelPathDatasIntersectingPoint.y

                    }
                    parallelPathObject.parallelPathSegmentCounter_SECOND = 0
                    // HANDLE OTHER WAY
                }
                if(targetEndPoints[index - 1][1].arc.exist === true){
                    console.log("H")
                }
                console.log("I")
                if(parallelPathObject.removeornot_allParData === true){
                    targetEndPoints[index][1].coords.x = parallelProjections.nextPointX
                    targetEndPoints[index][1].coords.y = parallelProjections.nextPointY
                } else {
                    targetEndPoints[index][1].coords.x = parallelProjections.nextPointX
                    targetEndPoints[index][1].coords.y = parallelProjections.nextPointY
                }
            }
        }
    }
}

export {
    sortEndpoints
}

// Write a good comment to describe this function
function calcParallelProjections(thisPathDataCoords, nextPathDataCoords, parallelDistance) {
    let thisPathDataCoordsX = thisPathDataCoords.x
    let thisPathDataCoordsY = thisPathDataCoords.y
    let nextPathDataCoordsX = nextPathDataCoords.x
    let nextPathDataCoordsY = nextPathDataCoords.y

    // Calculate the angle and sine/cosine values
    const angle = Math.atan2(thisPathDataCoordsY - nextPathDataCoordsY, thisPathDataCoordsX - nextPathDataCoordsX)
    const sinValue = Math.sin(angle)
    const cosValue = Math.cos(angle)

    // Function to calculate projected anchor points based on input coordinates and parallel distance
    let calcProjection = (coordVal, trigRatio, distance, subtract) => subtract ? coordVal - (distance * trigRatio) : coordVal + (distance * trigRatio)

    // Calculate the anchor points
    return {
        thisPointX: calcProjection(thisPathDataCoordsX, sinValue, parallelDistance, true),
        thisPointY: calcProjection(thisPathDataCoordsY, cosValue, parallelDistance, false),
        nextPointX: calcProjection(nextPathDataCoordsX, sinValue, parallelDistance, true),
        nextPointY: calcProjection(nextPathDataCoordsY, cosValue, parallelDistance, false)
    }
}

// Working on this function (not 100% sure what it does)
function calcArcParDistance(handleArcsObject, nextRefEndPointBase, distance) {
    handleArcsObject.baseArcToCursorDist = (nextRefEndPointBase.arc.sweepFlag === 0) ? distance : distance * -1
    let nextArcToCenterTotalDistance = getDistance(nextRefEndPointBase.coords.x, nextRefEndPointBase.coords.y, nextRefEndPointBase.arc.center.x, nextRefEndPointBase.arc.center.y)
    let nextArcToCenterMinusPointerToArcFromArc1 = nextArcToCenterTotalDistance - handleArcsObject.baseArcToCursorDist
    return nextArcToCenterMinusPointerToArcFromArc1
}